var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
var multer  = require("multer");
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
var cookieParser = require('cookie-parser');
var path = require('path')
var cookieVar;
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));
//app.use(multer({dest:"uploads",
//                filename: "abob.jpg"
//               }).single("photo"));
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'client/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Math.random().toString(36).substr(2, 9) + "-" + file.originalname)
  }
})

var upload = multer({ storage: storage })
app.use(cors({
    origin: '*',
    //    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// default route
app.get('/', function (req, res) {
    return res.sendFile(path.join(__dirname, 'client/index.html'))
});

// set port
app.listen(3001, function () {
    console.log('Node app is running on port 3001');
});
module.exports = app;


// connection configurations
var dbConn = mysql.createConnection({
    host: "81.90.182.61",
    port: "3306",
    user: "protel1",
    database: "match",
    password: "g7x6iEFJIyxz"
});
// connect to database
dbConn.connect();


// Retrieve all users 
app.get('/users', function (req, res) {
    dbConn.query('SELECT * FROM reg', function (error, results, fields) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'users list.'
        });
    });
});
app.post('/reg', urlencodedParser, function (req, res) {
    console.log(req.body);
    dbConn.query('INSERT INTO reg (login, pass, mail, clientkey, name) VALUES ("' + req.body.login + '", "' + req.body.pass + '", "' + req.body.email + '", "' + Math.random().toString(36).substr(2, 9) + '", "' + req.body.name + '")');
});
app.post('/login', urlencodedParser, function (req, res) {
    console.log(req.body);
    dbConn.query('SELECT clientkey FROM reg WHERE login ="' + req.body.login + '" AND pass="' + req.body.pass + '"', function (error, results, fields) {
        if (results.length !== 0) {
            cookieVar = results[0].clientkey;
            res.cookie('sessia', cookieVar);
            return res.send({
                error: false,
                UserIn: 'true',
                message: 'hi'
            });
        } else {
            console.log('Не правлиьный логин или пароль')
            res.send({
                UserIn: "false"
            });
        }
    });
});

app.post('/se', function (req, res) {
    dbConn.query('UPDATE reg SET cl1s = "' + req.body.cl1s + '", cl2s = "' + req.body.cl2s + '", cl3s = "' + req.body.cl3s + '" WHERE clientkey = "' + req.cookies.sessia + '"');
    dbConn.query('SELECT name, mail, descript, cl1, cl2, cl3, imgkey FROM `reg` WHERE cl1 = "' + req.body.cl1s + '" OR cl2 = "' + req.body.cl2s + '" OR cl3 = "' + req.body.cl3s + '"', function (error, results, fields) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'search'
        });
    });

    console.log(req.body);
});

app.post('/getcookie', urlencodedParser, function (req, res) {
    //    res.setHeader('Set-cookie','abob=15553535' );
    //     res.cookie('aboba', Math.random().toString(36).substr(2, 9));
    res.status(200).json({
        msg: "Hi"
    });
});

app.get('/user', function (req, res) {
    console.log(req.cookies.sessia);
    dbConn.query('SELECT name, mail, descript, cl1, cl2, cl3, cl1s, cl2s, cl3s, imgkey FROM `reg` WHERE clientkey = "' + req.cookies.sessia + '"', function (error, results, fields) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'user'
        });
    });
});


//app.post("/upload", function (req, res, next) {
//   
//    let filedata = req.file;
//    console.log(filedata);
//    if(!filedata)
//        res.send("Ошибка при загрузке файла");
//    else
//        res.send("Файл загружен");
//});


app.post('/edit', upload.single("photo"), urlencodedParser, function (req, res) {
    var filedata = req.file;
    console.log(filedata);
    console.log(req.body);
    console.log(req.cookies.sessia);
    dbConn.query('UPDATE reg SET name = "' + req.body.name + '", descript = "' + req.body.desc + '", cl1 = "' + req.body.cl1 + '", cl2 = "' + req.body.cl2 + '", cl3 = "' + req.body.cl3 + '" WHERE clientkey = "' + req.cookies.sessia + '"');
    if (req.file) {
    dbConn.query('UPDATE reg SET  imgkey ="'+req.file.filename+'" WHERE clientkey = "' + req.cookies.sessia + '"');
    console.log(req.file.originalname);
    };
});
