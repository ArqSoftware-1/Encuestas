import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { NgSemanticModule } from "ng-semantic";
import { CommonModule } from "@angular/common";

import { ListadoEncuestaComponent } from "../../components/encuesta/listadoEncuesta.component";
import { routing } from "../../routes/encuesta/listadoEncuesta.routing";
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
        ListadoEncuestaComponent
    ],
    bootstrap: [
        ListadoEncuestaComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ListadoEncuestaModule { }