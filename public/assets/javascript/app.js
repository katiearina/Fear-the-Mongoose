// Display modal
function callModal() {
	$("#commentModal").modal({
		keyboard: false
	});
};

$(".commentArticle").click(function() {
    callModal();
});

$(document).on("click", ".commentArticle", function() {
	var thisId = $(this).attr("id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })

  .done(function(data) {
	  console.log(data);
    // $(".modal-body").empty();
    $(".modal-title").html("<h5>Comments on: " + data.title + "</h5>");
    $(".modal-body").html("<input id='titleinput' name='title' placeholder='Comment Title'>");
    $(".modal-body").append("<input id='authorinput' name='author' placeholder='Comment Author'>");
    $(".modal-body").append("<textarea id='bodyinput' name='body' placeholder='Comment Body'></textarea>");
    $(".modal-body").append("<button data-id='" + data._id + "' id='saveComment'>Save New Comment</button>");

    if (data.comment) {
    $(".modal-body").append("<div class='commentsGoHere' id=" + data._id + ">");
      for (i = 0; i < data.comment.length; i++) {
      $(".commentsGoHere").append("<div>Comment Title: " + data.comment[i].title + 
      "<br>" + data.comment[i].author + "<br>" + data.comment[i].body + "<br><button data-id='" + data.comment[i]._id + "' id='deleteComment'>Delete This Comment</button></div>");
      }
    }
    if (data.comment[0] === undefined) {
      $(".modal-body").append("<h5>No Comments Yet!</h5>");
    }
  });

});

// When you click the saveComment button
$(document).on("click", "#saveComment", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log(thisId);

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from author input
      author: $("#authorinput").val(),
      // Value taken from comment body textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log("Posted!", data);
      // Empty the notes section
      $(".modal-body").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#authorinput").val("");
  $("#bodyinput").val("");
});

$(document).on("click", ".saveArticle", function() {
  var thisId = $(this).attr("id");
  console.log(thisId);
  $.ajax({
    method: "POST",
    url: "/saved/" + thisId,
    data: {
      saved: true
    }
  })
    .done(function(data) {
      console.log("Saved!", data);
    });
});

$(document).on("click", "#deleteComment", function() {
  var thisId = $(this).attr("data-id");
  console.log(thisId);
  $.ajax({
    method: "DELETE",
    url: "/delete/" + thisId
  })
    .done(function(data) {
      console.log("Deleted!", data);
    });
});
