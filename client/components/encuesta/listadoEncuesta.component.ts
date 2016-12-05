import { Component } from '@angular/core';
import { EncuestaService } from "../../service/encuesta/encuesta.service";

declare var $:JQueryStatic;

@Component({
  selector: 'encuestas',
  templateUrl: 'client/components/encuesta/listadoEncuesta.component.html',
  providers: [EncuestaService]
})

export class ListadoEncuestaComponent {
    encuestas = [];
    encuestaService;

    constructor(encuestaService: EncuestaService) {
        this.encuestaService = encuestaService;
        encuestaService.obtenerTodasLasEncuestas().subscribe(
            (encuestas) => {
                this.encuestas = encuestas;
            }, (error: Error) => {
                console.log(error);
                this.chequearSesion()
            });

        $("#directorCrear").removeClass("active");
        $("#encuestaListado").addClass("active");
    }

    formatearFecha(fecha){
      if(!fecha){return '-'}
      fecha = new Date(fecha);
      var fechaFormateada = this.agregarCero(fecha.getDate())  + "-" + (this.agregarCero(fecha.getMonth() + 1)) + "-" + fecha.getFullYear() + " ";
      return fechaFormateada;
    }

    agregarCero(numero){
      if(numero < 10){
        return '0' + numero;
      }
      return numero;
    }

    activar(idEncuesta, index){
      this.encuestaService.activar(idEncuesta).subscribe(
            (encuesta) => {
                this.encuestas[index] = encuesta;
            }, (error: Error) => {
                console.log(error);
                alert("Error al activar una encuesta");
            });
    }

    desactivar(idEncuesta, index){
      this.encuestaService.desactivar(idEncuesta).subscribe(
            (encuesta) => {
                this.encuestas[index] = encuesta;
            }, (error: Error) => {
                console.log(error);
                alert("Error al desactivar una encuesta");
            });
    }

    chequearSesion(){
        localStorage.removeItem("id_token");
        location.href = '/#/login';
        location.reload();
    }
}