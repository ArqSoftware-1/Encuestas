"use strict";
var MateriasService = (function () {
    function MateriasService() {
    }
    MateriasService.prototype.obtenerMaterias = function () {
        return [{ Nombre: 'Introducción a la prog', OpcionElegida: '' },
            { Nombre: 'Matematica 1', OpcionElegida: '' },
            { Nombre: 'Orga', OpcionElegida: '' }];
    };
    MateriasService.prototype.obtenerOpciones = function () {
        return [{ Id: 1, Nombre: 'Ya cruse' }, { Id: 2, Nombre: 'Voy a cursar' }, { Id: 3, Nombre: 'Me gustaria pero no puedo' }];
    };
    return MateriasService;
}());
exports.MateriasService = MateriasService;
//# sourceMappingURL=materias.service.js.map