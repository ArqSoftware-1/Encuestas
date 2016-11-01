import { Opcion } from "./Opcion";

export class Materia {
    _Opciones: Array<Opcion> = [];
    _NombreMateria: String;

    constructor(public opciones: Array<Opcion>, public nombreMateria: String) {
        this._Opciones = opciones;
        this._NombreMateria = nombreMateria;
    }
}