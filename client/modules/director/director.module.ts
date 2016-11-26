import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { DirectorComponent } from "../../components/director/director.component";
import { routing } from "../../routes/director/director.routing";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        routing,
        FormsModule,
        SharedModule.forRoot(),
    ],
    declarations: [
        DirectorComponent
    ],
    bootstrap: [
        DirectorComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class DirectorModule { }