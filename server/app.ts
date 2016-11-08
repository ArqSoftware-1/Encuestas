/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />
import * as express from "express";
import { join } from "path";
import * as favicon from "serve-favicon";
import { json, urlencoded } from "body-parser";
import * as winston from "winston";
import mongoose = require("mongoose");
require('winston-loggly-bulk');

import { loginRouter } from "./routes/login";
import { protectedRouter } from "./routes/protected";
import { rutaEncuestas } from "./routes/encuestas";
import { rutaRespuestasEncuesta } from "./routes/respuestasEncuesta";
import { rutaMateria } from "./routes/materias";
import { rutaOpcion } from "./routes/opciones";

const app: express.Application = express();
app.disable("x-powered-by");

app.use(favicon(join(__dirname, "../public", "favicon.ico")));
app.use(express.static(join(__dirname, '../public')));

app.use(json());
app.use(urlencoded({ extended: true }));

// api routes
app.use("/api/opciones", rutaOpcion);
app.use("/api/materias", rutaMateria);
app.use("/api/encuestas", rutaEncuestas);
app.use("/api/respuestas/encuesta", rutaRespuestasEncuesta);
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

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/encuestas');

mongoose.connection.once('open', ()=> {
    mongoose.connection.db.dropDatabase(() => {
        require('./data');
    })
})

export { app }
