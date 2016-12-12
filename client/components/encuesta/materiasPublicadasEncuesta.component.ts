import { Component,Directive,ElementRef,Input,OnInit } from '@angular/core';
import { EncuestaService } from "../../service/encuesta/encuesta.service";
import { OpcionService } from "../../service/opcion/opcion.service";
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'materias-publicadas-encuesta',
  templateUrl: 'client/components/encuesta/materiasPublicadasEncuesta.component.html',
  providers: [EncuestaService, OpcionService],
})

export class MateriasPublicadasEncuestaComponent{

    encuesta;
    materias;
    titulo;
    opciones = [];
    comisionSeleccionada = 'c1';
    materiaSeleccionada;
    encuestaService;

    constructor(encuestaService: EncuestaService, opcionService: OpcionService, route: ActivatedRoute) {
        var id = route.snapshot.params['id'];
        this.encuestaService = encuestaService;
        encuestaService.obtenerEncuesta(id).subscribe(
            (encuesta) => {
                console.log(encuesta);
                this.encuesta = encuesta; 
                this.materias = encuesta.materias;
                this.titulo = 'Materias publicadas en encuesta ' + encuesta.anho + ' del semestre ' + encuesta.semestre + ' - ' + encuesta.carrera;
            }, (error: Error) => {
                console.log(error);
                this.chequearSesion();
            });
    }

    modalAgregarComision(materia){
        this.opciones = materia.opciones;
        this.materiaSeleccionada = materia;
        $('.modal').modal({backdrop: 'static', keyboard: false});
    }

    seleccionarOpcionDeMateria(comision){
        this.comisionSeleccionada = comision;
    }

    esLaOpcionElegida(comision){
        return this.comisionSeleccionada == comision;
    }

    asignarComision(){
        var descripcion = 'Voy a cursar en ' + this.comisionSeleccionada;

        var opcionesSimilares = this.opciones.filter((opcion)=>{
            return opcion.descripcion == descripcion;
        });

        if(opcionesSimilares.length > 0){
            alert("La comisión ya fue asignada.");
            return;
        }

        if(!$('#limite').val() || $('#limite').val() < 1){
            alert("El límite es obligatorio y debe ser mayor a 0.");
            return;
        }

      this.encuestaService.asignarComisionAMateriaDeEncuesta(this.encuesta._id,  this.materiaSeleccionada._id, descripcion, $('#limite').val() || 3).subscribe(
            (encuesta) => {
                var opcion = {descripcion: descripcion};
                this.opciones.unshift(opcion);
            }, (error: Error) => {
                console.log(error);
                alert("Error al ingresar una comision");
            });
    }

    chequearSesion(){
        localStorage.removeItem("id_token");
        location.href = '/#/login';
        location.reload();
    }

}