import { Component } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { MateriaService } from "../../service/listadoMateria/materia.service";

declare var $:JQueryStatic;

@Component({
    selector: 'materia',
    templateUrl: 'client/components/listadoMateria/listadoMateria.component.html',
    providers: [MateriaService]
})

export class ListadoMateriaComponent {
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

    constructor(materiaService: MateriaService) {

    	materiaService.obtenerMaterias().subscribe(
            (materias) => {
 				this.materias = materias;
            }, (error: Error) => {
                console.log(error);
            });

        $("#directorCrear").removeClass("active");
        $("#encuestaListado").removeClass("active");
        $("#listadoMateria").addClass("active");
    }
    
}