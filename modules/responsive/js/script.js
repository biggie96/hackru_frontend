var menuOpen = false

if ($(".faqArrow").css('visibility').toLowerCase()=='visible') {
	$(".mainArticle").click(function(){
		if ($(this).children('.boxItems').css('display').toLowerCase()=='none') {
			$(this).children('.boxItems').show();
		}
		else {
			$(this).children('.boxItems').hide();
		}
	});
	$(".hamburger").click(function(){
		if (menuOpen == false) {
			document.getElementById("nav").style.display = "table";
			menuOpen = true
		}
		else {
			$('#nav').hide();
			menuOpen = false;
		}
        event.stopPropagation();
	});
    $("html").click(function(event){
      $("#nav").hide();
      menuOpen = false;
    });
    $("#nav").click(function(event){
      event.stopPropagation();
    });
}