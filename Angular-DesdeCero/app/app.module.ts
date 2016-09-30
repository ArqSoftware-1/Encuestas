import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { AppComponent }   from './app.component';
import { MateriasComponent } from './materias.component';

@NgModule({
  imports:      [ BrowserModule, MaterialModule.forRoot() ],
  declarations: [ AppComponent, MateriasComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }