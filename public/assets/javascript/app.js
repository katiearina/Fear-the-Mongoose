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
    $(".modal-body").html("<input id='titleinput' name='title' >");
    $(".modal-body").append("<input id='authorinput' name='author' >");
    $(".modal-body").append("<textarea id='bodyinput' name='body'></textarea>");
    $(".modal-body").append("<button data-id='" + data._id + "' id='saveComment'>Save Comment</button>");

    if (data.comment) {
      $("#titleinput").val(data.comment.title);
      $("#authorinput").val(data.comment.author);
      $("#bodyinput").val(data.comment.body);
    }
  });

});

// When you click the savenote button
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
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log("Posted! " + data);
      // Empty the notes section
      $(".modal-body").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#authorinput").val("");
  $("#bodyinput").val("");
});