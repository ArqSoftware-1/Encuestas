import { Router, Response, Request, NextFunction } from "express";
import { ModeloEncuesta, EsquemaEncuesta} from "../models/Encuesta";
import { ModeloRespuestaEncuesta, EsquemaRespuestaEncuesta} from "../models/RespuestaEncuesta";
import { NombresOpcionDefecto } from "../models/Opcion";
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

rutaEncuestas.get("/estadisticas", (request: Request, response: Response) => {
    ModeloRespuestaEncuesta.aggregate({
            $unwind: '$respuestasMateria'
        }, {
            $unwind: '$encuesta'
        }, {
            $project: {
                encuesta_id: '$encuesta._id',
                opcion: '$respuestasMateria.opcion.descripcion',
                materia: '$respuestasMateria.materia.nombre'
            }
        }, {
            $group: {
                _id: {
                    opcion: '$opcion',
                    materia: '$materia',
                    encuesta_id: '$encuesta_id'
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
                                    'respuestasMateria.opcion.descripcion': {
                                        "$nin": [NombresOpcionDefecto.valores.no_voy_a_cursar, NombresOpcionDefecto.valores.me_gustaria_pero_no_puedo, NombresOpcionDefecto.valores.ya_curse]
                                    }
                                }).exec()
                                .then(CompletaronYCursanPorLoMenosUnaMateria => {
                                    response.json({
                                        total: total,
                                        completaron: completaron,
                                        completaronAlgunaOpcion: completaronAlgunaOpcion,
                                        CompletaronYCursanPorLoMenosUnaMateria: CompletaronYCursanPorLoMenosUnaMateria
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

export {
    rutaEncuestas
}





