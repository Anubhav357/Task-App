const sgMail = require('@sendgrid/mail');

const sendGridAPIKey = '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';

sgMail.setApiKey(sendGridAPIKey);

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
        text: `Good Bye ${name}.Can you give us some suggestion to improve our sites`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
};