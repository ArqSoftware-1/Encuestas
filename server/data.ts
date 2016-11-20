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
    descripcion: "Voy a cursar en c3",
    limite: 2,
    tipo: NombresOpcionDefecto.tipos.comision
});

opcion1.save();
opcion2.save();
opcion3.save();
opcion4.save();
opcion5.save();
opcion6.save();


// Materias
var materia1 = new ModeloMateria({
    opciones: [opcion1, opcion2, opcion4, opcion5, opcion6],
    nombre: "Introducción a la programación",
    idOpcionPorDefecto: opcion4._id
});
var materia2 = new ModeloMateria({
    opciones: [opcion1, opcion4, opcion5, opcion6],
    nombre: "Organización de las computadores",
    idOpcionPorDefecto: opcion4._id
});
var materia3 = new ModeloMateria({
    opciones: [opcion1, opcion4, opcion5, opcion6],
    nombre: "Matemática 1",
    idOpcionPorDefecto: opcion4._id
});
var materia4 = new ModeloMateria({
    opciones: [opcion1, opcion7, opcion4, opcion5, opcion6],
    nombre: "Programación funcional",
    idOpcionPorDefecto: opcion4._id
});

materia1.save();
materia2.save();
materia3.save();
materia4.save();

// Encuestas
var encuesta = new ModeloEncuesta({
    materias: [materia1, materia2, materia3, materia4],
    anho: 2016,
    semestre: 2,
    carrera: 'Licenciatura en informática',
    fechaLimite: new Date(2016, 11, 31)
});
encuesta.save();

var encuesta1 = new ModeloEncuesta({
    materias: [materia1, materia2, materia3],
    anho: 2017,
    semestre: 1,
    carrera: 'Licenciatura en informática',
    fechaLimite: new Date(2017, 4, 18)
});
encuesta1.save();

// Respuestas
for(var i = 1; i < 100; i++){
    var respuestaEncuesta1 = new ModeloRespuestaEncuesta({
    respuestasMateria: [],
    encuesta: encuesta,
    nombreYApellidoAlumno: 'Alumno ' + i,
    DNIAlumno: '' + i,
    emailAlumno: 'alumno' + i + '@unq.edu.ar',
    completa: false
});
respuestaEncuesta1.save();
respuestaEncuesta1.token = respuestaEncuesta1._id + randomBytes(16).toString("hex");
respuestaEncuesta1.save();
}
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
/*
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
*/
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