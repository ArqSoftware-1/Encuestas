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
    encuesta: any = {
        anho: "",
        semestre: 1,
        carrera: "",
        fechaLimite: ""
    };

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
        $("#listadoMateria").removeClass("active");
        setTimeout(()=>{
          $( "#fecha-limite" ).datepicker({ dateFormat: 'dd/mm/yy'});   
        }, 1000)
    }

    formatearFecha(fecha){
      if(!fecha){return '-'}
      fecha = new Date(fecha);
      var fechaFormateada = this.agregarCero(fecha.getDate())  + "/" + (this.agregarCero(fecha.getMonth() + 1)) + "/" + fecha.getFullYear();
      return fechaFormateada;
    }

    desformatearFecha(fecha){
      var fechaSplit = fecha.split("/");
      var fechaFormateada = fechaSplit[2] + "/" + fechaSplit[1] + "/" + fechaSplit[0];
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


    crearEncuesta(){
        this.encuesta.anho = $("#anho").val();
        this.encuesta.carrera = $("#carrera").val();
        this.encuesta.fechaLimite = $("#fecha-limite").val();
console.log(this.encuesta);
        var encuestaRepetida = this.encuestas.filter((encuesta)=>{
          return encuesta.anho == this.encuesta.anho && encuesta.carrera == this.encuesta.carrera
            && encuesta.semestre == this.encuesta.semestre;
        })[0];

        if(encuestaRepetida){
          alert("La encuesta que desea ingresar ya fue agregada."); 
          return;
        }

        if(!this.esFechaValida(this.encuesta.fechaLimite)){
          alert("La fecha ingresada es inválida. El formato debe ser dd/mm/yyyy."); 
          return;
        }else{
          this.encuesta.fechaLimite = this.desformatearFecha(this.encuesta.fechaLimite);
        }

        if(this.encuesta.anho  < 2000 || this.encuesta.anho  > 3000){
          alert("Año inválido, debe ser mayor a 2000 y menor a 3000."); 
          return;
        }

        if(!this.encuesta.carrera || this.encuesta.carrera.length < 4){
          alert("Nombre de carrera inválido."); 
          return;
        }

        this.encuestaService.crearEncuesta(this.encuesta).subscribe(
              (encuesta) => {
                  alert("La encuesta fue creada con exito.");
                  this.encuestas.unshift(encuesta);
              }, (error: Error) => {
                  alert("No se pudo crear el director.");
                  console.log(error);
              });
    }

    seleccionarSemestre(semestre){
      this.encuesta.semestre = semestre;
    }

    esFechaValida(fecha){
      var pattern =/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
      return pattern.test(fecha);
    }

    chequearSesion(){
        localStorage.removeItem("id_token");
        location.href = '/#/login';
        location.reload();
    }
}