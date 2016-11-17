import { Router, Response, Request, NextFunction } from "express";
import { ModeloMateria, EsquemaMateria} from "../models/Materia";
import { verify } from "jsonwebtoken";
import { secret } from "../config";
import * as winston from "winston";

const rutaMaterias: Router = Router();

rutaMaterias.use((request: Request & {
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

rutaMaterias.get("/listado", (request: Request, response: Response) => {
    ModeloMateria.find().exec()
        .then(materias => {
            response.json(materias);
        })
        .catch(error => {
            winston.log('error', 'Se ha produccido un error al listar las materias: ' + error);
            response.status(400).json(error);
        });
});

rutaMaterias.get("/detalle", (request: Request, response: Response) => {
    ModeloMateria.findOne({
            _id: request.param('id')
        }).exec()
        .then(materia => {
            response.json(materia);
        })
        .catch(error => {
            winston.log('error', 'Se ha produccido un error al obtener el detalle de una materia: ' + error);
            response.status(400).json(error);
        });
});

export {
    rutaMaterias
}