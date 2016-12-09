import { Injectable } from '@angular/core';
import { AuthHttp } from "angular2-jwt";
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class MateriaService {

    constructor(private authHttp: AuthHttp) {}

    obtenerMaterias() {
        return this.authHttp
            .get('/api/materias/listado')
            .map((response: Response) => response.json());
    }
}