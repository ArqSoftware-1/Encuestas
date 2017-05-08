import { Component, ValueProvider } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { MateriaService } from "../../service/listadoMateria/materia.service";

declare var $;

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


    changeListener($event): void {
        this.mostrarLoading = true;
        this.readThis($event.target, this);
    }

    readThis(inputValue: any, listadoMateriaComponent: ListadoMateriaComponent): void {
        var file: File = inputValue.files[0];
        var myReader: FileReader = new FileReader();

        myReader.onloadend = function(e) {

            var lines = myReader.result.split("\n");
            lines = lines.filter((line) => {
                return line != "";
            });

            var result = [];

            var headers = ['nombre', 'codigo', 'descripcion', 'grupo'];

            for (var i = 1; i < lines.length; i++) {

                var obj = {};
                var currentline = lines[i].split(";");

                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j];
                }
                result.push(obj);
            }

            listadoMateriaComponent.materiaService.importarMaterias(result).subscribe(
                (respuesta) => {
                    var mensaje = 'Resultado de importar el CSV:\n\n';
                    if (respuesta.noAgregados.length > 0) {
                        respuesta.noAgregados.forEach(function(materiaNoAgregada) {
                            mensaje += 'La materia ' + materiaNoAgregada.nombre + ' cuyo código es ' + materiaNoAgregada.codigo + ' no se pudo guardar. Motivo: ' + materiaNoAgregada.error + '\n';
                        });
                        mensaje += '\nEl resto de las materias fueron agregadas correctamente.\n';
                    } else {
                        mensaje += '\nTodas las materias fueron agregadas correctamente.\n';
                    }
                    listadoMateriaComponent.mostrarLoading = false;
                    alert(mensaje);
                }, (error: Error) => {
                    console.log(error);
                });
        }

        myReader.readAsText(file, 'ISO-8859-1');
    }
}