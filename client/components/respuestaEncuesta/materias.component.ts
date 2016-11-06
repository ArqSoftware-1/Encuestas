import { Component } from '@angular/core';
import { RespuestaEncuestaService } from "../../service/respuestaEncuesta/respuestaEncuesta.service";
import { EncuestaService } from "../../service/respuestaEncuesta/encuesta.service";
import { ApiService } from "../../service/api.service";

@Component({
  selector: 'materias',
  templateUrl: 'client/components/respuestaEncuesta/materias.component.html',
  providers: [RespuestaEncuestaService, EncuestaService],
  inputs: ['materiasOpciones']
 
})
export class MateriasComponent {
	materiasOpciones;
	materias;
	opciones;
	respuestaEncuestaService;

	constructor(respuestaEncuestaService:RespuestaEncuestaService, encuestaService:EncuestaService, private apiService: ApiService){
		this.respuestaEncuestaService = respuestaEncuestaService;
		respuestaEncuestaService.obtenerRespuestaEncuesta().subscribe(
                (dataMaterias) => {  
                	console.log(dataMaterias); 

                	encuestaService.obtenerEncuesta(dataMaterias.encuesta._id).subscribe(
		                (dataEncuesta) => {  this.materias = dataEncuesta.materias},		                
		                (errorObtenerEncuesta: Error) => {
		                    console.log(errorObtenerEncuesta);
		                });

                },
                (error: Error) => {
                    console.log(error);
                });
		this.materiasOpciones = [];
	}

	eligioOpcionParaMateria(idMateria){
		var estaLaMateria = false;
		for(var i = 0; i < this.materiasOpciones.length; i++){
			if(this.materiasOpciones[i].IdMateria == idMateria){
				estaLaMateria = true;
				break;
			}
		}
		return estaLaMateria;
	}

	agregarMateriaOpcion(idMateria, idOpcion){
		var materiaOpcion = { IdMateria: idMateria, IdOpcion: idOpcion};
		this.materiasOpciones.push(materiaOpcion);
	}

	cambiarOpcionDeMateria(idMateria, idOpcion){
		for(var i = 0; i < this.materiasOpciones.length; i++){
			if(this.materiasOpciones[i].IdMateria == idMateria){
				this.materiasOpciones[i].IdOpcion = idOpcion;
				break;
			}
		}
	}

	onChange(idMateria, idOpcion) {
		if(this.materiasOpciones.length == 0 ││ !this.eligioOpcionParaMateria(idMateria))
			this.agregarMateriaOpcion(idMateria, idOpcion);
		
		this.cambiarOpcionDeMateria(idMateria, idOpcion);
	}

	enviar(){
		console.log(this.materiasOpciones);
		this.respuestaEncuestaService.guardarRespuesta(this.materiasOpciones);
	}
}
