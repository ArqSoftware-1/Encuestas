import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class EncuestaService{

	constructor(private http: Http) {}

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