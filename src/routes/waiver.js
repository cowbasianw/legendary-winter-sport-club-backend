const express = require('express');
const router = express.Router();
const transporter = require('../config/nodemailerconfig.js');

// POST /api/waiver
router.post('/', (req, res) => {
    const { memberName, parentName, parentSignature, date } = req.body;

    if (!memberName || !parentName || !parentSignature || !date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // your email address
        subject: `Trail Session Waiver Submission - ${memberName}`,
        text: `
Trail Session Waiver Details:

Member's Name: ${memberName}
Parent/Guardian's Name: ${parentName}
Parent/Guardian's Signature: ${parentSignature}
Date: ${date}
    `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending waiver email:', error);
            return res.status(500).json({ error: 'Failed to send waiver email' });
        }
        res.status(200).json({ message: 'Waiver submitted successfully', info });
    });
});

module.exports = router;
