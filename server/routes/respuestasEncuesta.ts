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
    ModeloRespuestaEncuesta.find().exec()
        .then(respuestasEncuesta => {
            response.json(respuestasEncuesta);
        })
        .catch(error => {
            winston.log('error', 'Se ha produccido un error al listar las respuestas: ' + error);
            response.status(400).json(error);
        });
});

rutaRespuestasEncuesta.get("/listadoPor", (request: Request, response: Response) => {
    ModeloRespuestaEncuesta.find({
            'encuesta.anho': request.param('anho'),
            'encuesta.semestre': request.param('semestre')
        }).exec()
        .then(respuestasEncuesta => {
            response.json(respuestasEncuesta);
        })
        .catch(error => {
            winston.log('error', 'Se ha produccido un error al listar las respuestas por año y semestre: ' + error);
            response.status(400).json(error);
        });
});

rutaRespuestasEncuesta.post("/guardar", function(request: Request, response: Response, next: NextFunction) {
    ModeloRespuestaEncuesta.find().exec()
        .then(respuestasEncuesta => {
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
            response.json(respuestaEncuesta);
        })
        .catch(error => {
            winston.log('error', 'Se ha produccido un error al asignar una respuesta: ' + error);
            response.status(400).json(error);
        });
});

rutaRespuestasEncuesta.get("/buscarPor", (request: Request, response: Response) => {
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
        .exec()
        .then(respuestasEncuesta => {
            response.json(respuestasEncuesta);
        })
        .catch(error => {
            winston.log('error', 'Se ha produccido un error al buscar las respuestas por nombre y apellido y dni: ' + error);
            response.status(400).json(error);
        });
});

export {
    rutaRespuestasEncuesta
}





