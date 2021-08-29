var nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'belayhun24arage@gmail.com',
          pass: 'henonsolomon'
        }
      });
      
      var mailOptions = {
        from: 'belayhun24arage@gmail.com',
        to: 'dessademe16@gmail.com',
        subject: 'Sending email to new user account',
        text: `thank you for signing app`
      };
      


      async function sendEmail(req,res,next){
          console.log("You are about to send email")
       await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              next()
            } else {
              console.log('Email sent: ' + info.response);
              next()
            }
          });
      }




module.exports={sendEmail};