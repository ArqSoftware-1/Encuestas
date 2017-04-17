import { Router, Response, Request, NextFunction } from "express";
import { ModeloDirector, EsquemaDirector } from "../models/Director";

import { verify } from "jsonwebtoken";
import { length, secret, digest } from "../config";
import * as winston from "winston";
import { randomBytes, pbkdf2 } from "crypto";

const rutaDirector: Router = Router();

rutaDirector.use((request: Request & {
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

rutaDirector.get("/listado", (request: Request, response: Response) => {
    ModeloDirector.find().exec()
        .then(director => {
            winston.log('info', 'Se han listado los directores con éxito');
            return response.json(director);
        })
        .catch(error => {
            winston.log('error', 'Se ha produccido un error al listar los directores: ' + error);
            return response.status(500).json(error);
        });
});

rutaDirector.get("/directorPorEmail", (request: Request, response: Response) => {
    ModeloDirector.findOne({ email: request.param('email') }).exec()
        .then(director => {
            winston.log('info', 'Se ha buscado el director ' + request.param('email') + ' con éxito');
            return response.json(director);
        })
        .catch(error => {
            winston.log('error', 'Se ha produccido un error al listar los directores por email: ' + error);
            return response.status(500).json(error);
        });
});

rutaDirector.delete("/eliminar", (request: Request, response: Response) => {
    ModeloDirector.findByIdAndRemove(request.param('id')).exec()
        .then(director => {
            winston.log('info', 'Se ha eliminado el director (id: ' + request.param('id') + ') con éxito');
            return response.json(director);
        })
        .catch(error => {
            winston.log('error', 'Se ha produccido un error al listar los directores por email: ' + error);
            return response.status(500).json(error);
        });
});


rutaDirector.post("/guardar", function(request: Request, response: Response, next: NextFunction) {
    if (!request.body.hasOwnProperty("password") || !request.body.hasOwnProperty("email")) {
        return response.json({
            message: "Todos los campos son requeridos"
        });
    }

    const salt = randomBytes(128).toString("base64");
    pbkdf2(request.body.password, salt, 10000, length, digest, (err: Error, hash: Buffer) => {
        var director = new ModeloDirector({
            email: request.body.email,
            password: hash.toString("hex"),
            salt: salt
        });
        
        director.save()
        .then(director => {
            winston.log('info', 'Se ha guardado el director ' + request.body.email + ' con éxito');
            return response.json(director);
        })
        .catch(error => {
                winston.log('error', 'Se ha produccido un error al guardar un director: ' + error);
                return response.status(500).json(error);
            });
    })
});

export {
    rutaDirector
}





