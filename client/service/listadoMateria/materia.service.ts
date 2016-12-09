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

    buscarMateriaPor(nombre, codigo, cantidadASaltear) {
        return this.authHttp
            .get('/api/materias/buscar?nombre=' + nombre + '&codigo=' + codigo + '&skip=' + cantidadASaltear)
            .map((response: Response) => response.json());
    }

    crearMateria(materia){
    	return this.authHttp
            .post('/api/materias/guardar', JSON.stringify({
                materia: materia
            }), new RequestOptions({
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })).map((response: Response) => response.json())
    }
}