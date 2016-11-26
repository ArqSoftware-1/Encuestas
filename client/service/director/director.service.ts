import { Injectable } from '@angular/core';
import { AuthHttp } from "angular2-jwt";
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class DirectorService {

    constructor(private authHttp: AuthHttp) {}

    crearDirector(email, pass){
        return this.authHttp
            .post('/api/director/guardar', JSON.stringify({
                email: email,
                password: pass
            }), new RequestOptions({
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })).map((response: Response) => response.json())
    }

    obtenerDirectorPorEmail(email){
        return this.authHttp
            .get('/api/director/directorPorEmail?email=' + email)
            .map((response: Response) => response.json())
    }

    obtenerDirectores() {
        return this.authHttp
            .get('/api/director/listado')
            .map((response: Response) => response.json())
    }

    eliminarDirector(id) {
        return this.authHttp
            .delete('/api/director/eliminar?id=' + id)
            .map((response: Response) => response.json())
    }
}