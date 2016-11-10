import { Component } from '@angular/core';
import { EncuestaService } from "../../service/encuesta/encuesta.service";


@Component({
  selector: 'encuestas',
  templateUrl: 'client/components/encuesta/listadoEncuesta.component.html',
  providers: [EncuestaService]
})

export class ListadoEncuestaComponent {
	encuestas;
	
	constructor(encuestaService:EncuestaService){
		encuestaService.obtenerTodasLasEncuestas().subscribe(
                (encuestas) => {
                    	this.encuestas = encuestas;                    
                },
                (error: Error) => {
                    console.log(error);
                });
	}
}