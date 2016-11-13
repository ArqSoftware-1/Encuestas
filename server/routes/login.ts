import { Router, Request, Response, NextFunction } from "express";
import { randomBytes, pbkdf2 } from "crypto";
import { sign } from "jsonwebtoken";
import { secret, length, digest } from "../config";
import * as winston from "winston";

import { ModeloDirector, EsquemaDirector} from "../models/Director";

const loginRouter: Router = Router();

const user = {
    hashedPassword: "6fb3a68cb5fe34d0c2c9fc3807c8fa9bc0e7dd10023065ea4233d40a2d6bb4a7e336a82f48bcb5a7cc95b8a590cf03a4a07615a226d09a89420a342584a" +
    "a28748336aa0feb7ac3a12200d13641c8f8e26398cfdaf268dd68746982bcf59415670655edf4e9ac30f6310bd2248cb9bc185db8059fe979294dd3611fdf28c2b731",
    salt: "OxDZYpi9BBJUZTTaC/yuuF3Y634YZ90KjpNa+Km4qGgZXGI6vhSWW0T91rharcQWIjG2uPZEPXiKGnSAQ73s352aom56AIYpYCfk7uNsd+7AzaQ6dxTnd9AzCCdIc/J" +
    "62JohpHPJ5eGHUJJy3PAgHYcfVzvBHnIQlTJCQdQAonQ=",
    email: "john"
};

loginRouter.post("/signup", function (request: Request, response: Response, next: NextFunction) {
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
loginRouter.post("/", function (request: Request, response: Response, next: NextFunction) {
    if (!request.body.hasOwnProperty("password") || !request.body.hasOwnProperty("email")) {
        response.json({message: "Todos los campos son requeridos"});
    }

    ModeloDirector.findOne({email: request.body.email}).exec()
                    .then(director => {
                        if(director){
                            pbkdf2(request.body.password, director.salt, 10000, length, digest, (err: Error, hash: Buffer) => {
                                if (err) {
                                    console.log(err);
                                }
                                if (hash.toString("hex") === director.password) {

                                    const token = sign({"user": director.email, permissions: []}, secret, { expiresIn: "7d" });
                                    response.json({"jwt": token});

                                } else {
                                    response.json({message: "El password ingresado es incorrecto"});
                                }
                            });
                        }else{
                            response.json({message: "El email ingresado es incorrecto"});
                        }
                        })
                    .catch(error => {
                        winston.log('error', 'Se ha produccido al iniciar sesion: ' + error);
                        response.status(400).json(error);
                    });

});

export { loginRouter }
