import { Router, Response, Request, NextFunction } from "express";
import { ModeloOpcion, EsquemaOpcion} from "../models/Opcion";
import { verify } from "jsonwebtoken";
import { secret } from "../config";

const rutaOpcion: Router = Router();

rutaOpcion.use((request: Request & { headers: { authorization: string } }, response: Response, next: NextFunction) => {
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

rutaOpcion.get("/get", (request: Request, response: Response) => {
    ModeloOpcion.findOne({_id: request.param('id')}).exec()
                                    .then(materia => {
                                            response.json(materia);
                                    });
});

export { rutaOpcion }