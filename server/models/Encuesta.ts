import { Materia, EsquemaMateria } from "./Materia";
import { Document, Schema, model } from 'mongoose'

class Encuesta {
    materias: Array<Materia> = [];
    anho: Number;
    semestre: Number;
}

var EsquemaEncuesta = new Schema({ materias: { type: [EsquemaMateria] }, 
                                   anho: { type: Number }, 
                                   semestre: { type: Number, min: 1, max: 2 } 
                                 });

interface DocumentoEncuesta extends Encuesta, Document { };

const ModeloEncuesta = model<DocumentoEncuesta>('Encuesta', EsquemaEncuesta);

export {Encuesta, ModeloEncuesta, EsquemaEncuesta};