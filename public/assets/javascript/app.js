// Display modal
function callModal() {
	$("#commentModal").modal({
		keyboard: false
	});
};

$(".card-text").click(function() {
    console.log("Kittens!");
    callModal();
});