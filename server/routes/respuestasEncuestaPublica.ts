import { Router, Response, Request, NextFunction } from "express";
import { ModeloRespuestaEncuesta, EsquemaRespuestaEncuesta} from "../models/RespuestaEncuesta";
import { ModeloRespuestaMateria, EsquemaRespuestaMateria} from "../models/RespuestaMateria";
import { Materia, ModeloMateria, EsquemaMateria } from "../models/Materia";
import { Opcion, ModeloOpcion, EsquemaOpcion } from "../models/Opcion";
import { verify } from "jsonwebtoken";
import { secret } from "../config";
import * as winston from "winston";
import { randomBytes, pbkdf2 } from "crypto";

const rutaRespuestasEncuestaPublica: Router = Router();


rutaRespuestasEncuestaPublica.post("/actualizar-respuestas", (request: Request, response: Response) => {
    var respuestas =  request.body.respuestas;
    ModeloRespuestaEncuesta.findById(request.param('id')).exec()
                                    .then(respuestaEncuesta => {
                                        respuestaEncuesta.respuestasMateria = [];
                                        respuestas.forEach(function(respuesta) {
                                            var materia = new ModeloMateria(respuesta.materia);
                                            var opcion = new ModeloOpcion(respuesta.opcion);
                                            var respuestaMateria = new ModeloRespuestaMateria({materia: materia, opcion: opcion});
                                            respuestaEncuesta.respuestasMateria.push(respuestaMateria);
                                        });
                                        respuestaEncuesta.completa = respuestaEncuesta.respuestasMateria.length == respuestaEncuesta.encuesta.materias.length;
                                        respuestaEncuesta.save();
                                        response.json(respuestaEncuesta);
                                    })
                                    .catch(error => {
                                        winston.log('error', 'Se ha produccido un error al actualizar una respeusta: ' + error);
                                        response.status(400).json(error);
                                    });
});

rutaRespuestasEncuestaPublica.get("/detalle", (request: Request, response: Response) => {
    ModeloRespuestaEncuesta.findOne({token: request.param('token')}).exec()
                                    .then(respuestaEncuesta => {
                                            response.json(respuestaEncuesta);
                                    })
                                    .catch(error => {
                                        winston.log('error ', 'Se ha produccido un error al obtener una respuesta: ' + error);
                                        response.status(400).json(error);
                                    });
});

export { rutaRespuestasEncuestaPublica }





