import {Injectable} from '@angular/core';
import { AuthHttp } from "angular2-jwt";
import {Http, Response} from '@angular/http';

@Injectable()
export class EncuestaService{

	constructor(private http: AuthHttp) {}

	obtenerEncuesta(id){
      	return this.http
	               .get('/api/encuestas/detalle?id=' + id)
	               .map((response: Response) => response.json())
	}

	obtenerTodasLasEncuestas(){
      	return this.http
	               .get('/api/encuestas/listado')
	               .map((response: Response) => response.json())
	}
}