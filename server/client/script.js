//var id;
//var name;
//var email;
//var regDate;
//var col;
//var out;
//var i;
//$.ajax({
//    type: "GET",
//    url: "http://127.0.0.1:3001/users/",
//    crossDomain: true,
//    success: function (data) {
//        console.log(data.data);
//        out = data.data;
//        col= out.length;
//        var inner = '';
//        for (i = 0; i < col; i++){
//            id = data.data[i].id;
//        name = out[i].login;
//        email = out[i].mail;
//        regDate = out[i].regdate;
//        inner+='<div id="idint'+ i +'">Id: '+ id +' Login: '+ name +' Email: '+ email +' RegDate: '+regDate+'</div>';
//            
////        $('#name').text(name);
////        $('#email').text(email);
////        $('#regdate').text(regDate);
//        };
//        $('#textRes').html(inner);
//        $('#nLines').text('Number of lines: '+ col);
//    }
//});
function submReg() {
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3001/reg",
        crossDomain: true,
        success: function (data) {
            console.log(data.data);
            out = data.data;
            col = out.length;
            var inner = '';
            for (i = 0; i < col; i++) {
                id = data.data[i].id;
                name = out[i].login;
                email = out[i].mail;
                regDate = out[i].regdate;
                inner += '<div id="idint' + i + '">Id: ' + id + ' Login: ' + name + ' Email: ' + email + ' RegDate: ' + regDate + '</div>';

                //        $('#name').text(name);
                //        $('#email').text(email);
                //        $('#regdate').text(regDate);
            };
            $('#textRes').html(inner);
            $('#nLines').text('Number of lines: ' + col);
        }
    });
};


function sabma() {
    var data = $('#formR').serialize();
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3001/reg",
        data: data,
    });
};

function editP() {
    var data = $('#ChangeP').serialize();
    var formdat = new FormData(document.getElementById("ChangeP"));
    $.ajax({
        type: "POST",
        processData: false,
        contentType: false,
        url: "http://127.0.0.1:3001/edit",
        data: formdat,
    });
};

function log() {
    var UserIn;
    var data = $('#formL').serialize();
    fetch('http://127.0.0.1:3001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        redirect: 'follow',
        credentials: 'include', // Don't forget to specify this if you need cookies 
        body: data
    }).then(function(res){
        return res.json();
    }).then(function(data){
        console.log(data.UserIn);
        UserIn = data.UserIn;
        if (UserIn == 'false'){
            $('#aler').html('Неправильный логин или пароль');
        };
        if (UserIn == 'true'){
            window.location.href = 'profile.html';
        };
    });
};

//function log() {
//    var data = $('#formL').serialize();
//    $.ajax({
//        type: "POST",
//        url: "http://127.0.0.1:3001/login",
//        crossDomain: true,
//        data: data,
//    });
//    
//
//};

function valog(){
    if (($('#login').val() == '') || ($('#pass').val() == '')){
        $('#aler').html('Заполните все поля')
    }
    else{
        log();
    };
};

function loadP() {
    fetch('http://127.0.0.1:3001/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        redirect: 'follow',
        credentials: 'include', // Don't forget to specify this if you need cookies 
    }).then(function(res){
        return res.json();
    }).then(function(data){
        console.log(data.data[0]);
 $('#description').html(data.data[0].descript);
 $('#myname').html(data.data[0].name);
 $('#myname').val(data.data[0].name);
 $('#cl1').html(data.data[0].cl1);
 $('#cl2').html(data.data[0].cl2);
 $('#cl3').html(data.data[0].cl3);
 $('#clr1').val(data.data[0].cl1);
 $('#clr2').val(data.data[0].cl2);
 $('#clr3').val(data.data[0].cl3);
if (data.data[0].imgkey != ""){
 $('.Ijb').css('backgroundImage', 'url(uploads/'+data.data[0].imgkey+')');
        };
    });
};

function loadS() {
    fetch('http://127.0.0.1:3001/search', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        redirect: 'follow',
        credentials: 'include', // Don't forget to specify this if you need cookies 
    }).then(function(res){
        return res.json();
    }).then(function(data){
        console.log(data.data[0]);
 $('#description').html(data.data[0].descript);
 $('#myname').html(data.data[0].name);
 $('#myname').val(data.data[0].name);
 $('#cl1').html(data.data[0].cl1);
 $('#cl2').html(data.data[0].cl2);
 $('#cl3').html(data.data[0].cl3);
 $('#clr1').val(data.data[0].cl1);
 $('#clr2').val(data.data[0].cl2);
 $('#clr3').val(data.data[0].cl3);
if (data.data[0].imgkey != ""){
 $('.Ijb').css('backgroundImage', 'url(uploads/'+data.data[0].imgkey+')');
        };
    });
};

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
};