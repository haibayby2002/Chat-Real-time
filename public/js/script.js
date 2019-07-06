// plugin
$.fn.pressEnter = function (fn) {
    return this.each(function () {
        $(this).bind('enterPress', fn);
        $(this).keyup(function (e) {
            if (e.keyCode == 13) {
                $(this).trigger("enterPress");
            }
        })
    });
};

$(document).ready(function () {
    console.log(CreateTheirChat("Hi", "Hello"));
    $('#chat-content').hide();
    $('.alert').hide();
    $('#txtUsername').val('');
    $('#txtUsername').focus();
    var socket = new io();

    $('#btnLogin').click(function () {
        var username = $('#txtUsername').val();
        if (username == '') {
            // alert('Username can not empty');
            $('#login').append('<div class="alert alert-danger alert-dismissible fade show" id="alert"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Failed!</strong> Username can not be empty</div>');
        }
        else {
            socket = new io();
            socket.emit('Login-request', username); //Login request
            socket.once('LoginFail', function () {
                //$('#alert').show();
                $('#login').append('<div class="alert alert-danger alert-dismissible fade show" id="alert"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Failed!</strong> There has already had a user using this username</div>');
            });
            socket.on('LoginSuccess', function (data) {
                console.table(data);
                $('#login').hide();
                $('#chat-name').html(username);
                $('#countOnline').html(data.length);
                $('#chat-content').show();
            });
            
        }
    });

    $("#btnLogout").click(function(){
        $('#txtUsername').val('');
        $("#login").show();
        $('#txtUsername').focus();
        $("#chat-content").hide();
        socket.emit('user-logout');
    });

    $('#txtUsername').keypress(function (e) {
        if (e.which == 13) {
            $('#btnLogin').click();
        }
    });

    $("#success-alert").hide();
    $("#myWish").click(function showAlert() {
        $("#success-alert").alert();
        window.setTimeout(function () {
            $("#success-alert").alert('close');
        }, 2000);
    });

});

function CreateUserChat(name, info=false){
    var row = document.createElement("tr");
    if(info){
        row.className="table-info";
    }
    var child = document.createElement("th");
    child.innerHTML = name;
    row.appendChild(child);
    return row;
}

function CreateMyChat(content) {
    // <div class="chat-room">
    //     <div class="my-chat">Dolor incidunt eum minus, cumque recusandae repudiandae aspernatur atque aliquam assumenda veniam adipisci nobis et, illo ducimus nisi temporibus at. Odit, laborum. Maxime reprehenderit quas aliquam! Repellat eligendi excepturi eius!</div>
    //     <div class="clearfix"></div>
    // </div>
    var chat = document.createElement("div");
    chat.className = "chat-room";
    
    var inside = document.createElement("div");
    inside.className = "my-chat";
    inside.innerHTML = content;

    chat.appendChild(inside);

    var clearfix = document.createElement("div");
    clearfix.className = "clearfix";
    chat.appendChild(clearfix);

    return chat;
}

function CreateTheirChat(_user, _content) {
    /* <div class="their-chat row">
        <div class="col-2 user-chat">123</div>
        <div class="col-10 content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam perspiciatis voluptatibus, enim vitae ad eligendi tenetur consequatur ipsam fugit, dolore, harum debitis culpa praesentium. Tenetur quod esse cupiditate dolorem magnam.</div>
    </div>*/
    var chat = document.createElement('div');
    chat.className = "their-chat row";

    var userchat = document.createElement('div');
    userchat.className = "col-2 user-chat";
    userchat.innerHTML = _user;

    var content = document.createElement('div');
    content.className = 'col-10 content';
    content.innerHTML = _content;

    chat.appendChild(userchat);
    chat.appendChild(content);

    var clearfix = document.createElement('div');
    clearfix.className = 'clearfix';
    chat.appendChild(clearfix);
    return chat;
}