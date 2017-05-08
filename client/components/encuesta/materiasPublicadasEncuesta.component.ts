import { Component,Directive,ElementRef,Input,OnInit } from '@angular/core';
import { EncuestaService } from "../../service/encuesta/encuesta.service";
import { OpcionService } from "../../service/opcion/opcion.service";
import { MateriaService } from "../../service/listadoMateria/materia.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var $;

@Component({
  selector: 'materias-publicadas-encuesta',
  templateUrl: 'client/components/encuesta/materiasPublicadasEncuesta.component.html',
  providers: [EncuestaService, OpcionService, MateriaService],
})

export class MateriasPublicadasEncuestaComponent{

    encuesta;
    materias = [];
    titulo;
    opciones = [];
    comisionSeleccionada = 'c1';
    materiaSeleccionada;
    encuestaService;
    materiasAAsignar = [];

    constructor(encuestaService: EncuestaService, opcionService: OpcionService, materiaService:MateriaService, route: ActivatedRoute) {
        var id = route.snapshot.params['id'];
        this.encuestaService = encuestaService;
        encuestaService.obtenerEncuesta(id).subscribe(
            (encuesta) => {
                console.log(encuesta);
                this.encuesta = encuesta; 
                this.materias = encuesta.materias;
                this.titulo = 'Materias publicadas en encuesta ' + encuesta.anho + ' del semestre ' + encuesta.semestre + ' - ' + encuesta.carrera;
                materiaService.obtenerMaterias().subscribe(
                    (materias) => {
                        this.materiasAAsignar = materias;
                        for (var i = 0; i < this.materias.length; ++i)
                            this.materiasAAsignar = this.materiasAAsignar.filter(m => m._id != this.materias[i]._id);

                    }, (error: Error) => {
                        console.log(error);
                    });
            }, (error: Error) => {
                console.log(error);
                this.chequearSesion();
            });
    }

    asignarMateria(materia){
        var materiaAAsignar = this.materias.filter(m => m._id == materia._id);

        if(materiaAAsignar.length > 0){
            alert("La materia ya se encuentra asignada.");
        }else{
            this.encuestaService.asignarMateria(materia._id, this.encuesta._id).subscribe(
                (materiaResultado) => {
                    this.materias.unshift(materia);
                    this.materiasAAsignar = this.materiasAAsignar.filter(m => m._id != materia._id);
                    alert("La materia se ha asignado con éxito.");
                }, (error: Error) => {
                    console.log(error);
                });
        }
    }

    quitarMateria(materia){
        this.encuestaService.quitarMateria(materia._id, this.encuesta._id).subscribe(
                (materiaResultado) => {
                    this.materiasAAsignar.unshift(materia);
                    this.materias = this.materias.filter(m => m._id != materia._id);
                    alert("La materia fue eliminada de la encuesta correctamente.");
                }, (error: Error) => {
                    console.log(error);
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