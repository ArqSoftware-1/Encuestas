import { Component } from '@angular/core';
import { MateriasService } from "../../service/home/materias.service"

@Component({
  selector: 'materias',
  templateUrl: 'client/components/home/materias.component.html',
  providers: [MateriasService],
  inputs: ['materiasOpciones']
 
})
export class MateriasComponent {
	materiasOpciones;
	materias;
	opciones;

	constructor(estudiantesService:MateriasService){
		this.materias = estudiantesService.obtenerMaterias();
		this.opciones = estudiantesService.obtenerOpciones();
		this.materiasOpciones = [];
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
