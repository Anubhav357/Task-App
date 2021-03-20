const sgMail = require('@sendgrid/mail');

const sendGridAPIKey = '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';

sgMail.setApiKey(sendGridAPIKey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rkoanubhav@gmail.com',
        subject: 'Hi and Welcome',
        text: `Welcome ${name} I hope you will be enjoy our application`
    });
}

module.exports = {
    sendWelcomeEmail
};