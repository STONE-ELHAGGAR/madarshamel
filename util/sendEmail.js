const nodemailer = require('nodemailer');
const fs = require('fs');

const sendEmail = async (to ='',name = '',subject = '',btn_link = '',btn_content = '',temp_line1 = '',temp_line2 = '',temp_line3 = '',temp_line4 = '') => {
    let mailTempData = await fs.readFileSync('./util/mail.html', 'utf8');
    let transporter = nodemailer.createTransport({
      host: "mail.madarshamel.sa",
      port: 587,
      auth: {
        user: 'admin@madarshamel.sa',
        pass: 'Ilsaaintf4;',
      },
      tls: {
          rejectUnauthorized: true,
          minVersion: "TLSv1.2"
      }
  });
    
    let mailOptions = {
      from: 'Madarshamel Admin<admin@madarshamel.sa>',
      to: name+'<'+to+'>',
      subject: subject,
      html: mailTempData
                .replace('{btn_link}',btn_link)
                .replace('{btn_link_comm}',btn_link)
                .replace('{btn_content}',btn_content)
                .replace('{temp_line1}',temp_line1)
                .replace('{temp_line2}',temp_line2)
                .replace('{temp_line3}',temp_line3)
                .replace('{temp_line4}',temp_line4)
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        return true;
      } else {
        console.log('Email sent: ' + info.response);
        return true;
      }
    });
}

module.exports = sendEmail;