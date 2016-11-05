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

	constructor(respuestaEncuestaService:RespuestaEncuestaService, encuestaService:EncuestaService, private apiService: ApiService){
		respuestaEncuestaService.obtenerMaterias().subscribe(
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
		this.materiasOpciones; = [];
	}

	eligioOpcionParaMateria(nombreMateria){
		var estaLaMateria = false;
		for(var i = 0; i < this.materiasOpciones.length; i++){
			if(this.materiasOpciones[i].Nombre == nombreMateria){
				estaLaMateria = true;
				break;
			}
		}
		return estaLaMateria;
	}

	onChange(nombreMateria, data: {}) {
		if(this.materiasOpciones.length == 0){
			var materiaOpcion = { Nombre: nombreMateria, Opcion: data};
			this.materiasOpciones.push(materiaOpcion);
		}
		for(var i = 0; i < this.materiasOpciones.length; i++){
			if(this.materiasOpciones[i].Nombre == nombreMateria){
				this.materiasOpciones[i].Opcion = data;
				break;
			}
		}

		var estaLaMateria = false;
		for(var i = 0; i < this.materiasOpciones.length; i++){
			if(this.materiasOpciones[i].Nombre == nombreMateria){
				estaLaMateria = true;
				break;
			}
		}

		if(!estaLaMateria){
			var materiaOpcion = { Nombre: nombreMateria, Opcion: data};
			this.materiasOpciones.push(materiaOpcion);
		}
	}

	enviar(){
		console.log(this.materiasOpciones);
	}
}
