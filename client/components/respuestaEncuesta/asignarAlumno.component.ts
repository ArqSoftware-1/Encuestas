import { Component } from '@angular/core';

import { EncuestaService } from "../../service/encuesta/encuesta.service";
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'asignar-usuario',
  templateUrl: 'client/components/respuestaEncuesta/asignarAlumno.component.html',
  providers: [EncuestaService]
})

export class AsignarAlumnoComponent {
  encuesta;
  respuestaEncuesta = { nombreYApellido: "",
                        DNI: "",
                        email:""
                      };
  
  constructor(encuestaService:EncuestaService, route: ActivatedRoute){
    var idEncuesta = route.snapshot.params['idEncuesta'];
    this.encuesta = encuestaService.obtenerEncuesta(idEncuesta);
    encuestaService.obtenerEncuesta(idEncuesta).subscribe(
                (encuesta) => {
                    this.encuesta = encuesta;
                },
                (error: Error) => {
                    console.log(error);
                });
  }
}