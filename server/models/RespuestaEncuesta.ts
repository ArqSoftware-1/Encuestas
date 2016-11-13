import { RespuestaMateria, EsquemaRespuestaMateria } from "./RespuestaMateria";
import { Encuesta, EsquemaEncuesta } from "./Encuesta";
import { Document, Schema, model } from 'mongoose';

class RespuestaEncuesta {
    respuestasMateria: Array<RespuestaMateria> = [];
    encuesta: Encuesta;
    nombreYApellido: String;
    DNIAlumno: String;
    emailAlumno: String;
    urlEncuesta: String;
    completa: Boolean;   
}

var EsquemaRespuestaEncuesta = new Schema({ respuestasMateria: { type: [EsquemaRespuestaMateria] }, 
                                   encuesta: { type: EsquemaEncuesta },
                                   nombreYApellidoAlumno: { type: String }, 
                                   DNIAlumno: { type: String }, 
                                   emailAlumno: { type: String },
                                   urlEncuesta: { type: String },
                                   completa: { type: Boolean}
                                 });

interface DocumentoRespuestaEncuesta extends RespuestaEncuesta, Document { };

const ModeloRespuestaEncuesta = model<DocumentoRespuestaEncuesta>('RespuestaEncuesta', EsquemaRespuestaEncuesta);

export {RespuestaEncuesta, ModeloRespuestaEncuesta, EsquemaRespuestaEncuesta};