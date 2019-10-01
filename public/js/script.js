$(document).ready(function () {
    $( ".toggle-parent" ).click(function() {
        $( ".toggle-content" ).slideToggle( "medium");
        $( ".toggle-parent" ).toggleClass( "up");
      });
});