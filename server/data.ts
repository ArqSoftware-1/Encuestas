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


// Opciones
var opcion1 = new ModeloOpcion({
    descripcion: "Voy a cursar en c1",
    limite: 2,
    tipo: NombresOpcionDefecto.tipos.comision
});
var opcion2 = new ModeloOpcion({
    descripcion: "Voy a cursar en c2",
    limite: 1,
    tipo: NombresOpcionDefecto.tipos.comision
});
var opcion3 = new ModeloOpcion({
    descripcion: "Voy a cursar en c3",
    limite: 3,
    tipo: NombresOpcionDefecto.tipos.comision
});
var opcion4 = new ModeloOpcion({
    descripcion: NombresOpcionDefecto.descripciones.ya_curse,
    tipo: NombresOpcionDefecto.tipos.ya_curse
});
var opcion5 = new ModeloOpcion({
    descripcion: NombresOpcionDefecto.descripciones.me_gustaria_pero_no_puedo,
    tipo: NombresOpcionDefecto.tipos.no_voy_a_cursar
});
var opcion6 = new ModeloOpcion({
    descripcion: NombresOpcionDefecto.descripciones.no_voy_a_cursar,
    tipo: NombresOpcionDefecto.tipos.no_voy_a_cursar
});
var opcion7 = new ModeloOpcion({
    descripcion: "Voy a cursar en c4",
    limite: 3,
    tipo: NombresOpcionDefecto.tipos.comision
});
var opcion8 = new ModeloOpcion({
    descripcion: "Voy a cursar en c5",
    limite: 3,
    tipo: NombresOpcionDefecto.tipos.comision
});

opcion1.save();
opcion2.save();
opcion3.save();
opcion7.save();
opcion8.save();
opcion4.save();
opcion5.save();
opcion6.save();

// Materias
var materia1 = new ModeloMateria({
    opciones: [opcion1, opcion2, opcion4, opcion5, opcion6],
    nombre: "Introducción a la programación",
    codigo: "Intr",
    idOpcionPorDefecto: opcion4._id
});
var materia2 = new ModeloMateria({
    opciones: [opcion1, opcion4, opcion5, opcion6],
    nombre: "Organización de las computadores",
    codigo: "Orga",
    idOpcionPorDefecto: opcion4._id
});
var materia3 = new ModeloMateria({
    opciones: [opcion1, opcion4, opcion5, opcion6],
    nombre: "Matemática 1",
    codigo: "Mate1",
    idOpcionPorDefecto: opcion4._id
});
var materia4 = new ModeloMateria({
    opciones: [opcion1, opcion3, opcion4, opcion5, opcion6],
    nombre: "Programación funcional",
    codigo: "pf",
    idOpcionPorDefecto: opcion4._id
});

materia1.save();
materia2.save();
materia3.save();
materia4.save();

var materiasParaEncuesta = [materia1, materia2, materia3, materia4];

for(var i = 0; i < 50; i++){
    var materia = new ModeloMateria({
        opciones: [opcion1, opcion3, opcion4, opcion5, opcion6],
        nombre: "Materia " + i,
        codigo: "Mat" + i,
        idOpcionPorDefecto: opcion4._id
    });

    materia.save();
    materiasParaEncuesta.push(materia);
}

// Encuestas
var encuesta = new ModeloEncuesta({
    materias: materiasParaEncuesta,
    anho: 2016,
    semestre: 2,
    carrera: 'Licenciatura en informática',
    fechaLimite: new Date(2017, 11, 31),
    estaActiva: true
});
encuesta.save();

var encuesta1 = new ModeloEncuesta({
    materias: [materia1, materia2, materia3],
    anho: 2017,
    semestre: 1,
    carrera: 'Licenciatura en informática',
    fechaLimite: new Date(2017, 6, 18),
    estaActiva: false
});
encuesta1.save();

// Respuestas
var respuestaEncuesta = new ModeloRespuestaEncuesta({
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
    emailAlumno: 'alumno@unq.edu.ar'
});
respuestaEncuesta.save();
respuestaEncuesta.token = respuestaEncuesta._id + randomBytes(16).toString("hex");
respuestaEncuesta.save();

var respuestaEncuesta1 = new ModeloRespuestaEncuesta({
    respuestasMateria: [],
    encuesta: encuesta,
    nombreYApellidoAlumno: 'Alumno 1',
    DNIAlumno: '87654321',
    emailAlumno: 'alumno1@unq.edu.ar',
    completa: false
});
respuestaEncuesta1.save();
respuestaEncuesta1.token = respuestaEncuesta1._id + randomBytes(16).toString("hex");
respuestaEncuesta1.save();

var respuestaEncuesta2 = new ModeloRespuestaEncuesta({
    respuestasMateria: [],
    encuesta: encuesta1,
    nombreYApellidoAlumno: 'Alumno 1',
    DNIAlumno: '87654321',
    emailAlumno: 'alumno1@unq.edu.ar',
    completa: false
});
respuestaEncuesta2.save();
respuestaEncuesta2.token = respuestaEncuesta2._id + randomBytes(16).toString("hex");
respuestaEncuesta2.save();

var respuestaEncuesta3 = new ModeloRespuestaEncuesta({
    respuestasMateria: [new ModeloRespuestaMateria({
            materia: materia1,
            opcion: opcion5
        }),
        new ModeloRespuestaMateria({
            materia: materia2,
            opcion: opcion5
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
    nombreYApellidoAlumno: 'Alumno 2',
    DNIAlumno: '43218765',
    emailAlumno: 'alumno2@unq.edu.ar'
});
respuestaEncuesta3.save();
respuestaEncuesta3.token = respuestaEncuesta3._id + randomBytes(16).toString("hex");
respuestaEncuesta3.save();

for(var i = 3; i < 14; i++){
    var respuestaEncuesta = new ModeloRespuestaEncuesta({
        respuestasMateria: [],
        encuesta: encuesta,
        nombreYApellidoAlumno: 'Alumno ' + i,
        DNIAlumno: '' + (i + 20000000),
        emailAlumno: 'alumno' + i + '@unq.edu.ar',
        completa: false
    });
    respuestaEncuesta.save();
    respuestaEncuesta.token = respuestaEncuesta1._id + randomBytes(16).toString("hex");
    respuestaEncuesta.save();
}

// Director
const salt = randomBytes(128).toString("base64");

pbkdf2('1234', salt, 10000, length, digest, (err: Error, hash: Buffer) => {
    var director = new ModeloDirector({
        email: 'director@unq.edu.ar',
        password: hash.toString("hex"),
        salt: salt
    });
    director.save();
});