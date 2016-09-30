export class MateriasService{

	obtenerMaterias(){
		return [ {Nombre:'Introducción a la prog', OpcionElegida: '' }, 
				{Nombre: 'Matematica 1', OpcionElegida: ''}, 
				{Nombre:'Orga', OpcionElegida: '' }];
	}

	obtenerOpciones(){
		return [ {Id: 1, Nombre: 'Ya cruse' }, { Id: 2, Nombre: 'Voy a cursar' }, { Id: 3, Nombre: 'Me gustaria pero no puedo' } ];
	}
}