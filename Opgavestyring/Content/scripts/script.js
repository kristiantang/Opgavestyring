$(document).ready(function () {

    //Create Category
    $('#btnCreateCategory').on("click", function () {
        var data = $('#createCategoryForm').serialize();
        $.ajax({
            url: "api/category",
            method: "POST",
            data: data,
        }).done(function (data) {
            GetCategory();
            $('#createCategory').modal('toggle');
        });
    });

    //Create Task
    $('#btnCreateTask').on("click", function () {
        var data = $('#createTaskForm').serialize();
        $.ajax({
            url: "api/task",
            method: "POST",
            data: data,
        })
    });

    $('#createTask').on('show.bs.modal', function (e) {
        console.log($(e.relatedTarget).data());
        $('#categoryId').val($(e.relatedTarget).data('id'));
        // do something...
    })

    //Show Category
    function GetCategory() {
        $('#categoryContainer').empty();
        $.ajax({
            url: "api/category"
        })
        .done(function (data) {
            $.each(data, function (key, item) {
                $('<section>', { html: RenderCategory(item) })
                .appendTo($('#categoryContainer'));
            });

            $('.finishTask').on("click", function () {
                var buttonThis = $(this);
                var id = $(this).data().id;
                $.ajax({
                    url: "api/task/" + id,
                    method: "PUT",
                }).done(function (data) {
                    $(buttonThis).closest('.task').toggleClass("finished");
                });
            });

            $('.removeTask').on("click", function () {
                var id = $(this).data().id;
                $.ajax({
                    url: "api/task/" + id,
                    method: "DELETE",
                }).done(function (data) {
                    GetCategory();
                });
            });

            $(".items-column").sortable({
                connectWith: ".connectedSortable",
                receive: function (event, ui) {
                    var taskId = $(ui.item).data('id');
                    var catId = $(event.target).data('id');

                    $.ajax({
                        url: "api/task/" + taskId + "?categoryId=" + catId,
                        method: "POST",
                    }).done(function (data) {
                       
                    });

                }
            }).disableSelection();
        })
    }



    GetCategory();
  
});

function RenderCategory(item) {
    
    var header = "<div class='header-column'>\
                <header>\
                    <div class='category'>\
                        <h2>" + item.Name + "</h2>\
                    </div>\
                    <a class='add-inline' data-id='"+ item.Id + "' data-toggle='modal' data-target='#createTask'>\
                        <span class='glyphicon glyphicon-plus'></span>\
                    </a>\
                </header>\
            </div>\
            <div class='items-column connectedSortable' data-id='" + item.Id + "'>";

    $.each(item.Tasks, function (key, item) {
        console.log(item);
        header += "<div class='task-container' data-id='" + item.Id + "'>\
                    <div class='task " + (item.Finished == true ? "finished" : "") + "'>\
                        <p class='title'>" + item.Name + "</p>\
                        <div class='icon finishTask' data-id='"+item.Id+"'>\
                            <span class='glyphicon glyphicon-ok'></span>\
                        </div>\
                        <div class='icon removeTask' data-id='" + item.Id + "'>\
                            <span class='glyphicon glyphicon-remove'></span>\
                        </div>\
                     </div>\
                    </div>";
    });

    header += "</div>"

    return header;

    

    //return "<div class='header-column'>\
    //            <header>\
    //                <div class='category'>\
    //                    <h2 id=>" + item.Name + "</h2>\
    //                </div>\
    //                <a class='add-inline' data-id='"+item.Id+"' data-toggle='modal' data-target='#createTask'>\
    //                    <span class='glyphicon glyphicon-plus'></span>\
    //                </a>\
    //            </header>\
    //        </div>\
    //        <div class='items-column'>\
    //        </div>"
}

function RenderTask(item) {
    return "<div class='task finished'>\
                <p class='title'>" + item.Name + "</p>\
                <div class='icon finishTask'>\
                    <span class='glyphicon glyphicon-ok'></span>\
                </div>\
                <div class='icon removeTask'>\
                    <span class='glyphicon glyphicon-remove'></span>\
                </div>\
            </div>"
}