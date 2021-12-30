/* eslint-disable no-console */
const nodemailer = require('nodemailer');
// email sender function
exports.sendEmail = (user, order) => {
  // Definimos el transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'kenyon.price7@ethereal.email',
      pass: 'b46Rr5MJTMAbKsvEHj',
    },
  });
  // Definimos el email
  const mailOptions = {
    from: '"E-commerce platform 👻" <kenyon.price7@ethereal.email>', // sender address
    to: user.email,
    subject: 'Order submitted ✔',
    text: JSON.stringify(order) + JSON.stringify(user),
    html: '<b>Your order is on its way!</b>',
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent');
    }
  });
};
