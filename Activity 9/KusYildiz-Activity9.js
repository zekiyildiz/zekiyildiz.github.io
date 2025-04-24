$(document).ready(function() {
	// preload images
	$("#image_list a").each(function() {
		var swappedImage = new Image();
		swappedImage.src = $(this).attr("href");
	});

	let currentImage = null;

	// set up event handlers for links
	$("#image_list a").click(function(evt) {

		// prevent link default behavior
		evt.preventDefault();

		// get href and title
		var imageURL = $(this).attr("href");
		var caption = $(this).attr("title");

		$("#image").fadeOut(1000, function() {
			$("#image").attr("src", imageURL);

			$("#image").fadeIn(1000);
		});

		$("#caption").fadeOut(1000, function() {

			var newCaptionText = caption;
			$("#caption").text(newCaptionText);

			$("#caption").fadeIn(1000);
		});

	});

	// move focus to first thumbnail
	$("li:first-child a").focus();
	currentImage = $("li:first-child a");
}); // end ready