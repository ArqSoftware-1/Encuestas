//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = "http://localhost:3000";
let should = chai.should();

let RespuestaEncuesta = require("../server/models/RespuestaEncuesta");
let token;
let respuestaEncuesta;
let encuesta;

chai.use(chaiHttp);

describe('RespuestasEncuesta sin autenticacion', () => {
    it('Deberia responder con error 403 si se solicitan todas las respuestas de encuesta', (done) => {
        chai.request(server)
            .get('/api/respuestas/encuesta/listado')
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });

    it('Deberia responder con error 403 si se solicita crear una nueva respuesta de encuesta', (done) => {
        chai.request(server)
            .post('/api/respuestas/encuesta/guardar')
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });
});


describe('RespuestasEncuesta con autenticacion', () => {
    before(function(done){
        let credenciales = {
            email: "director@unq.edu.ar",
            password: "1234"
        }
        chai.request(server)
            .post('/login')
            .send(credenciales)
            .end((err, res) => {
                token = JSON.parse(res.text).jwt;

                chai.request(server)
                    .get('/api/respuestas/encuesta/buscarPorDNI')
                    .send({dni: '12345678'})
                    .set('Authorization', token)
                    .end((err, res) => {
                        respuestaEncuesta = JSON.parse(res.text);
                        done();
                    });
        });

     });

    it('Deberia devolver la respuesta de encuesta correcta cuando se la busca por el token', (done) => {
        chai.request(server)
            .get('/api/publica/respuestas/encuesta/detalle')
            .send({token: respuestaEncuesta.token})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('DNIAlumno').eql(respuestaEncuesta.DNIAlumno);
                res.body.should.have.property('encuesta').eql(respuestaEncuesta.encuesta);
                res.body.should.have.property('nombreYApellidoAlumno').eql(respuestaEncuesta.nombreYApellidoAlumno);
                res.body.should.have.property('emailAlumno').eql(respuestaEncuesta.emailAlumno);
                res.body.should.have.property('token').eql(respuestaEncuesta.token);
                res.body.should.have.property('completa').eql(respuestaEncuesta.completa);
                done();
            });
    });

    it('Deberia modificarse la respuesta de encuesta al actualizarla', (done) => {
        // Cambiando la opcion seleccionada
        nuevaOpcion = respuestaEncuesta.respuestasMateria[0].materia.opciones[0];
        respuestaEncuesta.respuestasMateria[0].opcion = nuevaOpcion;
        chai.request(server)
            .post('/api/publica/respuestas/encuesta/actualizar-respuestas?id=' + respuestaEncuesta._id)
            .send({respuestas: respuestaEncuesta.respuestasMateria})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                respuestaEncuestaModificada = JSON.parse(res.text);
                should.equal(respuestaEncuestaModificada.respuestasMateria[0].opcion.description, nuevaOpcion.description);
                done();
            });
    });

});
