import { Component } from '@angular/core';
import { RespuestaEncuestaService } from "../../service/respuestaEncuesta/respuestaEncuesta.service";
import { ApiService } from "../../service/api.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'materias',
  templateUrl: 'client/components/respuestaEncuesta/materias.component.html',
  providers: [RespuestaEncuestaService]
 
})
export class MateriasComponent {
    respuestaEncuesta;
    materias;
    respuestaEncuestaService: RespuestaEncuestaService;
    encuestaFinalizada: Boolean;
    enlace: String;

    constructor(respuestaEncuestaService:RespuestaEncuestaService, route: ActivatedRoute){
        var token = route.snapshot.params['token'];
        this.encuestaFinalizada = false;
        this.enlace = document.URL;

        this.respuestaEncuestaService = respuestaEncuestaService;
        this.respuestaEncuestaService.obtenerRespuestaEncuesta(token).subscribe(
                (respuestaEncuesta) => {
                    if(respuestaEncuesta){
                        this.respuestaEncuesta = respuestaEncuesta;
                        this.materias = respuestaEncuesta.encuesta.materias;
                    }
                },
                (error: Error) => {
                    console.log(error);
                });
    }

    esLaOpcionElegida(materia, opcion){
        var respuestaMateria = this.respuestaEncuesta.respuestasMateria.filter(
        (materiaOpcion) => materiaOpcion.materia._id == materia._id)[0];
        if(respuestaMateria){
            if(respuestaMateria.opcion._id == opcion._id){
                materia.tieneOpcionElegida = !materia.tieneOpcionPorDefecto;
                return true;
            }else{
                return false;
            }
        }
        else{
            if(opcion._id == materia.idOpcionPorDefecto){
                materia.tieneOpcionPorDefecto = true;
                this.respuestaEncuesta.respuestasMateria.push({materia, opcion});
                return true;
            }else{
                return false;
            }
        }
    }

    tieneOpcionElegida(materia){
        var respuestaMateria = this.respuestaEncuesta.respuestasMateria.filter(
            (materiaOpcion) => materiaOpcion.materia._id == materia._id)[0];
        return respuestaMateria ? true : false;
    }

    seleccionarOpcionDeMateria(idMateria, idOpcion){
        var materia = this.respuestaEncuesta.encuesta.materias.filter(
              (materia) => materia._id == idMateria)[0];
        var opcion = materia.opciones.filter(
              (opcion) => opcion._id == idOpcion)[0];

        this.respuestaEncuesta.respuestasMateria = this.respuestaEncuesta.respuestasMateria.filter(
                                                        (opcionSeleccionada) =>
                                                                 opcionSeleccionada.materia._id !== idMateria);
        if(opcion){
            this.respuestaEncuesta.respuestasMateria.push({materia, opcion});
            materia.tieneOpcionPorDefecto = false;
            materia.tieneOpcionElegida = true;
        }
    }

    guardar(){
        if(!this.respuestaEncuesta)return;
        this.respuestaEncuestaService.actualizarRespuestas(this.respuestaEncuesta._id, 
            this.respuestaEncuesta.respuestasMateria).subscribe(
                (data) => {
                    console.log(data);
                    this.encuestaFinalizada = true;
                },
                (error: Error) => {
                    console.log(error);
            });;
    }
}
