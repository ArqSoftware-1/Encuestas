import { RespuestaMateria, EsquemaRespuestaMateria } from "./RespuestaMateria";
import { Document, Schema, model } from 'mongoose'

class RespuestaEncuesta {
    respuestasMateria: Array<RespuestaMateria> = [];
    DNIUsuario: String;
    emailUsuario: String;
}

var EsquemaRespuestaEncuesta = new Schema({ respuestasMateria: { type: [RespuestaMateria] }, 
                                   DNIUsuario: { type: String }, 
                                   emailUsuario: { type: String } 
                                 });

interface DocumentoRespuestaEncuesta extends RespuestaEncuesta, Document { };

const ModeloRespuestaEncuesta = model<DocumentoRespuestaEncuesta>('RespuestaEncuesta', EsquemaRespuestaEncuesta);

export {RespuestaEncuesta, ModeloRespuestaEncuesta, EsquemaRespuestaEncuesta};