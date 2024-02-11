const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mazzatov005@gmail.com', // Replace with your email
    pass: 'xpxb jrsu vdoz ysbl' // Replace with your password
  }
});

app.post('/submit-form', (req, res) => {
  const formData = req.body;

  if (!formData) {
    return res.status(400).json({ success: false, message: 'Form data is missing.' });
  }

  // Sending email with Nodemailer
  const mailOptions = {
    from: formData.email || 'mazzatov005@gmail.com', // Use the sender's email if provided, otherwise set to your own email
    to: 'mazzatov005@gmail.com, mikewillkraft@gmail.com', // Replace with your email
    subject: 'Form Submission',
    text: `Connection Method: ${formData.connectionMethod}\nData: ${JSON.stringify(formData)}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Error sending email. Please try again later.' });
    }
    
    console.log('Email sent:', info.response);

    // Delay for 2 seconds and then display "Retry again" alert
    setTimeout(function() {
      res.json({ success: true, message: 'Form submitted successfully.' });
    }, 2000);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});