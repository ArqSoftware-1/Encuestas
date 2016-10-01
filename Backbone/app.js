$(function() {
    // Modelo de la materia
    var Materia = Backbone.Model.extend({
        defaults: function() {
            return {
                id: 1,
                nombre: "Sin nombre",
                opciones: []
            };
        },
        sync: function() {
            return false;
        }
    });

    // Listado de las materias
    var ListaMaterias = Backbone.Collection.extend({
        model: Materia,
    });

    var Materias = new ListaMaterias;

    var MateriaView = Backbone.View.extend({
        tagName: "li",
        template: _.template($('#materia-template').html()),
        initialize: function() {
            // Binding con la materia para actualizar la vista cuando se modifica una
            this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
    });

    var AppView = Backbone.View.extend({
        el: $("#app"),
        events: {
            "click #enviar": "enviar",
        },
        initialize: function() {
            this.lista = this.$('#materia-lista');
            // Binding con el listado de materias para actualizar la vista cuando se agrega una
            this.listenTo(Materias, 'add', this.agregarUno);
            this.listenTo(Materias, 'reset', this.agregarTodos);

            Materias.create(new Materia({
                id: 1,
                nombre: 'Intr. a la programación',
                opciones: ['Ya la cursé', 'La voy a cursar']
            }));
            Materias.create(new Materia({
                id: 2,
                nombre: 'Matemática 1',
                opciones: ['Ya la cursé', 'La voy a cursar']
            }));

        },
        render: function() {

        },
        agregarUno: function(materia) {
            var view = new MateriaView({
                model: materia
            });
            this.$("#materia-lista").append(view.render().el);
        },
        agregarTodos: function() {
            Materias.each(this.agregarUno, this);
        },
        enviar: function() {
            resultado = [];
            Materias.each(function(materia) {
                materia = materia.toJSON();
                resultado[materia.nombre] = $('select[id=' + materia.id + '-select]').val();
            }, this);
            console.log(resultado);
        }
    });

    var App = new AppView;
});