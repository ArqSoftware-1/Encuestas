import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAuth } from "angular2-jwt";
import { HttpModule } from "@angular/http";
import { NgSemanticModule } from "ng-semantic";
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { routing } from "./routes";
import { RespuestaEncuestaModule } from "./modules/respuestaEncuesta/respuestaEncuesta.module";
import { LoginModule } from "./modules/autenticacion/login.module";
import { EncuestaModule } from "./modules/encuesta/encuesta.module";
import { DirectorModule } from "./modules/director/director.module";
import { ListadoMateriaModule } from "./modules/listadoMateria/listadoMateria.module";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        NgSemanticModule,      
        RespuestaEncuestaModule,
        LoginModule,
        routing,
        EncuestaModule,
        DirectorModule,
        FormsModule,
        ListadoMateriaModule
    ],
    providers: [
        provideAuth({
            globalHeaders: [{"Content-type": "application/json"}],
            newJwtError: true,
            noTokenScheme: true
        })
    ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule {}
