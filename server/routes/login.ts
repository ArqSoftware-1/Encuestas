import { Router, Request, Response, NextFunction } from "express";
import { randomBytes, pbkdf2 } from "crypto";
import { sign } from "jsonwebtoken";
import { secret, length, digest } from "../config";
import * as winston from "winston";

import { ModeloDirector, EsquemaDirector} from "../models/Director";

const loginRouter: Router = Router();

loginRouter.post("/signup", function(request: Request, response: Response, next: NextFunction) {
    if (!request.body.hasOwnProperty("password")) {
        let err = new Error("No password");
        return next(err);
    }

    const salt = randomBytes(128).toString("base64");

    pbkdf2(request.body.password, salt, 10000, length, digest, (err: Error, hash: Buffer) => {
        response.json({
            hashed: hash.toString("hex"),
            salt: salt
        });
    });
});

// login method
loginRouter.post("/", function(request: Request, response: Response, next: NextFunction) {
    if (!request.body.hasOwnProperty("password") || !request.body.hasOwnProperty("email")) {
        response.json({
            message: "Todos los campos son requeridos"
        });
    }

    ModeloDirector.findOne({
            email: request.body.email
        }).exec()
        .then(director => {
            if (director) {
                pbkdf2(request.body.password, director.salt, 10000, length, digest, (err: Error, hash: Buffer) => {
                    if (err) {
                        console.log(err);
                    }
                    if (hash.toString("hex") === director.password) {

                        const token = sign({
                            "user": director.email,
                            permissions: []
                        }, secret, {
                            expiresIn: "8h"
                        });
                        response.json({
                            "jwt": token
                        });
                        winston.log('info', 'Se ha logueado el director ' + request.body.email + ' con éxito');
                    } else {
                        response.json({
                            message: "El password ingresado es incorrecto"
                        });
                    }
                });
            } else {
                response.json({
                    message: "El email ingresado es incorrecto"
                });
            }
        })
        .catch(error => {
            winston.log('error', 'Se ha produccido al iniciar sesion: ' + error);
            response.status(500).json(error);
        });

});

export {
    loginRouter
}
