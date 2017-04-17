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

describe('Encuestas sin autenticacion', () => {
    it('Deberia responder con error 403 si se solicitan todas la encuestas', (done) => {
        chai.request(server)
            .get('/api/encuestas/listado')
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });

    it('Deberia responder con error 403 si se solicita crear una nueva encuesta', (done) => {
        encuesta = {anho: 2018,
                    semestre: 1,
                    carrera: 'Licenciatura en informática',
                    fechaLimite: '2017/09/23'};
        chai.request(server)
            .post('/api/encuestas/guardar')
            .send({encuesta: encuesta})
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });
});

describe('Encuestas con autenticacion', () => {
   before(function(done){
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

     });

    it('Deberia devolver dos encuestas cuando se solicitan todas', (done) => {
        chai.request(server)
            .get('/api/encuestas/listado')
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(2);
                done();
            });
    });

    it('Deberia devolver la nueva encuesta cuando se crea una de forma exitosa', (done) => {
        encuesta = {anho: 2018,
                    semestre: 1,
                    carrera: 'Licenciatura en informática',
                    fechaLimite: '2017/09/23'};
        chai.request(server)
            .post('/api/encuestas/guardar')
            .send({encuesta: encuesta})
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('anho').eql(encuesta.anho);
                res.body.should.have.property('semestre').eql(encuesta.semestre);
                res.body.should.have.property('carrera').eql(encuesta.carrera);
                done();
            });
    });

    it('No deberia crear una encuesta si no se ingresan los datos', (done) => {
        chai.request(server)
            .post('/api/encuestas/guardar')
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('Todos los campos son requeridos');
                done();
            });
    });

});