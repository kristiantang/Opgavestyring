$(document).ready(function() {

    $( ".items-column" ).sortable({
        connectWith: ".items-column",
        placeholder: "ui-state-highlight",

        receive: function( event, ui ) {
            console.log(ui.item,"er Droppet i", event.target);
        }
    }).disableSelection();


    
});
