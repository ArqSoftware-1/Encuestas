import { Component, OnInit, ValueProvider, ElementRef, ViewChild } from '@angular/core';

import { EncuestaService } from "../../service/encuesta/encuesta.service";
import { RespuestaEncuestaService } from "../../service/respuestaEncuesta/respuestaEncuesta.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

const WINDOW_PROVIDER: ValueProvider = {
    provide: Window,
    useValue: window
};

@Component({
  selector: 'asignar-usuario',
  templateUrl: 'client/components/respuestaEncuesta/asignarAlumno.component.html',
  providers: [EncuestaService, RespuestaEncuestaService, WINDOW_PROVIDER],
})

export class AsignarAlumnoComponent {
    encuesta: any = {
        anho: "",
        semestre: "",
    };
    respuestaEncuestaService;
    encuestaService;
    alumno: any = {
        nombreYApellidoAlumno: "",
        DNIAlumno: "",
        emailAlumno: ""
    };
    alumnos = [];
    nombreYApellido = "";
    dni = "";
    idEncuesta;
    cantidadASaltear = 0;
    window: Window;
    @ViewChild('someVar') someVar:ElementRef;

    constructor(encuestaService: EncuestaService, route: ActivatedRoute, respuestaEncuestaService: RespuestaEncuestaService, window: Window) {
        this.idEncuesta = route.snapshot.params['idEncuesta'];
        this.respuestaEncuestaService = respuestaEncuestaService;
        this.window = window;
        encuestaService.obtenerEncuesta(this.idEncuesta).subscribe(
            (encuesta) => {
                this.encuesta = encuesta;
                respuestaEncuestaService.obtenerRespuestasEncuestaPorAnhoYSemestre(encuesta.anho, encuesta.semestre).subscribe(
                    (respuestasEcuesta) => {
                        this.alumnos = respuestasEcuesta;
                    }, (error: Error) => {
                        console.log(error);
                    });
            }, (error: Error) => {
                console.log(error);
            });
    }

    asignarAlumno() {
        if (!this.seLLenaronLosCampoCorrectamente())
            return;

        this.respuestaEncuestaService.asignarAlumnoAEncuesta(this.alumno, this.encuesta).subscribe(
            (respuestaEcuesta) => {
                this.alumnos.push(respuestaEcuesta);
                this.alumno.nombreYApellidoAlumno = "";
                this.alumno.DNIAlumno = "";
                this.alumno.emailAlumno = "";
            }, (error: Error) => {
                console.log(error);
            });
    }

    seLLenaronLosCampoCorrectamente() {
        if (this.alumno.nombreYApellidoAlumno.length == 0 || this.alumno.DNIAlumno.length == 0 || this.alumno.emailAlumno.length == 0) {
            alert("Todos los campos son obligatorios.");
            return false;
        }

        if (!/^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/.test(this.alumno.emailAlumno)) {
            alert("Email inválido.");
            return false;
        }

        var alumnos = this.alumnos.filter(a => a.DNIAlumno == this.alumno.DNIAlumno);

        if (alumnos.length != 0) {
            alert("El DNI ingresado ya existe.");
            return false;
        }

        return true;
    }

    crearUrlPara(alumno) {
        return document.baseURI + '#/respuesta-encuesta/' + alumno.token;
    }

    buscar() {
        this.cantidadASaltear = 0;
        this.respuestaEncuestaService.buscarAlumnoPor(this.nombreYApellido, this.dni, this.idEncuesta, this.cantidadASaltear).subscribe(
            (respuestasEcuesta) => {
                this.alumnos = respuestasEcuesta;
            }, (error: Error) => {
                console.log(error);
            });
    }

    mostrarMas() {
        this.cantidadASaltear = this.cantidadASaltear + 10;
        this.respuestaEncuestaService.buscarAlumnoPor(this.nombreYApellido, this.dni, this.idEncuesta, this.cantidadASaltear).subscribe(
            (respuestasEcuesta) => {
                for (var i = 0; i < respuestasEcuesta.length; i++)
                    this.alumnos.push(respuestasEcuesta[i]);
                setTimeout(() => this.window.scrollTo(0,  this.alumnos.length * 100), 10);
            }, (error: Error) => {
                console.log(error);
            });
    }
}