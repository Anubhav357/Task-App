const sgMail = require('@sendgrid/mail');

const sendGridAPIKey = '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';

sgMail.setApiKey(sendGridAPIKey);

sgMail.send = (email, user) => {
    to: email,
    from: 'rkoanubhav@gmail.com',
    subject: 'Welcome ',
    text: 'What are your expectation from our product'

}