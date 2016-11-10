import { Document, Schema, model } from 'mongoose'

class Director {
    email: String;
    password: String;
    salt: String;
}

var EsquemaDirector = new Schema({ email: { type: String }, 
                                   password: { type: String},
                                   salt: { type: String}
                                 });

interface DocumentoDirector extends Director, Document { };

const ModeloDirector = model<DocumentoDirector>('Director', EsquemaDirector);

export {Director, ModeloDirector, EsquemaDirector};