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

rutaMaterias.get("/buscar", (request: Request, response: Response) => {
    ModeloMateria.find({
            nombre: new RegExp(request.param('nombre'), 'i'),
            codigo: new RegExp(request.param('codigo'), 'i')
        })
        .skip(+request.param('skip'))
        .limit(10)
        .exec()
        .then(materias => {
            response.json(materias);
        })
        .catch(error => {
            winston.log('error', 'Se ha produccido un error al buscar la materia: ' + error);
            response.status(400).json(error);
        });
});

rutaMaterias.post("/guardar", function(request: Request, response: Response, next: NextFunction) {
    ModeloMateria.findOne({$or: [
                { nombre: request.body.materia.nombre }, 
                { codigo: request.body.materia.codigo }]
        })
        .exec()
        .then(materia => {
            if (materia) {
                response.json({
                    error: 'El nombre o código ingresado ya existe'
                });
            } else {
                var materia = new ModeloMateria({
                nombre: request.body.materia.nombre,
                codigo: request.body.materia.codigo,
                descripcion: request.body.materia.descripcion,
                grupo: request.body.materia.grupo
                });
                
                materia.save()
                .then(director => {
                    response.json(materia);
                })
                .catch(error => {
                        winston.log('error', 'Se ha produccido un error al guardar la materia: ' + error);
                        response.status(400).json(error);
                    });
            }
        });
});

export {
    rutaMaterias
}