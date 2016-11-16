import { Document, Schema, model } from 'mongoose'

class Opcion {
    descripcion: string;
    limite: Number;

    toString() {
        return this.descripcion;
    }
}

var EsquemaOpcion = new Schema({
  descripcion: { required: true, type: String },
  limite: {  type: Number },
});

EsquemaOpcion.method('toString', Opcion.prototype.toString);

interface DocumentoOpcion extends Opcion, Document { };

const ModeloOpcion = model<DocumentoOpcion>('Opcion', EsquemaOpcion);

export {Opcion, ModeloOpcion, EsquemaOpcion};