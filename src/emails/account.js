const sgMail = require("@sendgrid/mail");

const sendgridAPIKey = process.env.SEND_GRID_API_KEY;

sgMail.setApiKey(sendgridAPIKey);



const sendWelcomeEmail = (email,name) =>{
    sgMail.send({
        to:email,
        from:"mannpatel1360@gmail.com",
        subject:"Thanks For joining in our app!!",
        text:`Welcome to the app, ${name}. Let me know how you get along with the app.`,
    })
}

const sendDeletingEmail = (email,name) =>{
    sgMail.send({
        to:email,
        from:"mannpatel1360@gmail.com",
        subject:"Thanks For Being with Us",
        text:`Hey ${name}.Pl Tell us why u are leaving us, so we can improve it further.`
    })
}


module.exports = {
    sendWelcomeEmail,
    sendDeletingEmail
}