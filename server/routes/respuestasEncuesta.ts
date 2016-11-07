import { Router, Response, Request, NextFunction } from "express";
import { ModeloRespuestaEncuesta, EsquemaRespuestaEncuesta} from "../models/RespuestaEncuesta";
import { ModeloRespuestaMateria, EsquemaRespuestaMateria} from "../models/RespuestaMateria";
import { Materia, ModeloMateria, EsquemaMateria } from "../models/Materia";
import { Opcion, ModeloOpcion, EsquemaOpcion } from "../models/Opcion";
import { verify } from "jsonwebtoken";
import { secret } from "../config";

const rutaRespuestasEncuesta: Router = Router();

rutaRespuestasEncuesta.use((request: Request & { headers: { authorization: string } }, response: Response, next: NextFunction) => {
    const token = request.headers.authorization;

    verify(token, secret, function(tokenError) {
        /*if (tokenError) {
            return response.status(403).json({
                message: "Invalid token, please Log in first"
            });
        }*/

        next();
    });
});

rutaRespuestasEncuesta.post("/actualizar-respuestas", (request: Request, response: Response) => {
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
                                        respuestaEncuesta.save();
                                        response.json(respuestaEncuesta);
                                    });
});

rutaRespuestasEncuesta.get("/detalle", (request: Request, response: Response) => {
    ModeloRespuestaEncuesta.findOne({_id: request.param('token')}).exec()
                                    .then(respuestaEncuesta => {
                                            response.json(respuestaEncuesta);
                                    });
});

rutaRespuestasEncuesta.get("/listado", (request: Request, response: Response) => {
    ModeloRespuestaEncuesta.find().exec()
                                    .then(respuestasEncuesta => {
                                            response.json(respuestasEncuesta);
                                    });
});

export { rutaRespuestasEncuesta }





