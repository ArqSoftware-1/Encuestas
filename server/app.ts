import * as express from "express";
import { join } from "path";
import * as favicon from "serve-favicon";
import { json, urlencoded } from "body-parser";
import * as winston from "winston";
import mongoose = require("mongoose");
require('winston-loggly-bulk');
require('newrelic');

import { loginRouter } from "./routes/login";
import { protectedRouter } from "./routes/protected";
import { rutaEncuestas } from "./routes/encuestas";
import { rutaRespuestasEncuesta } from "./routes/respuestasEncuesta";
import { rutaRespuestasEncuestaPublica } from "./routes/respuestasEncuestaPublica";
import { rutaMaterias } from "./routes/materias";
import { rutaOpciones } from "./routes/opciones";

const app: express.Application = express();
app.disable("x-powered-by");

app.use(favicon(join(__dirname, "../public", "favicon.ico")));
app.use(express.static(join(__dirname, '../public')));

app.use(json());
app.use(urlencoded({ extended: true }));

// api routes
app.use("/api/opciones", rutaOpciones);
app.use("/api/materias", rutaMaterias);
app.use("/api/encuestas", rutaEncuestas);
app.use("/api/respuestas/encuesta", rutaRespuestasEncuesta);
app.use("/api/publica/respuestas/encuesta", rutaRespuestasEncuestaPublica);
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
winston.log('info',"Aplicación iniciada");

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/encuestas');

mongoose.connection.once('open', ()=> {
    mongoose.connection.db.dropDatabase(() => {
        require('./data');
    })
})

exports.config = {
  /**
   * Array of application names.
   */
  app_name: ['Encuestas'],
  /**
   * Your New Relic license key.
   */
  license_key: '74314e19624be4368072e78ff499853c7cb6b28b',
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'info'
  }
}

export { app }
