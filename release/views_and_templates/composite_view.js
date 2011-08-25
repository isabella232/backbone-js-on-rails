CompositeView = function(options) {
  this.children = [];
  Backbone.View.apply(this, [options]);
};

_.extend(CompositeView.prototype, Backbone.View.prototype, {
  leave: function() {
    this._leaveChildren();
    this.unbind();
    this.remove();
    this._removeFromParent();
  },

  removeChild: function(view) {
    var index = this.children.indexOf(view);
    this.children.splice(index, 1);
  },

  renderChild: function(view) {
    view.render();
    this.children.push(view);
    view.parent = this;
  },

  appendChild: function(view) {
    this.renderChild(view);
    $(this.el).append(view.el);
  },

  renderChildInto: function(view, container) {
    this.renderChild(view);
    $(container).html('').append(view.el);
  },

  _leaveChildren: function() {
    var clonedChildren = this.children.slice(0);
    _.each(clonedChildren, function(view) {
      if (view.leave) {
        view.leave();
      }
    });
  },

  _removeFromParent: function() {
    if (this.parent) {
      this.parent.removeChild(this);
    }
  }
});

CompositeView.extend = Backbone.View.extend;
