export class Opcion {
  _Descripcion: string;

  constructor(public descripcion: string) {
        this._Descripcion = descripcion;
    }

    toString() {
        return this._Descripcion;
    }
}