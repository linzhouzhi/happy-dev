/**
 * Created by lzz on 2018/1/21.
 */

$(document).ready(function () {
    $.get("/user-list", function (userList) {
        userList.forEach(function(user){
            var isOpen = user.open;
            var status = "";
            if( isOpen == true ){
                status = "glyphicon glyphicon-ok-sign status-success";
            }else{
                status = "glyphicon glyphicon-remove-sign status-fail";
            }
            var tableStr = '<tr>' +
                '<td><span class="' + status + '"></span></td>' +
                '<td>' + user.username + '</td>' +
                '<td>' + user.shareDir + '</td>' +
                '<td>' + user.target + '</td>' +
                '<td>' +
                '<div class="btn-group btn-group-sm" role="group">' +
                '<button type="button" class="btn btn-default open-user" data-username="' + user.username + '">open</button>' +
                '<button type="button" class="btn btn-default close-user" data-username="' + user.username + '">close</button>' +
                '<button type="button" class="btn btn-danger remove-user" data-username="' + user.username + '">remove</button>' +
                '</div>' +
                '</td>' +
                '</tr>';
            $("#user-list").append(tableStr);
        });
    })
});

$("#add-user").click(function () {
    $('#add-user-model').modal('show');
});

$("#add-user-save").click(function () {
    var warnStr = '<div class="alert alert-warning alert-dismissible" role="alert">' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
        '<strong>Warning!</strong> not empty' +
        '</div>';

    var data = {};
    data.username = $("input[name='username']").val();
    data.password = $("input[name='password']").val();
    data.shareDir = $("input[name='shareDir']").val();
    if( !data.username || !data.password || !data.shareDir){
        $("#add-user-warn").html( warnStr );
        return;
    }
    post("/add-user", data, function (res) {
        console.log(res);
    });
});

$(document).on("click", ".remove-user", function () {
    var username = $(this).data("username");
    confirm( "/remove-user?username=" + username, "remove the user " + username);
});

$(document).on("click", ".open-user", function () {
    var username = $(this).data("username");
    confirm( "/open?username=" + username, "open the user " + username );
});

$(document).on("click", ".close-user", function () {
    var username = $(this).data("username");
    confirm( "/close?username=" + username, "close the user " + username );
});



$("#confirm-button").click(function () {
    var url = $(this).data("url");
    $.get(url, function (res) {
        console.log(res);
        $('#confirm-model').modal('hide');
    })
});

function confirm(url, content) {
    $("#confirm-content").text(content);
    $("#confirm-button").data("url", url);
    $('#confirm-model').modal('show');
}
function post(url, data, callback) {
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: "json",
        success: callback
    });
}