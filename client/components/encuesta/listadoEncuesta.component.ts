import { Component } from '@angular/core';
import { EncuestaService } from "../../service/encuesta/encuesta.service";

declare var $:JQueryStatic;

@Component({
  selector: 'encuestas',
  templateUrl: 'client/components/encuesta/listadoEncuesta.component.html',
  providers: [EncuestaService]
})

export class ListadoEncuestaComponent {
    encuestas;

    constructor(encuestaService: EncuestaService) {
        encuestaService.obtenerTodasLasEncuestas().subscribe(
            (encuestas) => {
                this.encuestas = encuestas;
            }, (error: Error) => {
                console.log(error);
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
}