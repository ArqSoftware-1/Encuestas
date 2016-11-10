// Para agregado de materias y sus opciones
import { ModeloOpcion, EsquemaOpcion} from "./models/Opcion";
import { ModeloMateria, EsquemaMateria} from "./models/Materia";
import { ModeloEncuesta, EsquemaEncuesta} from "./models/Encuesta";
import { ModeloRespuestaEncuesta, EsquemaRespuestaEncuesta} from "./models/RespuestaEncuesta";
import { ModeloDirector, EsquemaDirector} from "./models/Director";
import { Document, Schema, model } from 'mongoose'
import { randomBytes, pbkdf2 } from "crypto";
import { sign } from "jsonwebtoken";
import { secret, length, digest } from "./config";


// Opciones
var opcion1 = new ModeloOpcion({descripcion: "Voy a cursar en c1"});
var opcion2 = new ModeloOpcion({descripcion: "Voy a cursar en c2"});
var opcion3 = new ModeloOpcion({descripcion: "Voy a cursar en c3"});
var opcion4 = new ModeloOpcion({descripcion: "Ya cursé"});
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
var encuesta = new ModeloEncuesta({materias: [materia1, materia2, materia3, materia4], anho: 2016, semestre: 2, carrera: 'Licenciatura en informática'});
encuesta.save();

// Encuesta
var respuestaEncuesta = new ModeloRespuestaEncuesta({respuestasMateria: [], encuesta: encuesta, DNIAlumno: '12345678', emailAlumno: 'alumno@unq.edu.ar'});
respuestaEncuesta.save();

// Director
const salt = randomBytes(128).toString("base64");

pbkdf2('1234', salt, 10000, length, digest, (err: Error, hash: Buffer) => {
	var director = new ModeloDirector({email: 'director@unq.edu.ar', password: hash.toString("hex"), salt: salt});
	director.save();
});