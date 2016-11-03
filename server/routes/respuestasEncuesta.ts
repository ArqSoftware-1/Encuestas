import { Router, Response, Request, NextFunction } from "express";
import { ModeloRespuestaEncuesta, EsquemaRespuestaEncuesta} from "../models/RespuestaEncuesta";
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

rutaRespuestasEncuesta.get("/detalle", (request: Request, response: Response) => {
    ModeloRespuestaEncuesta.findOne({emailAlumno: request.param('email')}).exec()
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





