import { Router, Response, Request, NextFunction } from "express";
import { ModeloRespuestaEncuesta, EsquemaRespuestaEncuesta} from "../models/RespuestaEncuesta";
import { ModeloRespuestaMateria, EsquemaRespuestaMateria} from "../models/RespuestaMateria";
import { Materia, ModeloMateria, EsquemaMateria } from "../models/Materia";
import { Opcion, ModeloOpcion, EsquemaOpcion } from "../models/Opcion";
import { verify } from "jsonwebtoken";
import { secret } from "../config";
import * as winston from "winston";
import { randomBytes, pbkdf2 } from "crypto";

const rutaRespuestasEncuesta: Router = Router();

rutaRespuestasEncuesta.use((request: Request & {
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

rutaRespuestasEncuesta.get("/listado", (request: Request, response: Response) => {
    ModeloRespuestaEncuesta.find( request.param('idEncuesta') ? {'encuesta._id': request.param('idEncuesta')} : {}).exec()
        .then(respuestasEncuesta => {
            winston.log('info', 'Se han listado las respuestas-encuestas con éxito (cantidad: ' + respuestasEncuesta.length + ')');
            return response.json(respuestasEncuesta);
        })
        .catch(error => {
            winston.log('error', 'Se ha producido un error al listar las respuestas: ' + error);
            return response.status(500).json(error);
        });
});

rutaRespuestasEncuesta.get("/listadoPor", (request: Request, response: Response) => {
    ModeloRespuestaEncuesta.find({
            'encuesta.anho': request.param('anho'),
            'encuesta.semestre': request.param('semestre')
        }).limit(10).exec()
        .then(respuestasEncuesta => {
            winston.log('info', 'Se han listado las respuestas-encuestas (año: ' + request.param('anho') + ', semestre: ' + request.param('semestre') + ') con éxito');
            return response.json(respuestasEncuesta);
        })
        .catch(error => {
            winston.log('error', 'Se ha producido un error al listar las respuestas por año y semestre: ' + error);
            return response.status(500).json(error);
        });
});

rutaRespuestasEncuesta.post("/guardar", function(request: Request, response: Response, next: NextFunction) {
    ModeloRespuestaEncuesta.findOne({
            DNIAlumno: request.body.alumno.DNIAlumno,
            'encuesta._id': request.body.encuesta._id
        }).exec()
        .then(respuestaEncuestaGuardada => {
            if (respuestaEncuestaGuardada) {
                return response.json({
                    error: 'El DNI ingresado ya existe'
                });
            } else {
                var respuestaEncuesta = new ModeloRespuestaEncuesta({
                    respuestasMateria: [],
                    encuesta: request.body.encuesta,
                    DNIAlumno: request.body.alumno.DNIAlumno,
                    emailAlumno: request.body.alumno.emailAlumno,
                    nombreYApellidoAlumno: request.body.alumno.nombreYApellidoAlumno
                })
                respuestaEncuesta.save();
                if (!respuestaEncuesta.token) {
                    respuestaEncuesta.token = respuestaEncuesta._id + randomBytes(16).toString("hex");
                }
                respuestaEncuesta.urlEncuesta = request.protocol + '://' + request.get('host') + '/#/respuesta-encuesta/' + respuestaEncuesta.token;
                respuestaEncuesta.save();
                winston.log('info', 'Se ha guardado la respuesta-encuesta con éxito');
                return response.json(respuestaEncuesta);
            }
        })
        .catch(error => {
            winston.log('error', 'Se ha producido un error al asignar una respuesta: ' + error);
            return response.status(500).json(error);
        });
});

rutaRespuestasEncuesta.get("/buscarPor", (request: Request, response: Response) => {
    var alumno = request.param('nombreYApellido');
    var dni = request.param('dni');
    var idEncuesta = request.param('idEncuesta');
    var cantidadASaltear = +request.param('cantidadASaltear');
    ModeloRespuestaEncuesta.find({
            'encuesta._id': idEncuesta
        })
        .find({
            nombreYApellidoAlumno: new RegExp(alumno, 'i')
        })
        .find({
            DNIAlumno: new RegExp(dni, 'i')
        })
        .skip(cantidadASaltear)
        .limit(10)
        .exec()
        .then(respuestasEncuesta => {
            winston.log('info', 'Se ha buscado la respuesta-encuesta (alumno: ' + alumno + ', dni: ' + dni + ') con éxito');
            return response.json(respuestasEncuesta);
        })
        .catch(error => {
            winston.log('error', 'Se ha producido un error al buscar las respuestas por nombre y apellido y dni: ' + error);
            return response.status(500).json(error);
        });
});

rutaRespuestasEncuesta.get("/buscarPorDNI", (request: Request, response: Response) => {
    var dni = request.param('dni');
    ModeloRespuestaEncuesta.findOne({
            DNIAlumno: new RegExp(dni, 'i')
        })
        .exec()
        .then(respuestaEncuesta => {
            winston.log('info', 'Se ha buscado la respuesta-encuesta (dni: ' + dni + ') con éxito');
            return response.json(respuestaEncuesta);
        })
        .catch(error => {
            winston.log('error', 'Se ha producido un error al buscar las respuestas por dni: ' + error);
            return response.status(500).json(error);
        });
});

rutaRespuestasEncuesta.get("/cantidadPor", (request: Request, response: Response) => {
    var alumno = request.param('nombreYApellido');
    var dni = request.param('dni');
    var idEncuesta = request.param('idEncuesta');
    ModeloRespuestaEncuesta.find({
            'encuesta._id': idEncuesta
        })
        .find({
            nombreYApellidoAlumno: new RegExp(alumno, 'i')
        })
        .find({
            DNIAlumno: new RegExp(dni, 'i')
        })
        .count()
        .exec()
        .then(cantidad => {
            winston.log('info', 'Se ha contabilizado la cantidad de respuestas-encuestas (alumno: ' + alumno + ', dni: ' + dni + ') con éxito. Cantidad: ' + cantidad);
            return response.json(cantidad);
        })
        .catch(error => {
            winston.log('error', 'Se ha producido un error al buscar las respuestas por nombre y apellido y dni: ' + error);
            return response.status(500).json(error);
        });
});

rutaRespuestasEncuesta.post("/asignar-alumnos", function(request: Request, response: Response, next: NextFunction) {
    var alumnos = request.body.alumnos;
    var alumnosNoAgregados = [];
    var alumnosAgregados = [];

    var guardarRespuestasEncuesta = function(callback, index) {
        if (index < alumnos.length) {
            var alumno = alumnos[index];
            if (esRespuestaEncuestaValida(alumno)) {
                ModeloRespuestaEncuesta.findOne({
                    DNIAlumno: alumno.DNIAlumno,
                    'encuesta._id': alumno.encuesta._id
                }).exec().then(respuestaEncuestaGuardada => {
                    if (respuestaEncuestaGuardada) {
                        alumno.error = "El alumno con el DNI indicado ya fue asignado a la encuesta.";
                        alumnosNoAgregados.push(alumno);
                    } else {
                        alumnosAgregados.push(alumno);
                        var respuestaEncuesta = new ModeloRespuestaEncuesta(alumno);
                        respuestaEncuesta.save();
                        respuestaEncuesta.token = respuestaEncuesta._id + randomBytes(16).toString("hex");
                        respuestaEncuesta.urlEncuesta = request.protocol + '://' + request.get('host') + '/#/respuesta-encuesta/' + respuestaEncuesta.token;
                        respuestaEncuesta.save();
                    }
                    guardarRespuestasEncuesta(callback, index + 1);
                })
            } else {
                alumno.error = "Campos inválidos, controle que no estén vacios y sean válidos.";
                alumnosNoAgregados.push(alumno);
                guardarRespuestasEncuesta(callback, index + 1);
            }
        } else {
            callback();
        }
    }

    guardarRespuestasEncuesta(() => {
        response.json({
            agregados: alumnosAgregados,
            noAgregados: alumnosNoAgregados
        });
    }, 0);

});

function esRespuestaEncuestaValida(respuestaEncuesta) {
    if (respuestaEncuesta.nombreYApellidoAlumno.length < 3 || respuestaEncuesta.DNIAlumno.length < 3 || respuestaEncuesta.emailAlumno.length < 3) {
        return false;
    }
    return true;
}

export {
    rutaRespuestasEncuesta
}