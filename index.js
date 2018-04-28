var getAllTasks = function () {
  $.ajax({
    type: "GET",
    url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=26",
    dataType: "json",
    success: function (response, textStatus) {
      console.log(response);
      response["tasks"].forEach(function (item) {
        var listItem = "";
        if (!item["completed"]) {
          listItem += "<li class='list-group-item'><div class='form-check form-check-inline'><input class='form-check-input check-complete' type='checkbox'></div><span class='hidden'>" + item["id"] + "</span>" + item["content"] + "<button type='button' class='btn btn-light btn-sm btn-remove'>x</button></li>";
        } else if (item["completed"]) {
          listItem += "<li class='list-group-item'><div class='form-check form-check-inline'><input class='form-check-input check-complete' type='checkbox' checked></div><span class='hidden'>" + item["id"] + "</span>" + item["content"] + "<button type='button' class='btn btn-light btn-sm btn-remove'>x</button></li>";
        }
        $(".todo-list").append(listItem);
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};
var getActiveTasks = function () {
  $.ajax({
    type: "GET",
    url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=26",
    dataType: "json",
    success: function (response, textStatus) {
      console.log(response);
      response["tasks"].forEach(function (item) {
        var listItem = "";
        if (!item["completed"]) {
          listItem += "<li class='list-group-item'><div class='form-check form-check-inline'><input class='form-check-input check-complete' type='checkbox'></div><span class='hidden'>" + item["id"] + "</span>" + item["content"] + "<button type='button' class='btn btn-light btn-sm btn-remove'>x</button></li>";
          $(".todo-list").append(listItem);
        }
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};
var getCompletedTasks = function () {
  $.ajax({
    type: "GET",
    url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=26",
    dataType: "json",
    success: function (response, textStatus) {
      console.log(response);
      response["tasks"].forEach(function (item) {
        var listItem = "";
        if (item["completed"]) {
          listItem += "<li class='list-group-item'><div class='form-check form-check-inline'><input class='form-check-input check-complete' type='checkbox' checked></div><span class='hidden'>" + item["id"] + "</span>" + item["content"] + "<button type='button' class='btn btn-light btn-sm btn-remove'>x</button></li>";
          $(".todo-list").append(listItem);
        }
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
};
var reloadList = function () {
  $(document).ajaxComplete(function (event, request, settings) {
    if ($(".active-tasks").hasClass("active") || $(".completed-tasks").hasClass("active")) {
      $(".active-tasks").removeClass("active");
      $(".completed-tasks").removeClass("active");
      $(".all-tasks").addClass("active");
      $(".todo-list").children().remove();
    }
    $(".todo-list").children().remove();
    getAllTasks();
    $(document).unbind("ajaxComplete");
  });
};
getAllTasks();
$(document).on("click", ".btn-todo-add", function () {
  if ($(".input-todo").val()) {
    $.ajax({
      type: "POST",
      url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=26",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({
        task: {
          content: $(".input-todo").val()
        }
      }),
      success: function (response, textStatus) {
        console.log(response);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
    reloadList();
    $(".input-todo").val("");
  }
});
$(document).on("click", ".check-complete", function () {
  var taskId = $(this).parent().next().text();
  if (this.checked) {
    $.ajax({
      type: "PUT",
      url: "https://altcademy-to-do-list-api.herokuapp.com/tasks/" + taskId + "/mark_complete?api_key=26",
      contentType: "application/json",
      dataType: "json",
      success: function (response, textStatus) {
        console.log(response);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  } else if (!this.checked) {
    $.ajax({
      type: "PUT",
      url: "https://altcademy-to-do-list-api.herokuapp.com/tasks/" + taskId + "/mark_active?api_key=26",
      contentType: "application/json",
      dataType: "json",
      success: function (response, textStatus) {
        console.log(response);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }
  reloadList();
});
$(document).on("click", ".btn-remove", function () {
  var taskId = $(this).prev().text();
  $.ajax({
    type: "DELETE",
    url: "https://altcademy-to-do-list-api.herokuapp.com/tasks/" + taskId + "?api_key=26",
    contentType: "application/json",
    dataType: "json",
    success: function (response, textStatus) {
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
  reloadList();
});
$(document).on("click", ".task-status", function () {
  $(".task-status").removeClass("active");
  $(this).addClass("active");
  $(".todo-list").children().remove();
  if($(this).hasClass("all-tasks")) {
    getAllTasks();
  } else if ($(this).hasClass("active-tasks")) {
    getActiveTasks();
  } else if ($(this).hasClass("completed-tasks")) {
    getCompletedTasks();
  }
})
