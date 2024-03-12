const nodemailer = require('nodemailer');
/*
const SendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {
console.log(EmailTo)
console.log(EmailText)
console.log(EmailSubject)
    let transporter = nodemailer.createTransport({
        host: 'mail.teamrabbil.com',
        port: 25,
        secure: false,
        auth: {
            user: "info@teamrabbil.com",
            pass: '~sR4[bhaC[Qs'
        },tls: {
            rejectUnauthorized: false
        },
    });

    let mailOptions = {
        from: 'Task Manager MERN <info@teamrabbil.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    return  await transporter.sendMail(mailOptions)
}
module.exports=SendEmailUtility

*/


const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "printrb72@gmail.com",
        pass: "aclj mzdo lgwr wfef",
      },
    });
  
    let mailOption = {
      from: "Task Manager application <ramentusuka@gmail.com>",
      to: EmailTo,
      subject: EmailSubject,
      html: `<h1>${EmailText}</h1>`,
    };
  
    return await transporter.sendMail(mailOption);
  };
  module.exports = SendEmailUtility;