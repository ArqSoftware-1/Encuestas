
$(function(){

  // Todo Model
  // ----------

  // Our basic **Todo** model has `title`, `order`, and `done` attributes.
  var Todo = Backbone.Model.extend({

    // Default attributes for the todo item.
    defaults: function() {
      return {
        title: "empty todo...",
        done: false
      };
    },

    toggle: function() {
     
    }

  });

  var AppView = Backbone.View.extend({

    el: $("#todoapp"),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template($('#stats-template').html()),

    initialize: function() {

      this.footer = this.$('footer');

    },
	
    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
        this.footer.html(this.statsTemplate({done: 'hola'}));
    },

  });

  // Finally, we kick things off by creating the **App**.
  var App = new AppView;
  App.render();

});
