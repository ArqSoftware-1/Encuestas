import { RespuestaMateria, EsquemaRespuestaMateria } from "./RespuestaMateria";
import { Document, Schema, model } from 'mongoose'

class RespuestaEncuesta {
    respuestasMateria: Array<RespuestaMateria> = [];
    DNIAlumno: String;
    emailAlumno: String;
}

var EsquemaRespuestaEncuesta = new Schema({ respuestasMateria: { type: [EsquemaRespuestaMateria] }, 
                                   DNIAlumno: { type: String }, 
                                   emailAlumno: { type: String } 
                                 });

interface DocumentoRespuestaEncuesta extends RespuestaEncuesta, Document { };

const ModeloRespuestaEncuesta = model<DocumentoRespuestaEncuesta>('RespuestaEncuesta', EsquemaRespuestaEncuesta);

export {RespuestaEncuesta, ModeloRespuestaEncuesta, EsquemaRespuestaEncuesta};