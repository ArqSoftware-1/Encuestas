import { Component } from '@angular/core';
import { RespuestaEncuestaService } from "../../service/respuestaEncuesta/respuestaEncuesta.service";
import { ApiService } from "../../service/api.service";

@Component({
  selector: 'materias',
  templateUrl: 'client/components/respuestaEncuesta/materias.component.html',
  providers: [RespuestaEncuestaService],
  inputs: ['materiasOpciones']
 
})
export class MateriasComponent {
	materiasOpciones;
	materias;
	opciones;

	constructor(respuestaEncuestaService:RespuestaEncuestaService, private apiService: ApiService){
		respuestaEncuestaService.obtenerMaterias().subscribe(
                (data) => {  console.log(data)},
                (error: Error) => {
                    console.log(error);
                });

		this.opciones = respuestaEncuestaService.obtenerOpciones();
		this.materiasOpciones = [];
		this.materias = [];
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
