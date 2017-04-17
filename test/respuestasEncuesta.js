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
            .get('/api/encuestas/listado')
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

/*
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

                RespuestaEncuesta.ModeloRespuestaEncuesta.findOne({
                    dni: '12345678'
                }).exec()
                .then(respuestaEncuestaRes => {
                    respuestaEncuesta = respuestaEncuestaRes;
                    done();
                })
        });

     });

    it('Deberia devolver la respuesta de encuesta correcta cuando se la busca por el id', (done) => {
        chai.request(server)
            .post('/api/publica/respuestas/encuesta/detalle')
            .send({token: respuestaEncuesta.token})
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
               // res.body.should.have.property('anho').eql(encuesta.anho);
                done();
            });
    });

});
*/