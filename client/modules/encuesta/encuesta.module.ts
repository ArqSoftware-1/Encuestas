import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { NgSemanticModule } from "ng-semantic";
import { CommonModule } from "@angular/common";

import { EstadisticasEncuestaComponent } from "../../components/encuesta/estadisticasEncuesta.component";
import { ListadoEncuestaComponent } from "../../components/encuesta/listadoEncuesta.component";
import { MateriasPublicadasEncuestaComponent } from "../../components/encuesta/materiasPublicadasEncuesta.component";
import { routing } from "../../routes/encuesta/encuesta.routing";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        routing,
        SharedModule.forRoot(),
        NgSemanticModule
    ],
    declarations: [
        ListadoEncuestaComponent,
        EstadisticasEncuestaComponent,
        MateriasPublicadasEncuestaComponent
    ],
    bootstrap: [
        ListadoEncuestaComponent,
        EstadisticasEncuestaComponent,
        MateriasPublicadasEncuestaComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class EncuestaModule { }