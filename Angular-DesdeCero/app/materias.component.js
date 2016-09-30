"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var materias_service_1 = require("./materias.service");
var MateriasComponent = (function () {
    function MateriasComponent(estudiantesService) {
        this.materias = estudiantesService.obtenerMaterias();
        this.opciones = estudiantesService.obtenerOpciones();
        this.materiasOpciones = [];
    }
    MateriasComponent.prototype.eligioOpcionParaMateria = function (nombreMateria) {
        var estaLaMateria = false;
        for (var i = 0; i < this.materiasOpciones.length; i++) {
            if (this.materiasOpciones[i].Nombre == nombreMateria) {
                estaLaMateria = true;
                break;
            }
        }
        return estaLaMateria;
    };
    MateriasComponent.prototype.onChange = function (nombreMateria, opcionElegida) {
        if (this.materiasOpciones.length == 0) {
            var materiaOpcion = { Nombre: nombreMateria, Opcion: opcionElegida };
            this.materiasOpciones.push(materiaOpcion);
        }
        for (var i = 0; i < this.materiasOpciones.length; i++) {
            if (this.materiasOpciones[i].Nombre == nombreMateria) {
                this.materiasOpciones[i].Opcion = opcionElegida;
                break;
            }
        }
        var estaLaMateria = false;
        for (var i = 0; i < this.materiasOpciones.length; i++) {
            if (this.materiasOpciones[i].Nombre == nombreMateria) {
                estaLaMateria = true;
                break;
            }
        }
        if (!estaLaMateria) {
            var materiaOpcion = { Nombre: nombreMateria, Opcion: opcionElegida };
            this.materiasOpciones.push(materiaOpcion);
        }
    };
    MateriasComponent.prototype.enviar = function () {
        console.log(this.materiasOpciones);
    };
    MateriasComponent = __decorate([
        core_1.Component({
            selector: 'materias',
            templateUrl: './materias.component.html',
            providers: [materias_service_1.MateriasService],
            inputs: ['materiasOpciones']
        }), 
        __metadata('design:paramtypes', [materias_service_1.MateriasService])
    ], MateriasComponent);
    return MateriasComponent;
}());
exports.MateriasComponent = MateriasComponent;
//# sourceMappingURL=materias.component.js.map