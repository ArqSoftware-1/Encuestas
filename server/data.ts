// Para agregado de materias y sus opciones
import { ModeloOpcion, EsquemaOpcion} from "./models/Opcion";
import { ModeloMateria, EsquemaMateria} from "./models/Materia";
import { ModeloEncuesta, EsquemaEncuesta} from "./models/Encuesta";
import { Document, Schema, model } from 'mongoose'


// Opciones
var opcion1 = new ModeloOpcion({descripcion: "Voy a cursar en c1"});
var opcion2 = new ModeloOpcion({descripcion: "Voy a cursar en c2"});
var opcion3 = new ModeloOpcion({descripcion: "Voy a cursar en c3"});
var opcion4 = new ModeloOpcion({descripcion: "Ya Cursé"});
var opcion5 = new ModeloOpcion({descripcion: "Me gustaría pero no puedo"});
var opcion6 = new ModeloOpcion({descripcion: "No voy a cursar"});

opcion1.save();
opcion2.save();
opcion3.save();
opcion4.save();
opcion5.save();
opcion6.save();


// Materias
var materia1 = new ModeloMateria({opciones: [opcion1, opcion2, opcion4, opcion5, opcion6], nombre: "Introducción a la programación"});
var materia2 = new ModeloMateria({opciones: [opcion1, opcion4, opcion5, opcion6], nombre: "Organización de las computadores"});
var materia3 = new ModeloMateria({opciones: [opcion1, opcion4, opcion5, opcion6], nombre: "Matemática 1"});
var materia4 = new ModeloMateria({opciones: [opcion1, opcion3, opcion4, opcion5, opcion6], nombre: "Programación funcional"});

materia1.save();
materia2.save();
materia3.save();
materia4.save();

// Encuesta
var encuesta = new ModeloEncuesta({materias: [materia1, materia2, materia3, materia4], anho: 2016, semestre: 2});
encuesta.save();