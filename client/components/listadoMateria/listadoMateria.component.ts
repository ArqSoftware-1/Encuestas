import { Component, ValueProvider } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { MateriaService } from "../../service/listadoMateria/materia.service";

declare var $:JQueryStatic;

const WINDOW_PROVIDER: ValueProvider = {
    provide: Window,
    useValue: window
};

@Component({
    selector: 'materia',
    templateUrl: 'client/components/listadoMateria/listadoMateria.component.html',
    providers: [MateriaService, WINDOW_PROVIDER]
})

export class ListadoMateriaComponent {
	materiaService;
	materia: any = {
        nombre: "",
        codigo: "",
        descripcion: "",
        grupo: ""
    };
    nombre = "";
    codigo = "";
    materias = [];
    mostrarLoading = false;
    window: Window;
    cantidadASaltear = 0;

    constructor(materiaService: MateriaService, window: Window) {
    	this.materiaService = materiaService;
    	this.window = window;
    	
    	this.buscar();

        $("#directorCrear").removeClass("active");
        $("#encuestaListado").removeClass("active");
        $("#listadoMateria").addClass("active");
    }

    buscar() {
    	this.cantidadASaltear = 0;
        this.materiaService.buscarMateriaPor(this.nombre, this.codigo, this.cantidadASaltear).subscribe(
            (materias) => {
                this.materias = materias;
            }, (error: Error) => {
                console.log(error);
            });
    }

    mostrarMas() {
        this.cantidadASaltear = this.cantidadASaltear + 10;
        this.materiaService.buscarMateriaPor(this.nombre, this.codigo, this.cantidadASaltear).subscribe(
            (materias) => {
                for (var i = 0; i < materias.length; i++)
                    this.materias.push(materias[i]);
                setTimeout(() => this.window.scrollTo(0, this.materias.length * 100), 10);
            }, (error: Error) => {
                console.log(error);
            });
    }

    crearMateria(){
    	 if (!this.seLLenaronLosCampoCorrectamente())
            return;

    	this.materiaService.crearMateria(this.materia).subscribe(
            (materia) => {
            	if (materia.error) {
                    alert(materia.error);
                    return;
                }
                
            	if(this.materias.length < 10)
                	this.materias.push(materia);

                this.materia.nombre = "";
                this.materia.codigo = "";
                this.materia.grupo = "";
                this.materia.descripcion = "";
                alert("La materia ha sido creada con éxito");
            }, (error: Error) => {
                console.log(error);
            });	
    }

    seLLenaronLosCampoCorrectamente(){
    	if(this.materia.nombre.length == 0 || this.materia.codigo.length == 0 || 
    		this.materia.grupo.length == 0 || this.materia.descripcion.length == 0){
    		alert("Todos los campos son obligatorios.");
            return false;
        }

        return true;    	
    }
    
}