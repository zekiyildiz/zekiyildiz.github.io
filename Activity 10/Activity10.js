let languages = ["ActionScript",
                 "AppleScript",
                 "Asp",
                 "JavaScript",
                 "Lisp",
                 "Perl",
                 "PHP",
                 "Pyhton",
                ]

$(document).ready(function() {
    $("#birthday").datepicker();
  });

$(document).ready(function(){
    $( "#programming_language" ).autocomplete({
        source: languages
        });
});