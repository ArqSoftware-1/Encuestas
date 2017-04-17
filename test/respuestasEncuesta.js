//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = "http://localhost:3000";
let should = chai.should();
let token;

chai.use(chaiHttp);

describe('RespuestasEncuesta sin autenticacion', () => {
    it('Deberia responder con error 403 si se solicitan todas las respuestas de encuesta', (done) => {
        chai.request(server)
            .get('/api/encuestas/listado')
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });

    it('Deberia responder con error 403 si se solicita crear una nueva respuesta de encuesta', (done) => {
        encuesta = {anho: 2018,
                    semestre: 1,
                    carrera: 'Licenciatura en informática',
                    fechaLimite: '2017/09/23'};
        chai.request(server)
            .post('/api/respuestas/encuesta/guardar')
            .send({encuesta: encuesta})
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });
});

describe('RespuestasEncuesta con autenticacion', () => {
    /*before(function(done){
        let credenciales = {
            email: "director@unq.edu.ar",
            password: "1234"
        }
        chai.request(server)
            .post('/login')
            .send(credenciales)
            .end((err, res) => {
                var result = JSON.parse(res.text);
                token = result.jwt;
                done();
        });

     });*/

});