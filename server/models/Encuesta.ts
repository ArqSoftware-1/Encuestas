import { Materia, EsquemaMateria } from "./Materia";
import { Document, Schema, model } from 'mongoose'

class Encuesta {
    materias: Array < Materia > = [];
    anho: Number;
    semestre: Number;
    carrera: String;
    fechaLimite: Date
}

var EsquemaEncuesta = new Schema({
    materias: {
        type: [EsquemaMateria]
    },
    anho: {
        required: true,
        type: Number
    },
    semestre: {
        required: true,
        type: Number,
        min: 1,
        max: 2
    },
    carrera: {
        required: true,
        type: String
    },
    fechaLimite: {
        type: Date
    },
});

interface DocumentoEncuesta extends Encuesta, Document {};

const ModeloEncuesta = model < DocumentoEncuesta > ('Encuesta', EsquemaEncuesta);

export {
    Encuesta, ModeloEncuesta, EsquemaEncuesta
};