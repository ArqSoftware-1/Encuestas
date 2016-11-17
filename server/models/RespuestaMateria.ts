import { Opcion, EsquemaOpcion } from "./Opcion";
import { Materia, EsquemaMateria } from "./Materia";
import { Document, Schema, model } from 'mongoose'

class RespuestaMateria {
    opcion: Opcion;
    materia: Materia;
}

var EsquemaRespuestaMateria = new Schema({ opcion: { type: EsquemaOpcion }, materia: { type: EsquemaMateria }});

interface DocumentoRespuestaMateria extends RespuestaMateria, Document { };

const ModeloRespuestaMateria = model<DocumentoRespuestaMateria>('RespuestaMateria', EsquemaRespuestaMateria);

export {RespuestaMateria, ModeloRespuestaMateria, EsquemaRespuestaMateria};