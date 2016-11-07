import { Router, Response, Request, NextFunction } from "express";
import { ModeloRespuestaEncuesta, EsquemaRespuestaEncuesta} from "../models/RespuestaEncuesta";
import { ModeloRespuestaMateria, EsquemaRespuestaMateria} from "../models/RespuestaMateria";
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
                                        /*respuestas.forEach(function(respuesta) {
                                            var respuestaMateria = new ModeloRespuestaMateria({materia_id: respuesta.materia._id,
                                                                       opcion_id: respuesta.opcion._id});
                                            respuestaMateria.save();
                                            respuestaEncuesta.respuestasMateria.push(respuestaMateria);
                                            respuestaEncuesta.save();
                                        });*/
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





