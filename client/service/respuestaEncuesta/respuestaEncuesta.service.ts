import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { AuthHttp } from "angular2-jwt";
import { MateriasService } from "../home/materias.service";
import { OpcionService } from "../home/opcion.service";

@Injectable()
export class RespuestaEncuestaService{
	materiaService;
	opcionService;

//materiasService: MateriasService, opcionService: OpcionService, 
	constructor(private http: AuthHttp) {
		//this.materiaService = materiasService;
		//this.opcionService = opcionService;
	}

	obtenerRespuestaEncuesta(token:String){
      	return this.http
	               .get('/api/respuestas/encuesta/detalle?token=' + token)
	               .map((response: Response) => response.json())
	}

	actualizarRespuestas(respuestaEncuestaId, respuestas){
		return this.http
	               .post('/api/respuestas/encuesta/actualizar-respuestas?id=' + respuestaEncuestaId, {respuestas: respuestas})
	               .map((response: Response) => response.json())
	}
}