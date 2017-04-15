//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = "http://localhost:3000";
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Books', () => {

  describe('/POST login', () => {
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
                res.body.should.have.property('message');
                res.body.should.have.property('message').eql('El email ingresado es incorrecto');
              done();
            });
      });
  });

});