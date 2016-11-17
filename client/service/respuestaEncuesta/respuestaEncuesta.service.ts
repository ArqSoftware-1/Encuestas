import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class RespuestaEncuestaService{
	materiaService;
	opcionService;

	constructor(private authHttp: AuthHttp, private http: Http) {
		
	}

	obtenerRespuestaEncuesta(token:String){
      	return this.http
	               .get('/api/publica/respuestas/encuesta/detalle?token=' + token)
	               .map((response: Response) => response.json())
	}

	actualizarRespuestas(respuestaEncuestaId, respuestas){
		return this.http
	               .post('/api/publica/respuestas/encuesta/actualizar-respuestas?id=' + respuestaEncuestaId, {respuestas: respuestas})
	               .map((response: Response) => response.json())
	}

	asignarAlumnoAEncuesta(alumno, encuesta){
		return this.authHttp
	               .post('/api/respuestas/encuesta/guardar', JSON.stringify({alumno: alumno, encuesta: encuesta}),  new RequestOptions({
            			headers: new Headers({"Content-Type": "application/json"})
        })).map((response: Response) => response.json())
	}

	obtenerRespuestasEncuesta(){
		return this.authHttp
	               .get('/api/respuestas/encuesta/listado')
	               .map((response: Response) => response.json())
	}

	obtenerRespuestasEncuestaPorAnhoYSemestre(anho, semestre){
		return this.authHttp
	               .get('/api/respuestas/encuesta/listadoPor?anho=' + anho + '&semestre=' + semestre)
	               .map((response: Response) => response.json())
	}

	buscarAlumnoPor(nombreYApellido, dni, idEncuesta){
		return this.authHttp
	               .get('/api/respuestas/encuesta/buscarPor?nombreYApellido=' + nombreYApellido + '&dni=' + dni + '&idEncuesta=' + idEncuesta)
	               .map((response: Response) => response.json())
	}
}