var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587, // port for secure SMTP
    tls: {
        ciphers:'SSLv3'
    },
    auth: {
        user: 'no-reply@airbuk.com',
        pass: 'Qwerty171'
    }
});

var mailOptions = {
    from: '"Our Code World " <no-reply@airbuk.com>',
    to: 'vinit928@gmail.com',
    subject: 'Hello ',
    text: 'Hello world ',
    html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js'
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }

    console.log('Message sent: ' + info.response);
});

// no-reply@airbuk.com
// Qwerty171
