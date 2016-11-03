import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAuth } from "angular2-jwt";
import { HttpModule } from "@angular/http";
import { NgSemanticModule } from "ng-semantic";

import { AppComponent }  from './app.component';
import { routing } from "./routes";
import { TituloComponent } from "./components/shared/titulo.component";
import { HomeModule } from "./modules/home/home.module";
import { RespuestaEncuestaModule } from "./modules/respuestaEncuesta/respuestaEncuesta.module";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        NgSemanticModule,      
        HomeModule,
        RespuestaEncuestaModule,
        routing
    ],
    providers: [
        provideAuth({
            globalHeaders: [{"Content-type": "application/json"}],
            newJwtError: true,
            noTokenScheme: true
        })
    ],
    declarations: [ TituloComponent, AppComponent ],
    bootstrap:    [ AppComponent ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule {}
