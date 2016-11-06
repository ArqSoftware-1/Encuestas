import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class OpcionService{

	constructor(private http: Http) {}

	obtenerOpcion(idOpcion){
		return this.http
	               .get('/api/opciones/get?id=' + idOpcion)
	               .map((response: Response) => response.json())
	}
}