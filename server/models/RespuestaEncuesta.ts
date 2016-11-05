import { RespuestaMateria, EsquemaRespuestaMateria } from "./RespuestaMateria";
import { Encuesta, EsquemaEncuesta } from "./Encuesta";
import { Document, Schema, model } from 'mongoose';

class RespuestaEncuesta {
    respuestasMateria: Array<RespuestaMateria> = [];
    encuesta: Encuesta;
    DNIAlumno: String;
    emailAlumno: String;
}

var EsquemaRespuestaEncuesta = new Schema({ respuestasMateria: { type: [EsquemaRespuestaMateria] }, 
								   encuesta: { type: EsquemaEncuesta },
                                   DNIAlumno: { type: String }, 
                                   emailAlumno: { type: String } 
                                 });

interface DocumentoRespuestaEncuesta extends RespuestaEncuesta, Document { };

const ModeloRespuestaEncuesta = model<DocumentoRespuestaEncuesta>('RespuestaEncuesta', EsquemaRespuestaEncuesta);

export {RespuestaEncuesta, ModeloRespuestaEncuesta, EsquemaRespuestaEncuesta};