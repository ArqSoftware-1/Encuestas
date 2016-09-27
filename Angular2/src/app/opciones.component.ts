import { Component } from '@angular/core';

@Component({
  selector: 'mis-opciones',
  template: `<select>
			  <option *ngFor="let opcion of opciones">
			    {{opcion}}
			  </option>
			</select>`
})

export class OpcionesListaComponent {
  
  opciones = [
     'Ya cruse',
     'Voy a cursar',
     'Me gustaria pero no puedo'
  ];
}