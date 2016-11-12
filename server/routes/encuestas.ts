import { Router, Response, Request, NextFunction } from "express";
import { ModeloEncuesta, EsquemaEncuesta} from "../models/Encuesta";
import { ModeloRespuestaEncuesta, EsquemaRespuestaEncuesta} from "../models/RespuestaEncuesta";
import { verify } from "jsonwebtoken";
import { secret } from "../config";
import * as winston from "winston";

const rutaEncuestas: Router = Router();

rutaEncuestas.use((request: Request & { headers: { authorization: string } }, response: Response, next: NextFunction) => {
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

rutaEncuestas.get("/listado", (request: Request, response: Response) => {
    ModeloEncuesta.find().exec()
                         .then(encuestas => {
                            response.json(encuestas);
                         })
                         .catch(error => {
                            winston.log('error', 'Se ha produccido un error al listar las encuestas: ' + error);
                            response.status(400).json(error);
                         });
});

rutaEncuestas.get("/detalle", (request: Request, response: Response) => {
    ModeloEncuesta.findById(request.param('id')).exec()
                         .then(encuesta => {
                            response.json(encuesta);
                         })
                         .catch(error => {
                            winston.log('error', 'Se ha produccido un error al obtener el detalle de una encuesta: ' + error);
                            response.status(400).json(error);
                         });
});

rutaEncuestas.get("/estadisticas", (request: Request, response: Response) => {
    ModeloRespuestaEncuesta.aggregate(
                                      {$unwind: '$respuestasMateria'},
                                      {$unwind: '$encuesta'},
                                      {$project: {encuesta_id: '$encuesta._id', opcion: '$respuestasMateria.opcion.descripcion', materia: '$respuestasMateria.materia.nombre'}},
                                      {$group: { _id : { opcion: '$opcion', materia: '$materia', encuesta_id: '$encuesta_id'}, count: {$sum: 1} } }
                                      ).exec()
                         .then(estadisticas => {
                            var estadísticasFiltradas = estadisticas.filter(
                                                            estadistica => estadistica._id.encuesta_id == request.param('id'));
                            ModeloEncuesta.findOne({_id: request.param('id')}).exec()
                                                 .then(encuesta => {
                                                    response.json({estadisticas: estadísticasFiltradas, encuesta: encuesta});
                                                 })
                                                 .catch(error => {
                                                    winston.log('error', 'Se ha produccido un error al obtener el detalle de una encuesta en estadisticas: ' + error);
                                                    response.status(400).json(error);
                                                 });
                         })
                         .catch(error => {
                            winston.log('error', 'Se ha produccido un error al obtener el detalle de una encuesta: ' + error);
                            response.status(400).json(error);
                         });
});

export { rutaEncuestas }





