//= require application

describe("ExampleApp.Views.TaskShow", function() {
  var task, view, $el;

  beforeEach(function() {
    task = new ExampleApp.Models.Task({
      id: 1,
      title: "Wake up"
    });

    view = new ExampleApp.Views.TaskShow({ model: task });
    $el = $(view.render().el);
  });

  it("renders the detail view for a task", function() {
    expect($el).toHaveText(/Wake up/);
  });

  it("renders a file upload area", function() {
    expect($el).toContain(".upload label:contains('Attach a file to upload')");
    expect($el).toContain(".upload button:contains('Upload attachment')");
    expect($el).toContain(".upload input[type=file]");
  });

  it("links the upload label and input", function() {
    var $label = $el.find('.upload label');
    var $input = $el.find('.upload input');
    expect($label.attr('for')).toEqual($input.attr('id'));
  });
});

describe("ExampleApp.Views.TaskShow for a task with attachments", function() {
  var task, view, $el;

  beforeEach(function() {
    task = new ExampleApp.Models.Task({
      id: 1,
      title: "Buy pies",
      attachments: [
        {
          upload_file_name: "blueberries.jpg",
          upload_url: "http://www.realblueberries.com/images/Blueberry-Cluster-1.jpg"
        },
        {
          upload_file_name: "strawberries.jpg",
          upload_url: "http://strawberriesweb.com/three-strawberries.jpg"
        }
      ]
    });

    view = new ExampleApp.Views.TaskShow({ model: task });
    $el = $(view.render().el);
  });

  it("displays attachments", function() {
    expect($el).toContain(".attachments img[src='http://www.realblueberries.com/images/Blueberry-Cluster-1.jpg']")
    expect($el).toContain(".attachments img[src='http://strawberriesweb.com/three-strawberries.jpg']")
  });

  it("displays attachment filenames", function() {
    expect($el.find(".attachments p").first()).toHaveText('Attached: blueberries.jpg');
    expect($el.find(".attachments p").last()).toHaveText('Attached: strawberries.jpg');
  });
});

describe("ExampleApp.Views.TaskShow uploading", function() {
  var task, view, $el;

  beforeEach(function() {
    this.xhr = sinon.useFakeXMLHttpRequest();
    var requests = this.requests = []

    this.xhr.onCreate = function(xhr) {
      requests.push(xhr);
    };

    this.xhr.prototype.upload = {
      addEventListener: function() {}
    };

    task = new ExampleApp.Models.Task({
      id: 1,
      title: "Wake up"
    });

    view = new ExampleApp.Views.TaskShow({ model: task });
  });

  afterEach(function() {
    this.xhr.restore();
  });

  it("uploads the file when the upload button is clicked", function() {
    view.uploadInput = function() {
      return { files: ["uploaded file contents"], }
    };

    $el = $(view.render().el);
    view.upload();

    expect(this.requests.length).toEqual(1);
    expect(this.requests[0].url).toEqual("/tasks/1/attachments.json");
  });
});
