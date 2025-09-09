const express = require('express');
const router = express.Router();
const sendEmail = require('../config/nodemailerconfig.js');

const { memberName,
        parentName,
        signature,
        date,
        agree } = req.body;
    console.log('Received data:', { memberName, parentName, signature, date, agree });

router.post('/', async (req, res) => {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Waiver signed by ${memberName}`,
        
        html: `
        <h2>Trial Session Waiver</h2>

        <p><strong>Member’s Name:</strong> ${memberName}</p>
        <p><strong>Parent/Guardian’s Name:</strong> ${parentName}</p>
        <p><strong>Parent/Guardian’s Signature:</strong> ${signature}</p>
        <p><strong>Date Signed:</strong> ${date}</p>
        <hr />

        <p>
            I, the undersigned, hereby acknowledge that I have voluntarily applied to participate,
            or have elected to have my child, or a minor for whom I am responsible (hereinafter “my child”),
            to participate in the programs/sessions directed and taught by Legendary Winter Sports Club.
            By enrolling myself or my child, I represent that I, or my child, is physically fit and able
            to participate in such activities.
        </p>

        <p>
            I am aware that participation in the trial session will involve my/my child’s participation
            in physical activities, and I hereby acknowledge that such activities can be dangerous.
            I hereby accept any risks of injury or death associated with such participation.
        </p>

        <p>
            In consideration of the participation in the Legendary Winter Sports Club trial session,
            I hereby agree that neither I nor my child, nor our respective heirs, guardians, legal representatives,
            or assigns, will make any claims against, sue, or take legal action against Legendary Winter Sports Club
            or any of its officers, directors, agents, employees, or contractors for injury or damage resulting
            from negligence or any other actions, whether caused by an employee, agent, or contractor of Legendary
            Winter Sports Club, arising from my participation, or my child’s participation, in the programs/sessions.
        </p>

        <p>
            I have carefully read this agreement and fully understand and acknowledge its contents. I am aware that
            this is the release of liability and a contract between myself and Legendary Winter Sports Club.
        </p>
    `
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
