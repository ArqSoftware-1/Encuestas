import * as express from "express";
import { join } from "path";
import * as favicon from "serve-favicon";
import { json, urlencoded } from "body-parser";
import * as winston from "winston";
import mongoose = require("mongoose");
require('winston-loggly-bulk');

import { loginRouter } from "./routes/login";
import { protectedRouter } from "./routes/protected";

const app: express.Application = express();
app.disable("x-powered-by");

app.use(favicon(join(__dirname, "../public", "favicon.ico")));
app.use(express.static(join(__dirname, '../public')));

app.use(json());
app.use(urlencoded({ extended: true }));

// api routes
app.use("/api", protectedRouter);
app.use("/login", loginRouter);

app.use('/client', express.static(join(__dirname, '../client')));

// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {

    app.use(express.static(join(__dirname, '../node_modules')));
    app.use(express.static(join(__dirname, '../tools')));

    app.use(function(err, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next) {
    let err = new Error("Not Found");
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

winston.add(winston.transports.Loggly, {
    inputToken: "92eab9c6-189f-4340-a690-4b162f9da412",
    subdomain: "quilsoft",
    tags: ["Winston-NodeJS"],
    json:true
});
winston.log('info',"Hola esto es una prueba desde la app de encuestas!");

export { app }

// Prueba mongoose

mongoose.connect('mongodb://localhost/encuestas');

interface IUser {
    email: string;
    password: string;
    displayName: string;
};

interface IUserModel extends IUser, mongoose.Document { }

var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    displayName: String
});

var User = mongoose.model<IUserModel>("User", userSchema);

var user = new User({email: "user@appsilon.pl"});
user.save();

User.findOne({email: "user@appsilon.pl"}).exec().then(user => {
    console.log(user);
});

// Para agregado de materias y sus opciones
import { Opcion } from "./Domain/Opcion";
import { Materia } from "./Domain/Materia";

var opcionSchema = new mongoose.Schema({
    Descripcion: String,
});

var materiaSchema = new mongoose.Schema({
    Opciones: [],
    Nombre: String,
});

var opcion = mongoose.model<Opcion>("Opcion", opcionSchema);
var materia = mongoose.model<Materia>("Materia", materiaSchema);

var opc = new opcion({Descripcion: "Voy a cursar"});
opc.save();

var enc = new materia({Opciones: [opc], Nombre: "Matematica"});
enc.save();

opcion.findOne({Descripcion: "Voy a cursar"}).exec().then(op => {
    console.log(op);
});
//