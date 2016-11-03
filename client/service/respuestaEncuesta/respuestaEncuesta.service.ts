import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class RespuestaEncuestaService{

	constructor(private http: Http) {}

	obtenerMaterias(){
      	return this.http
	               .get('/api/respuestas/encuesta/detalle?email=alumno@unq.edu.ar')
	               .map((response: Response) => response.json())
	}

	obtenerOpciones(){
		return [ {Id: 1, Nombre: 'Ya curse' }, { Id: 2, Nombre: 'Voy a cursar en c1' }, { Id: 3, Nombre: 'Voy a cursar en c2' }, { Id: 4, Nombre: 'No voy a cursar' }, { Id: 5, Nombre: 'Me gustaria pero no puedo' } ];
	}
}