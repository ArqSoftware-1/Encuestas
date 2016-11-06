import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { MateriasService } from "../home/materias.service";
import { OpcionService } from "../home/opcion.service";

@Injectable()
export class RespuestaEncuestaService{
	materiaService;
	opcionService;

//materiasService: MateriasService, opcionService: OpcionService, 
	constructor(private http: Http) {
		//this.materiaService = materiasService;
		//this.opcionService = opcionService;
	}

	obtenerRespuestaEncuesta(){
      	return this.http
	               .get('/api/respuestas/encuesta/detalle?email=alumno@unq.edu.ar')
	               .map((response: Response) => response.json())
	}

	guardarRespuesta(materiasOpciones){
		var respuestaEncuesta = this.obtenerRespuestaEncuesta();

		for(var i = 0; i < materiasOpciones.length; i++){
			var materia = this.materiaService.obtenerMateria(materiasOpciones[i].IdMateria);
			var opcion = this.opcionService.obtenerOpcion(materiasOpciones[i].IdOpcion);
			//var modeloRespuestaMateria = new ModeloRespuestaMateria({materia: materia, opcion: opcion})
			console.log({materia: materia, opcion: opcion});
			//respuestaEncuesta.respuestaMateria.push(modeloRespuestaMateria);
			//update respuestaEncuesta
		}
	}
}