ExampleApp.Views.TasksIndex = Backbone.View.extend({
  initialize: function() {
    this.render();
  },

  render: function () {
    $(this.el).html(JST['tasks/index']({ tasks: ExampleApp.tasks }));

    var tasksIndexView = this;
    ExampleApp.tasks.each(function(task) {
      var taskView = new ExampleApp.Views.TaskView({model: task});
      tasksIndexView.$('table').append(taskView.render().el);
    });

    $('body').html(this.el);

    return this;
  }
});
