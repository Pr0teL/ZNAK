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
        url: "http://warm-taiga-78399.herokuapp.com/reg",
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
        url: "http://warm-taiga-78399.herokuapp.com/reg",
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
        url: "http://warm-taiga-78399.herokuapp.com/edit",
        data: formdat,
    });
};

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function editS() {
    var data = $('#ChangeS').serialize();
    $.ajax({
        type: "POST",
        url: "http://warm-taiga-78399.herokuapp.com/se",
        data: data,
    }).then(function(res){
        var i = randomInteger(0, res.data.length -1);
        console.log(res.data);
        console.log(i);
       $('.descr').html(res.data[i].descript);
        $('.myname').html(res.data[i].name);
        $('.c1').html(res.data[i].cl1);
        $('.c2').html(res.data[i].cl2);
        $('.c3').html(res.data[i].cl3);
        if (res.data[i].imgkey != ""){
 $('.Ijb').css('backgroundImage', 'url(uploads/'+res.data[i].imgkey+')');
        };
    });
    var modal = document.getElementById("modal");
    modal.style.display = "none";
};



function log() {
    var UserIn;
    var data = $('#formL').serialize();
    fetch('http://warm-taiga-78399.herokuapp.com/login', {
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
    fetch('http://warm-taiga-78399.herokuapp.com/user', {
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
 $('.myname').html(data.data[0].name);
 $('.myname').val(data.data[0].name);
 $('#cl1').html(data.data[0].cl1);
 $('#cl2').html(data.data[0].cl2);
 $('#cl3').html(data.data[0].cl3);
 $('#clr1').val(data.data[0].cl1);
 $('#clr2').val(data.data[0].cl2);
 $('#clr3').val(data.data[0].cl3);
 $('#clr1s').val(data.data[0].cl1s);
 $('#clr2s').val(data.data[0].cl2s);
 $('#clr3s').val(data.data[0].cl3s);
if (data.data[0].imgkey != ""){
 $('.Ijb').css('backgroundImage', 'url(uploads/'+data.data[0].imgkey+')');
        };
    });
};

var rotateDeg = 0;

function loadS(a) {
    fetch('http://warm-taiga-78399.herokuapp.com/user', {
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
 $('#clr1s').val(data.data[0].cl1s);
 $('#clr2s').val(data.data[0].cl2s);
 $('#clr3s').val(data.data[0].cl3s);
 editS();
    });
    rotateDeg+=Number(a);
 $('.trSlider').css({'transform': 'rotateY('+rotateDeg+'deg)'});
 console.log(rotateDeg);
};
function RotateSL(){
    rotateDeg+=120;
 $('.trSlider').css({'transform': 'rotateY('+rotateDeg+'deg)'});
 console.log(rotateDeg);
};

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
};

function mod() {
    var btn_m = document.getElementsByClassName("mod_btn");
    var modal = document.getElementById("modal");
    var close = document.getElementsByClassName("close");
    modal.style.display = "block";
}

function close_m() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}

function slideS(){
    $(".SrcBlock").css
}

