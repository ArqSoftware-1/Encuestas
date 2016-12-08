import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { NgSemanticModule } from "ng-semantic";
import { CommonModule } from "@angular/common";
import { FormsModule }   from '@angular/forms';

import { ListadoMateriaComponent } from "../../components/listadoMateria/listadoMateria.component";
import { routing } from "../../routes/listadoMateria/listadoMateria.routing";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        routing,
        SharedModule.forRoot(),
        NgSemanticModule,
        FormsModule
    ],
    declarations: [
        ListadoMateriaComponent
    ],
    bootstrap: [
        ListadoMateriaComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ListadoMateriaModule { }