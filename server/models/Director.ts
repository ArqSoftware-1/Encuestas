import { Document, Schema, model } from 'mongoose'

class Director {
    email: String;
    password: String;
    salt: Buffer;
}

var EsquemaDirector = new Schema({ email: { type: String }, 
                                   password: { type: String},
                                   salt: { type: Buffer}
                                 });

interface DocumentoDirector extends Director, Document { };

const ModeloDirector = model<DocumentoDirector>('Director', EsquemaDirector);

export {Director, ModeloDirector, EsquemaDirector};