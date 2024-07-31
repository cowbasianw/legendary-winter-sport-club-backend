const express = require('express');
const router = express.Router();
const sendEmail = require('./nodemailerconfig'); // Import the sendEmail function

router.post('/join', async (req, res) => {
    const { name, email, message, phone } = req.body;
    console.log('Received data:', { name, email, message, phone });


    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Join Request from ${name}`,
        text: `Name: ${name}
        \nEmail: ${email}
        \nPhone: ${phone}
        \nMessage: ${message}`,
        replyTo: email // Set the reply-to address to the user's email
    };

    try {
        await sendEmail(mailOptions);
        res.status(200).send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

module.exports = router;
