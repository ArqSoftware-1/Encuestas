import { Component,Directive,ElementRef,Input,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DirectorService } from "../../service/director/director.service";

declare var $:JQueryStatic;

@Component({
  selector: 'director-crear',
  templateUrl: 'client/components/director/director.component.html',
  providers: [DirectorService]
})

export class DirectorComponent {
	email = "";
	pass = "";
	directorService;
	directores = [];

	constructor(directorService:DirectorService){
		this.directorService = directorService;
		$("#directorCrear").addClass("active");
		$("#encuestaListado").removeClass("active");
		directorService.obtenerDirectores().subscribe(
			(directores) => {
				this.directores = directores;
			}, (error: Error) => {
                console.log(error);
                this.chequearSesion()
            });
	}

	crearDirector(){
		this.directorService.obtenerDirectorPorEmail(this.email).subscribe( 
			(director) => {
				if(director == null)
					this.crear();
				else
					alert("Ya existe un director con Email ingresado.");

			});
	}

	crear(){
		if(this.email.length == 0 || this.pass.length == 0){
			alert("Todos los campos son obligatorios.");
		}else{
			this.directorService.crearDirector(this.email, this.pass).subscribe(
            (director) => {
                alert("El director fue creado con exito.");
                this.directores.push(director);
            }, (error: Error) => {
            	alert("No se pudo crear el director.");
                console.log(error);
            });
		}
	}

	eliminarDirector(id){
		this.directorService.eliminarDirector(id).subscribe(
            (director) => {
            	this.directores = this.directores.filter( director => director._id != id);
                alert("El director fue eliminado con exito.");
            }, (error: Error) => {
            	alert("No se pudo crear el director.");
                console.log(error);
            });
	}

    chequearSesion(){
        localStorage.removeItem("id_token");
        location.href = '/#/login';
        location.reload();
    }
}