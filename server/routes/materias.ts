import { Router, Response, Request, NextFunction } from "express";
import { ModeloMateria, EsquemaMateria} from "../models/Materia";
import { verify } from "jsonwebtoken";
import { secret } from "../config";

const rutaMateria: Router = Router();

rutaMateria.use((request: Request & { headers: { authorization: string } }, response: Response, next: NextFunction) => {
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

rutaMateria.get("/get", (request: Request, response: Response) => {
    ModeloMateria.findOne({_id: request.param('id')}).exec()
                                    .then(materia => {
                                            response.json(materia);
                                    });
});

export { rutaMateria }