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
    if(!this.seLLenaronLosCampoCorrectamente())
      return;

    this.respuestaEncuestaService.asignarAlumnoAEncuesta(this.alumno, this.encuesta).subscribe(
                (respuestaEcuesta) => {
                    this.alumnos.push(respuestaEcuesta);
                    this.alumno.nombreYApellidoAlumno = "";
                    this.alumno.DNIAlumno = "";
                    this.alumno.emailAlumno = "";
                },
                (error: Error) => {
                    console.log(error);
                });
  }

  seLLenaronLosCampoCorrectamente(){
    if(this.alumno.nombreYApellidoAlumno.length == 0 || this.alumno.DNIAlumno.length == 0
        || this.alumno.emailAlumno.length == 0){
          alert("Todos los campos son obligatorios.");
          return false;
    }

    if(!/^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/.test(this.alumno.emailAlumno)){
      alert("Email inválido.");
      return false;
    }

    return true;
  }

  crearUrlPara(alumno){
    return document.baseURI + '#/respuesta-encuesta/' + alumno.token;
  }
}