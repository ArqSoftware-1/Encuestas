import { Component } from "@angular/core";
import { RespuestaEncuestaService } from "../../service/respuestaEncuesta/respuestaEncuesta.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'encuesta',
    templateUrl: 'client/components/respuestaEncuesta/respuestaEncuesta.component.html',
    providers: [RespuestaEncuestaService]
})
export class RespuestaEncuestaComponent {
    error: string;
    response: {};
    titulo: String;
    estaActivaEncuesta;

    constructor(respuestaEncuestaService: RespuestaEncuestaService, route: ActivatedRoute) {
        var token = route.snapshot.params['token'];
        if (!token) {
            this.titulo = 'No exite la encuesta seleccionada.';
            return;
        }

        respuestaEncuestaService.obtenerRespuestaEncuesta(token).subscribe(
            (respuestaEncuesta) => {
                if (respuestaEncuesta) {
                    this.estaActivaEncuesta = respuestaEncuesta.encuesta.estaActiva;
                    if(this.estaActivaEncuesta)
                        this.titulo = 'Encuesta de inscripción ' + respuestaEncuesta.encuesta.anho + ' del semestre ' + respuestaEncuesta.encuesta.semestre + ' - ' + respuestaEncuesta.encuesta.carrera;
                    else
                        this.titulo = 'La encuesta ha finalizado.'
                } else {
                    this.titulo = 'No exite la encuesta seleccionada.';
                }

            }, (error: Error) => {
                this.titulo = 'No exite la encuesta seleccionada.';
                console.log(error);
            });
    }

}
