import { Opcion, EsquemaOpcion } from "./Opcion";
import { Document, Schema, model } from 'mongoose'

class Materia {
    opciones: Array<Opcion> = [];
    nombre: String;
    idOpcionPorDefecto: String;
}

var EsquemaMateria = new Schema({ opciones: { type: [EsquemaOpcion] }, nombre: { type: String }, idOpcionPorDefecto: { type: String } });

interface DocumentoMateria extends Materia, Document { };

const ModeloMateria = model<DocumentoMateria>('Materia', EsquemaMateria);

export {Materia, ModeloMateria, EsquemaMateria};