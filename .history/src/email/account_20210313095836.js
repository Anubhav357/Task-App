const sgMail = require('@sendgrid/mail');



sgMail.setApiKey(SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rkoanubhav@gmail.com',
        subject: 'Hi and Welcome',
        text: `Welcome ${name}. I hope you will enjoy our application`
    });
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rkoanubhav@gmail.com',
        subject: `Sad to see you are leaving`,
        text: `Good Bye ${name}.Can you give us some suggestion to improve our site`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
};