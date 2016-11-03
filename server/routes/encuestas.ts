import { Router, Response, Request, NextFunction } from "express";
import { ModeloEncuesta, EsquemaEncuesta} from "../models/Encuesta";
import { verify } from "jsonwebtoken";
import { secret } from "../config";

const rutaEncuestas: Router = Router();

rutaEncuestas.use((request: Request & { headers: { authorization: string } }, response: Response, next: NextFunction) => {
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

rutaEncuestas.get("/listado", (request: Request, response: Response) => {
    ModeloEncuesta.find().exec()
                         .then(encuesta => {
                            response.json(encuesta);
                         });
});

rutaEncuestas.get("/detalle", (request: Request, response: Response) => {
    ModeloEncuesta.findOne({_id: request.param('id')}).exec()
                         .then(encuesta => {
                            response.json(encuesta);
                         });
});

export { rutaEncuestas }





