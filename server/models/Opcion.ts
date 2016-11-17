import { Document, Schema, model } from 'mongoose'

class Opcion {
    descripcion: string;
    limite: Number;

    toString() {
        return this.descripcion;
    }
}

class NombresOpcionDefecto {
    static valores = {
        no_voy_a_cursar: 'No voy a cursar',
        ya_curse: 'Ya cursé',
        me_gustaria_pero_no_puedo: 'Me gustaría pero no puedo'
    }

}

var EsquemaOpcion = new Schema({
    descripcion: {
        required: true,
        type: String
    },
    limite: {
        type: Number
    },
});

EsquemaOpcion.method('toString', Opcion.prototype.toString);

interface DocumentoOpcion extends Opcion, Document {};

const ModeloOpcion = model < DocumentoOpcion > ('Opcion', EsquemaOpcion);

export {
    Opcion, ModeloOpcion, EsquemaOpcion, NombresOpcionDefecto
};