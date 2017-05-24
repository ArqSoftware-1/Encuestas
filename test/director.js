let mongoose = require("mongoose");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server =  process.env.APP_HOST || "http://localhost:3000";
let should = chai.should();
let token;

chai.use(chaiHttp);

describe('Director sin autenticacion', () => {
    it('Deberia responder con error 403 si se solicitan todos los directores', (done) => {
        chai.request(server)
            .get('/api/director/listado')
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });

    it('Deberia responder con error 403 si se solicita crear un nuevo director', (done) => {
        director = {email: 'director1@unq.edu.ar',
                    password: 1234};
        chai.request(server)
            .post('/api/director/guardar')
            .send(director)
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });
});

describe('Director con autenticacion', () => {
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

    it('Deberia devolver 1 director cuando se solicitan todos', (done) => {
        chai.request(server)
            .get('/api/director/listado')
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });

    it('Deberia devolver el director nuevo cuando se crea uno de forma exitosa', (done) => {
        director = {email: 'director1@unq.edu.ar',
                    password: '1234'};
        chai.request(server)
            .post('/api/director/guardar')
            .send(director)
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('email').eql(director.email);
                done();
            });
    });

    it('No deberia crear un nuevo director si no se ingresan los datos', (done) => {
        chai.request(server)
            .post('/api/director/guardar')
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('Todos los campos son requeridos');
                done();
            });
    });

});