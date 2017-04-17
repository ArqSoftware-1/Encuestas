//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = "http://localhost:3000";
let should = chai.should();

chai.use(chaiHttp);

describe('Login', () => {
    it('No deberia loguearse con un email no registrado', (done) => {
        let credenciales = {
            email: "noexiste@unq.edu.ar",
            password: "1234"
        }
        chai.request(server)
            .post('/login')
            .send(credenciales)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('El email ingresado es incorrecto');
                done();
            });
    });

    it('No deberia loguearse con un password invalido', (done) => {
        let credenciales = {
            email: "director@unq.edu.ar",
            password: "invalido"
        }
        chai.request(server)
            .post('/login')
            .send(credenciales)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('El password ingresado es incorrecto');
                done();
            });
    });

    it('No deberia loguearse sin email y contraseña', (done) => {
        chai.request(server)
            .post('/login')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('Todos los campos son requeridos');
                done();
            });
    });

    it('Deberia loguearse correctamente con email y password registrado', (done) => {
        let credenciales = {
            email: "director@unq.edu.ar",
            password: "1234"
        }
        chai.request(server)
            .post('/login')
            .send(credenciales)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('jwt');
                done();
            });
    });

});