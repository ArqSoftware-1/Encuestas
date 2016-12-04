import {Injectable} from '@angular/core';
import { AuthHttp } from "angular2-jwt";
import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class EncuestaService {

    constructor(private http: AuthHttp) {}

    obtenerEncuesta(id) {
        return this.http
            .get('/api/encuestas/detalle?id=' + id)
            .map((response: Response) => response.json());
    }

    obtenerTodasLasEncuestas() {
        return this.http
            .get('/api/encuestas/listado')
            .map((response: Response) => response.json());
    }

    obtenerEstadisticas(id) {
        return this.http
            .get('/api/encuestas/estadisticas?id=' + id)
            .map((response: Response) => response.json());
    }


    completaron(id) {
        return this.http
            .get('/api/encuestas/completaron?id=' + id)
            .map((response: Response) => response.json());
    }

    activar(id) {
        return this.http
            .put('/api/encuestas/activar', JSON.stringify({
                id: id
            }), new RequestOptions({
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })).map((response: Response) => response.json())
    }

    desactivar(id) {
        return this.http
            .put('/api/encuestas/desactivar', JSON.stringify({
                id: id
            }), new RequestOptions({
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })).map((response: Response) => response.json())
    }
}