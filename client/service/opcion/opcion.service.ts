import {Injectable} from '@angular/core';
import { AuthHttp } from "angular2-jwt";
import {Http, Response} from '@angular/http';

@Injectable()
export class OpcionService {

    constructor(private http: AuthHttp) {}

    obtenerOpcion(id) {
        return this.http
            .get('/api/opciones/detalle?id=' + id)
            .map((response: Response) => response.json());
    }

    obtenerTodasLasOpciones() {
        return this.http
            .get('/api/opciones/listado')
            .map((response: Response) => response.json());
    }
}