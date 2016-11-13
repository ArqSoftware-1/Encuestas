import { Component } from '@angular/core';
import { EncuestaService } from "../../service/encuesta/encuesta.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'estadisticas-encuesta',
  templateUrl: 'client/components/encuesta/estadisticasEncuesta.component.html',
  providers: [EncuestaService]
})

export class EstadisticasEncuestaComponent {
    titulo;
    estadisticas;
    materias;
    completaron; 
    noCompletaron;

    constructor(encuestaService:EncuestaService, route: ActivatedRoute){
    var id = route.snapshot.params['id'];
    encuestaService.obtenerEstadisticas(id).subscribe(
                (estadistica) => {
                    console.log(estadistica); 
                    this.estadisticas = estadistica.estadisticas;
                    this.materias = estadistica.encuesta.materias;
                    this.titulo = 'Estadísticas de inscripción ' + estadistica.encuesta.anho + ' del semestre ' + estadistica.encuesta.semestre + ' - ' + estadistica.encuesta.carrera;     
                },
                (error: Error) => {
                    console.log(error);
                });
    encuestaService.completaron(id).subscribe(
                (res) => {
                    console.log(res); 
                    this.completaron = res.completaron;
                    this.noCompletaron = res.total - res.completaron;
                },
                (error: Error) => {
                    console.log(error);
                });
	}

  cantidadPara(materia, opcion){
    var estadistica = this.estadisticas.filter(
                              (estadistica) => estadistica._id.materia == materia.nombre 
                                                && estadistica._id.opcion == opcion.descripcion)[0];
    if(estadistica){
        return estadistica.count;
    }
    return 0;
  }

}