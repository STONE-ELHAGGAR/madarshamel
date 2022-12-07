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
    let btn_link_data = '';
    if(btn_link.length > 0){
      btn_link_data= '<a href="'+btn_link+'" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#ff7d14;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:10px;padding-bottom:10px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:60px;padding-right:60px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;">'+btn_content+'</span></span></a>';
    }
    let mailOptions = {
      from: 'Madarshamel Admin<admin@madarshamel.sa>',
      to: name+'<'+to+'>',
      subject: subject,
      html: mailTempData
                .replace('{btn_link_data}',btn_link_data)
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