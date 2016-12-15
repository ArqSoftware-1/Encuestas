import { Router, Response, Request, NextFunction } from "express";
import { ModeloEncuesta, EsquemaEncuesta} from "../models/Encuesta";
import { ModeloRespuestaEncuesta, EsquemaRespuestaEncuesta} from "../models/RespuestaEncuesta";
import { NombresOpcionDefecto } from "../models/Opcion";
import { ModeloMateria } from "../models/Materia";
import { verify } from "jsonwebtoken";
import { secret } from "../config";
import * as winston from "winston";

const rutaEncuestas: Router = Router();

rutaEncuestas.use((request: Request & {
    headers: {
        authorization: string
    }
}, response: Response, next: NextFunction) => {
    const token = request.headers.authorization;

    verify(token, secret, function(tokenError) {
        if (tokenError) {
            return response.status(403).json({
                message: "Invalid token, please Log in first"
            });
        }

        next();
    });
});

rutaEncuestas.get("/listado", (request: Request, response: Response) => {
    ModeloEncuesta.find().exec()
        .then(encuestas => {
            response.json(encuestas);
        })
        .catch(error => {
            winston.log('error', 'Se ha produccido un error al listar las encuestas: ' + error);
            response.status(400).json(error);
        });
});

rutaEncuestas.get("/detalle", (request: Request, response: Response) => {
    ModeloEncuesta.findById(request.param('id')).exec()
        .then(encuesta => {
            response.json(encuesta);
        })
        .catch(error => {
            winston.log('error', 'Se ha produccido un error al obtener el detalle de una encuesta: ' + error);
            response.status(400).json(error);
        });
});

rutaEncuestas.put("/activar", (request: Request, response: Response) => {
    ModeloEncuesta.findByIdAndUpdate(request.body.id, {
        estaActiva: true
    }, (err, encuesta) => {
        encuesta.estaActiva = true;
        ModeloRespuestaEncuesta.update({
            'encuesta._id': request.body.id
        }, {
            $set: {
                "encuesta.estaActiva": true
            }
        }, {
            "multi": true
        }, (err, respuestaEncuesta) => {
            response.json(encuesta);
        });
    });
});

rutaEncuestas.put("/desactivar", (request: Request, response: Response) => {
    ModeloEncuesta.findByIdAndUpdate(request.body.id, {
        estaActiva: false
    }, (err, encuesta) => {
        encuesta.estaActiva = false;
        ModeloRespuestaEncuesta.update({
            'encuesta._id': request.body.id
        }, {
            $set: {
                "encuesta.estaActiva": false
            }
        }, {
            "multi": true
        }, (err, respuestaEncuesta) => {
            response.json(encuesta);
        });
    });
});

rutaEncuestas.get("/estadisticas", (request: Request, response: Response) => {
    ModeloRespuestaEncuesta.aggregate({
            $unwind: '$respuestasMateria'
        }, {
            $unwind: '$encuesta'
        }, {
            $project: {
                encuesta_id: '$encuesta._id',
                opcion: '$respuestasMateria.opcion.descripcion',
                materia: '$respuestasMateria.materia.nombre',
                opcion_id: '$respuestasMateria.opcion._id',
                limite: '$respuestasMateria.opcion.limite'
            }
        }, {
            $group: {
                _id: {
                    opcion: '$opcion',
                    materia: '$materia',
                    encuesta_id: '$encuesta_id',
                    opcion_id: '$opcion_id',
                    limite: '$limite',
                },
                count: {
                    $sum: 1
                }
            }
        }).exec()
        .then(estadisticas => {
            var estadísticasFiltradas = estadisticas.filter(
                estadistica => estadistica._id.encuesta_id == request.param('id'));
            ModeloEncuesta.findOne({
                    _id: request.param('id')
                }).exec()
                .then(encuesta => {
                    response.json({
                        estadisticas: estadísticasFiltradas,
                        encuesta: encuesta
                    });
                })
                .catch(error => {
                    winston.log('error', 'Se ha produccido un error al obtener el detalle de una encuesta en estadisticas: ' + error);
                    response.status(400).json(error);
                });
        })
        .catch(error => {
            winston.log('error', 'Se ha produccido un error al obtener el detalle de una encuesta: ' + error);
            response.status(400).json(error);
        });
});

rutaEncuestas.get("/completaron", (request: Request, response: Response) => {
    ModeloRespuestaEncuesta.count({
            'encuesta._id': request.param('id'),
            completa: true
        }).exec()
        .then(completaron => {

            ModeloRespuestaEncuesta.count({
                    'encuesta._id': request.param('id')
                }).exec()
                .then(total => {

                    ModeloRespuestaEncuesta.count({
                            'encuesta._id': request.param('id'),
                            completa: false,
                            'respuestasMateria': {
                                $exists: true
                            },
                            $where: 'this.respuestasMateria.length >= 1'
                        }).exec()
                        .then(completaronAlgunaOpcion => {

                            ModeloRespuestaEncuesta.count({
                                    'encuesta._id': request.param('id'),
                                    completa: true,
                                    'respuestasMateria.opcion.tipo': {
                                        "$nin": [NombresOpcionDefecto.tipos.comision]
                                    }
                                }).exec()
                                .then(completaronYNoCursanNada => {
                                    response.json({
                                        total: total,
                                        completaron: completaron,
                                        completaronAlgunaOpcion: completaronAlgunaOpcion,
                                        completaronYNoCursanNada: completaronYNoCursanNada
                                    });
                                })
                                .catch(error => {
                                    winston.log('error', 'Se ha produccido un error al obtener la cantidad de alumnos que completaron la encuesta y no van a cursar: ' + error);
                                    response.status(400).json(error);
                                });

                        })
                        .catch(error => {
                            winston.log('error', 'Se ha produccido un error al obtener la cantidad de alumnos que completaron alguna opcion: ' + error);
                            response.status(400).json(error);
                        });

                })
                .catch(error => {
                    winston.log('error', 'Se ha produccido un error al obtener la cantidad de alumnos que deben responder una encuesta: ' + error);
                    response.status(400).json(error);
                });

        })
        .catch(error => {
            winston.log('error', 'Se ha produccido un error al obtener la cantidad de alumnos que completaron la encuesta: ' + error);
            response.status(400).json(error);
        });
});

rutaEncuestas.put("/asignar-comision", (request: Request, response: Response) => {
    var idEncuesta = request.body.idEncuesta;
    var idMateria = request.body.idMateria;
    var descripcionComision = request.body.descripcionComision;
    var limite = request.body.limite;

    ModeloEncuesta.findById(idEncuesta, (err, encuesta) => {
        var materia:any = encuesta.materias.filter((materia:any)=>{
            return materia._id == idMateria
        })[0];
        materia.opciones.unshift({ descripcion: descripcionComision,
                                limite: limite,
                                tipo: NombresOpcionDefecto.tipos.comision
                                });
        materia.save();
        encuesta.save();
        ModeloRespuestaEncuesta.update({
            'encuesta._id': idEncuesta
        }, {
            $set: {
                "encuesta": encuesta
            }
        }, {
            "multi": true
        }, (err, respuestaEncuesta) => {   
            response.json({});
        });

    });
});

rutaEncuestas.put("/asignar-materia", (request: Request, response: Response) => {
    ModeloMateria.findById(request.body.idMateria)
    .exec()
    .then(materia => {
            ModeloEncuesta.findById(request.body.idEncuesta)
            .exec()
            .then(encuesta => {
                encuesta.materias.push(materia);
                encuesta.save();
                ModeloRespuestaEncuesta.update({
                    'encuesta._id': request.body.idEncuesta
                }, {
                    $set: {
                        "encuesta": encuesta
                    }
                }, (err, respuestaEncuesta) => {
                    response.json({});
                });
            })
        })
        .catch(error => {
            winston.log('error', 'Se ha produccido un error al intentar asignar una materia: ' + error);
            response.status(400).json(error);
        });
}); 

rutaEncuestas.put("/quitar-materia", (request: Request, response: Response) => {
    var idMateria = request.body.idMateria;
    var idEncuesta = request.body.idEncuesta;
            ModeloEncuesta.findById(idEncuesta)
            .exec()
            .then(encuesta => {
                encuesta.materias = encuesta.materias.filter((mat:any)=>{
                    return mat._id != idMateria;
                });
                encuesta.save();
                ModeloRespuestaEncuesta.update({
                    'encuesta._id': idEncuesta
                }, {
                    $set: {
                        "encuesta": encuesta
                    }
                }, (err, respuestaEncuesta) => {
                    response.json({});
                });
            })
});                

rutaEncuestas.post("/guardar", function(request: Request, response: Response, next: NextFunction) {
    request.body.encuesta.estaActiva = true;
    request.body.encuesta.materias = [];
    var encuesta = new ModeloEncuesta(request.body.encuesta);
    encuesta.save();
    response.json(encuesta);
});


export {
    rutaEncuestas
}





