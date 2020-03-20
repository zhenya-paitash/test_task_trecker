const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: process.env.POST_HOST,
    port: process.env.POST_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.POST_USER,
      pass: process.env.POST_PASS
    }
  },
  {from: `Test Task Trecker <${process.env.POST_MAIL}>`,}
);

const mailer = message => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.error(err);

    console.log("Email has been sent: ", info);
  })
};


module.exports = mailer;