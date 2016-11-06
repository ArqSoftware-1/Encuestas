import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class MateriasService{

	constructor(private http: Http) {}

	obtenerMaterias(){
		return [ {Nombre:'Introducción a la programacion', OpcionElegida: '' }, 
				{Nombre: 'Matematica 1', OpcionElegida: ''}, 
				{Nombre:'Organizacion de las computadoras', OpcionElegida: '' }];
	}

	obtenerOpciones(){
		return [ {Id: 1, Nombre: 'Ya curse' }, { Id: 2, Nombre: 'Voy a cursar en c1' }, { Id: 3, Nombre: 'Voy a cursar en c2' }, { Id: 4, Nombre: 'No voy a cursar' }, { Id: 5, Nombre: 'Me gustaria pero no puedo' } ];
	}

	obtenerMateria(idMateria){
		return this.http
	               .get('/api/materias/get?id=' + idMateria)
	               .map((response: Response) => response.json())
	}
}