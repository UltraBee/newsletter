var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');

// for sending mails
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: username, // you have to enter your email adress
        pass: password // you have to enter your password
    }
});




// directory where i keep static assets
app.use(express.static('public'));

// sending html file to server
app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/process_get', function (req, res) {
    // Prepare output in JSON format
    response = {
        first_name:req.query.first_name,
        last_name:req.query.last_name,
        email_name:req.query.email_name
    };
    console.log(response);
    res.end('Thanks!');
    
    var mailOptions = {
        from: "'yourname' <youremail@gmail.com>",
        to: req.query.email_name,
        subject: 'Potwierdzenie zapisania na newsletter',
        text: `Witaj ${req.query.first_name},
Dziękujemy za zapisanie się do newslettera.`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
})
//app.get('/', function(req, res){
////    res.send('<h1>Hello world</h1>');
//    res.send('index.html');
//    
//});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

///////////////////////////////////////////////////////




