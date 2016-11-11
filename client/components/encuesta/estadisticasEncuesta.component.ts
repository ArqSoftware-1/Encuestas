import { Component } from '@angular/core';
import { EncuestaService } from "../../service/encuesta/encuesta.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'encuestas',
  templateUrl: 'client/components/encuesta/estadisticasEncuesta.component.html',
  providers: [EncuestaService]
})

export class EstadisticasEncuestaComponent {
	encuestas;
	
	constructor(encuestaService:EncuestaService, route: ActivatedRoute){
		var id = route.snapshot.params['id'];
		encuestaService.obtenerEstadisticas(id).subscribe(
                (encuestas) => {
                    console.log(encuestas);                    
                },
                (error: Error) => {
                    console.log(error);
                });
	}
}