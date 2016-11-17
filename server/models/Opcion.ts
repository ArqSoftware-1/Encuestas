import { Document, Schema, model } from 'mongoose'

class Opcion {
    descripcion: string;
    limite: Number;
    tipo: String;

    toString() {
        return this.descripcion;
    }
}

class NombresOpcionDefecto {
    static descripciones = {
        no_voy_a_cursar: 'No voy a cursar',
        ya_curse: 'Ya cursé',
        me_gustaria_pero_no_puedo: 'Me gustaría pero no puedo'
    }

    static tipos = {
        comision: 'COMISION',
        ya_curse: 'YACURSE',
        no_voy_a_cursar: 'NOVOYACURSAR'
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
    tipo: {
        type: String
    },
});

EsquemaOpcion.method('toString', Opcion.prototype.toString);

interface DocumentoOpcion extends Opcion, Document {};

const ModeloOpcion = model < DocumentoOpcion > ('Opcion', EsquemaOpcion);

export {
    Opcion, ModeloOpcion, EsquemaOpcion, NombresOpcionDefecto
};