import { Component, Directive } from '@angular/core';

@Component({
  selector: 'materias',
  templateUrl: './materias.component.html'
 
})
export class MateriasComponent {
	materias= [ {nombre:'Introducción a la prog' }, 
				{nombre: 'Matematica 1'}, 
				{nombre:'Orga' }];
}
