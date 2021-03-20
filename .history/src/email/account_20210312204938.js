const sgMail = require('@sendgrid/mail');

const sendGridAPIKey = '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';

sgMail.setApiKey(sendGridAPIKey);

sgMail.send({
    to: 'rkoanubhav@gmail.com',
    from: 'rkoanubhav@gmail.com',
    subject: 'This is my first creation',
    text: 'I hope this one actually gets to you'
}).then(() => {
    console.log('Email Sent');
}).catch((e) => {
    console.log(e);
    console.log('Email sent request got failed');
});