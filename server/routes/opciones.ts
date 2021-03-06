import { Router, Response, Request, NextFunction } from "express";
import { ModeloOpcion, EsquemaOpcion} from "../models/Opcion";
import { verify } from "jsonwebtoken";
import { secret } from "../config";
import * as winston from "winston";

const rutaOpciones: Router = Router();

rutaOpciones.use((request: Request & {
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

rutaOpciones.get("/listado", (request: Request, response: Response) => {
    ModeloOpcion.find().exec()
        .then(opciones => {
            winston.log('info', 'Se han listado las opciones con éxito (cantidad: ' + opciones.length + ')');
            return response.json(opciones);
        })
        .catch(error => {
            winston.log('error', 'Se ha produccido un error al listar las opciones: ' + error);
            return response.status(500).json(error);
        });
});

rutaOpciones.get("/detalle", (request: Request, response: Response) => {
    ModeloOpcion.findOne({
            _id: request.param('id')
        }).exec()
        .then(opcion => {
            winston.log('info', 'Se ha buscado la opción (id: ' + request.param('id') + ') con éxito');
            return response.json(opcion);
        })
        .catch(error => {
            winston.log('error', 'Se ha produccido un error al obtener el detalle de una opcion: ' + error);
            return response.status(500).json(error);
        });
});

export {
    rutaOpciones
}