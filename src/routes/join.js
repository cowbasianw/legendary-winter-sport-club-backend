const express = require('express');
const router = express.Router();
const transporter = require('../config/nodemailerconfig.js');

router.post('/', (req, res) => {
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

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

module.exports = router;
