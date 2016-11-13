import {Injectable} from '@angular/core';
import { AuthHttp } from "angular2-jwt";
import {Http, Response} from '@angular/http';

@Injectable()
export class OpcionService{

	constructor(private http: AuthHttp) {}

	obtenerOpcion(idOpcion){
		return this.http
	               .get('/api/opciones/get?id=' + idOpcion)
	               .map((response: Response) => response.json())
	}
}