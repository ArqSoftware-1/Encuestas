import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { NgSemanticModule } from "ng-semantic";
import { CommonModule } from "@angular/common";

import { RespuestaEncuestaComponent } from "../../components/respuestaEncuesta/respuestaEncuesta.component";
import { routing } from "../../routes/respuestaEncuesta/respuestaEncuesta.routing";
import { SharedModule } from "../shared/shared.module";
import { MateriasComponent } from '../../components/respuestaEncuesta/materias.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        routing,
        SharedModule.forRoot(),
        NgSemanticModule
    ],
    declarations: [
        RespuestaEncuestaComponent, MateriasComponent
    ],
    bootstrap: [
        RespuestaEncuestaComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class RespuestaEncuestaModule { }