const nodemailer = require("nodemailer");

async function main() {
    let transporter = nodemailer.createTransport({
        host: "cwp.realwebsolution.in",
        port: 465,
        secure: true,
        auth: {
            user: 'no-reply@lifestubborn.com',
            pass: 'E08zXVmwiRAs'
        }
    });

    let info = await transporter.sendMail({
        from: `"Fred Foo 👻" <no-reply@lifestubborn.com>`,
        to: "vinit928@gmail.com",
        subject: "Hello ✔",
        text: "Hello world?",
        html: "<b>Hello world?</b>"
    });

    console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);
