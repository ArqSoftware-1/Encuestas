import mongoose = require("mongoose");

export class Opcion implements mongoose.Document {
    _Descripcion: string;

    constructor(public descripcion: string) {
        this._Descripcion = descripcion;
    }

    toString() {
        return this._Descripcion;
    }
}