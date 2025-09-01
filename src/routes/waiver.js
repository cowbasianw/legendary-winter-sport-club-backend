// routes/waiver.js
const express = require('express');
const router = express.Router();
const sendEmail = require('../config/nodemailerconfig.js'); // same function as join route

router.post('/', async (req, res) => {
    const { memberName, parentName, parentSignature, date } = req.body;

    // Validate required fields
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

    try {
        await sendEmail(mailOptions); // async/await ensures errors are caught
        res.status(200).json({ message: 'Waiver submitted successfully' });
    } catch (error) {
        console.error('Error sending waiver email:', error);
        res.status(500).json({ error: 'Failed to send waiver email' });
    }
});

module.exports = router;
