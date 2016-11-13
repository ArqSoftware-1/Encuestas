import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class MateriasService{

	constructor(private http: AuthHttp) {}

	obtenerMateria(idMateria){
		return this.http
	               .get('/api/materias/get?id=' + idMateria)
	               .map((response: Response) => response.json())
	}
}