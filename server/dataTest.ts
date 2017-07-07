import mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
// Para agregado de materias y sus opciones
import { ModeloOpcion, EsquemaOpcion, NombresOpcionDefecto} from "./models/Opcion";
import { ModeloMateria, EsquemaMateria} from "./models/Materia";
import { ModeloEncuesta, EsquemaEncuesta} from "./models/Encuesta";
import { ModeloRespuestaEncuesta, EsquemaRespuestaEncuesta} from "./models/RespuestaEncuesta";
import { ModeloRespuestaMateria } from "./models/RespuestaMateria";
import { ModeloDirector, EsquemaDirector} from "./models/Director";
import { Document, Schema, model } from 'mongoose'
import { randomBytes, pbkdf2 } from "crypto";
import { sign } from "jsonwebtoken";
import { secret, length, digest } from "./config";


var objectsToSave = [];


// Opciones
var opcion1 = new ModeloOpcion({
    descripcion: "Voy a cursar en c1",
    limite: 2,
    tipo: NombresOpcionDefecto.tipos.comision,
    _id: crearId(1)
});
var opcion2 = new ModeloOpcion({
    descripcion: "Voy a cursar en c2",
    limite: 1,
    tipo: NombresOpcionDefecto.tipos.comision,
    _id: crearId(2)
});
var opcion3 = new ModeloOpcion({
    descripcion: "Voy a cursar en c3",
    limite: 3,
    tipo: NombresOpcionDefecto.tipos.comision,
    _id: crearId(3)
});
var opcion4 = new ModeloOpcion({
    descripcion: NombresOpcionDefecto.descripciones.ya_curse,
    tipo: NombresOpcionDefecto.tipos.ya_curse,
    _id: crearId(4)
});
var opcion5 = new ModeloOpcion({
    descripcion: NombresOpcionDefecto.descripciones.me_gustaria_pero_no_puedo,
    tipo: NombresOpcionDefecto.tipos.no_voy_a_cursar,
    _id: crearId(5)
});
var opcion6 = new ModeloOpcion({
    descripcion: NombresOpcionDefecto.descripciones.no_voy_a_cursar,
    tipo: NombresOpcionDefecto.tipos.no_voy_a_cursar,
    _id: crearId(6)
});
var opcion7 = new ModeloOpcion({
    descripcion: "Voy a cursar en c4",
    limite: 3,
    tipo: NombresOpcionDefecto.tipos.comision,
    _id: crearId(7)
});
var opcion8 = new ModeloOpcion({
    descripcion: "Voy a cursar en c5",
    limite: 3,
    tipo: NombresOpcionDefecto.tipos.comision,
    _id: crearId(8)
});


objectsToSave.push(opcion1);
objectsToSave.push(opcion2);
objectsToSave.push(opcion3);
objectsToSave.push(opcion7);
objectsToSave.push(opcion8);
objectsToSave.push(opcion4);
objectsToSave.push(opcion5);
objectsToSave.push(opcion6);

// Materias
var materia1 = new ModeloMateria({
    opciones: [opcion1, opcion2, opcion4, opcion5, opcion6],
    nombre: "Introducción a la programación",
    codigo: "Intr",
    idOpcionPorDefecto: opcion4._id,
    _id: crearId(100)
});
var materia2 = new ModeloMateria({
    opciones: [opcion1, opcion4, opcion5, opcion6],
    nombre: "Organización de las computadores",
    codigo: "Orga",
    idOpcionPorDefecto: opcion4._id,
    _id: crearId(101)
});
var materia3 = new ModeloMateria({
    opciones: [opcion1, opcion4, opcion5, opcion6],
    nombre: "Matemática 1",
    codigo: "Mate1",
    idOpcionPorDefecto: opcion4._id,
    _id: crearId(102)
});
var materia4 = new ModeloMateria({
    opciones: [opcion1, opcion3, opcion4, opcion5, opcion6],
    nombre: "Programación funcional",
    codigo: "pf",
    idOpcionPorDefecto: opcion4._id,
    _id: crearId(103)
});

objectsToSave.push(materia1);
objectsToSave.push(materia2);
objectsToSave.push(materia3);
objectsToSave.push(materia4);

var materiasParaEncuesta = [materia1, materia2, materia3, materia4];

for(var i = 0; i < 50; i++){
    var materia = new ModeloMateria({
        opciones: [opcion1, opcion3, opcion4, opcion5, opcion6],
        nombre: "Materia " + i,
        codigo: "Mat" + i,
        idOpcionPorDefecto: opcion4._id,
        _id: crearId(i)
    });
    objectsToSave.push(materia);
    materiasParaEncuesta.push(materia);
}

// Encuestas
var encuesta = new ModeloEncuesta({
    materias: materiasParaEncuesta,
    anho: 2016,
    semestre: 2,
    carrera: 'Licenciatura en informática',
    fechaLimite: new Date(2017, 11, 31),
    estaActiva: true,
    _id: crearId(1)
});

objectsToSave.push(encuesta);

var encuesta1 = new ModeloEncuesta({
    materias: [materia1, materia2, materia3],
    anho: 2017,
    semestre: 1,
    carrera: 'Licenciatura en informática',
    fechaLimite: new Date(2017, 6, 18),
    estaActiva: false,
    _id: crearId(2)
});1

objectsToSave.push(encuesta1);

// Respuestas
var respuestaEncuesta1 = new ModeloRespuestaEncuesta({
    respuestasMateria: [new ModeloRespuestaMateria({
            materia: materia1,
            opcion: opcion2
        }),
        new ModeloRespuestaMateria({
            materia: materia2,
            opcion: opcion6
        }),
        new ModeloRespuestaMateria({
            materia: materia3,
            opcion: opcion6
        }),
        new ModeloRespuestaMateria({
            materia: materia4,
            opcion: opcion6
        })
    ],
    completa: true,
    encuesta: encuesta,
    nombreYApellidoAlumno: 'Alumno',
    DNIAlumno: '12345678',
    emailAlumno: 'alumno@unq.edu.ar',
    _id: crearId(100000)
});
respuestaEncuesta1.save();
respuestaEncuesta1.token = respuestaEncuesta1._id + randomBytes(16).toString("hex");
respuestaEncuesta1.save();

for(var i = 0; i < 100; i++){
    var respuestaEncuesta = new ModeloRespuestaEncuesta({
        respuestasMateria: [],
        encuesta: encuesta,
        nombreYApellidoAlumno: 'Alumno ' + i,
        DNIAlumno: '' + (i + 20000000),
        emailAlumno: 'alumno' + i + '@unq.edu.ar',
        completa: false,
        _id: crearId(i),
        token: crearId(i)
    });
    objectsToSave.push(respuestaEncuesta);
}

// Director
const salt = randomBytes(128).toString("base64");

pbkdf2('1234', salt, 10000, length, digest, (err: Error, hash: Buffer) => {
    var director = new ModeloDirector({
        email: 'director@unq.edu.ar',
        password: hash.toString("hex"),
        salt: salt,
        _id: crearId(1)
    });
    objectsToSave.push(director);
});

console.log("***********************INGRESANDO OBJETOS DE PRUEBAS EN BASE DE DATOS***********************");
console.log("***********************ESPERE UNOS SEGUNDOS POR FAVOR***********************");
saveObjects(0);

/* Funciones auziliares */

function saveObjects(index){
    if(index == objectsToSave.length){
        console.log("***********************LOS OBJETOS FUERON INGRESADOS CORRECTAMENTE***********************");
        return;
    }else{
        objectsToSave[index].save(function(e){
            saveObjects(index + 1)
        });
    }
}

function crearId(number){
    var stringNumber = number + '';
    var length = stringNumber.length;
    for (var i = 0; i < 24 - length; i++) {
        stringNumber = '0' + stringNumber;
    }
    return ObjectId(stringNumber);
}