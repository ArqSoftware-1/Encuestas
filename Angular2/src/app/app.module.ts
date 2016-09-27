import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MateriasComponent } from './materias.component';
import { OpcionesListaComponent } from './opciones.component';

@NgModule({
  declarations: [
    AppComponent,
    MateriasComponent,
    OpcionesListaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
