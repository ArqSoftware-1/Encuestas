import { Component,Directive,ElementRef,Input,OnInit } from '@angular/core';
import { EncuestaService } from "../../service/encuesta/encuesta.service";
import { OpcionService } from "../../service/opcion/opcion.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var google:any;
declare var googleLoaded:any;

@Component({
  selector: 'estadisticas-encuesta',
  templateUrl: 'client/components/encuesta/estadisticasEncuesta.component.html',
  providers: [EncuestaService, OpcionService],
})

export class EstadisticasEncuestaComponent implements OnInit {
    titulo;
    estadisticas;
    materias;
    completaron;
    noIniciarion;
    completaronAlgunaOpcion;
    total;
    cantidad;
    opciones;

    public pie_ChartData: (string | number)[][] = [
        ['Condición', 'Cantidad']
    ];

    constructor(encuestaService: EncuestaService, opcionService: OpcionService, route: ActivatedRoute) {
        var id = route.snapshot.params['id'];
        encuestaService.obtenerEstadisticas(id).subscribe(
            (estadistica) => {
                console.log(estadistica);
                this.estadisticas = estadistica.estadisticas;
                this.materias = estadistica.encuesta.materias;
                this.titulo = 'Estadísticas de inscripción ' + estadistica.encuesta.anho + ' del semestre ' + estadistica.encuesta.semestre + ' - ' + estadistica.encuesta.carrera;
            }, (error: Error) => {
                console.log(error);
            });
        encuestaService.completaron(id).subscribe(
            (res) => {
                console.log(res);
                this.completaron = res.completaron;
                this.noIniciarion = res.total - res.completaronAlgunaOpcion;
                this.completaronAlgunaOpcion = res.completaronAlgunaOpcion;
                this.total = res.total;
                this.pie_ChartData.push(['Completaron y cursan por lo menos una', res.completaron - res.completaronYNoCursanNada]);
                this.pie_ChartData.push(['No iniciaron la encuesta', res.total - res.completaron]);
                this.pie_ChartData.push(['Completaron y no cursan nada', res.completaronYNoCursanNada]);
                //this.pie_ChartData.push(['Completaron alguna opción', parseInt(res.completaronAlgunaOpcion)]);
            }, (error: Error) => {
                console.log(error);
            });
        opcionService.obtenerTodasLasOpciones().subscribe(
            (opciones) => {
                this.opciones = opciones;
            }, (error: Error) => {
                console.log(error);
            });       
    }

    cantidadPara(materia, opcion) {
        var estadistica = this.estadisticas.filter(
            (estadistica) => estadistica._id.materia == materia.nombre && estadistica._id.opcion == opcion.descripcion)[0];
        if (estadistica) {
            if (opcion.limite <= estadistica.count) {
                materia.tieneOpcionConLimiteSuperado = true;
            }
            return estadistica.count;
        }
        return 0;
    }

    mostrarCantidadConLimite(materia, opcion){
        //{{cantidadPara(materia, opcion)}} {{opcion.limite > 0 ? '/ ' + opcion.limite : ''}}
        var opc = materia.opciones.filter(o => o._id == opcion._id);

        if(opc.length > 0)
            return this.cantidadPara(materia, opcion) + (opcion.limite > 0 ? '/ ' + opcion.limite : '');
        else
            return '-';
    }

    ngOnInit() {
        google.charts.load('current', {
            'packages': ['corechart', 'gauge']
        });
        setTimeout(() => this.drawGraph(this.pie_ChartData), 1000);
    }

    drawGraph(pie_ChartData) {
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            var data = google.visualization.arrayToDataTable(pie_ChartData);

            var options = {
                title: 'Gráfico estadístico sobre el total de alumnos asignados',
                is3D: true
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechart'));

            chart.draw(data, options);
        }

    }

}