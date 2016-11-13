import { Component } from '@angular/core';

import { EncuestaService } from "../../service/encuesta/encuesta.service";
import { RespuestaEncuestaService } from "../../service/respuestaEncuesta/respuestaEncuesta.service";
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'asignar-usuario',
  templateUrl: 'client/components/respuestaEncuesta/asignarAlumno.component.html',
  providers: [EncuestaService, RespuestaEncuestaService]
})

export class AsignarAlumnoComponent {
  encuesta: any = { 
                    anho: "",
                    semestre:"",
                  };
  respuestaEncuestaService;
  encuestaService;
  alumno : any = { nombreYApellidoAlumno: "",
                        DNIAlumno: "",
                        emailAlumno:""
                      };
  alumnos = [];
  
  constructor(encuestaService:EncuestaService, route: ActivatedRoute, respuestaEncuestaService:RespuestaEncuestaService){
    var idEncuesta = route.snapshot.params['idEncuesta'];
    this.respuestaEncuestaService = respuestaEncuestaService;

    encuestaService.obtenerEncuesta(idEncuesta).subscribe(
                (encuesta) => {
                    this.encuesta = encuesta;
                    respuestaEncuestaService.obtenerRespuestasEncuestaPorAnhoYSemestre(encuesta.anho, encuesta.semestre).subscribe(
                            (respuestasEcuesta) => {
                                this.alumnos = respuestasEcuesta;
                            },
                            (error: Error) => {
                                console.log(error);
                            });
                },
                (error: Error) => {
                    console.log(error);
                });
  }

  asignarAlumno(){
    this.respuestaEncuestaService.asignarAlumnoAEncuesta(this.alumno, this.encuesta).subscribe(
                (respuestaEcuesta) => {
                    this.alumnos.push(respuestaEcuesta);
                },
                (error: Error) => {
                    console.log(error);
                });
  }
}