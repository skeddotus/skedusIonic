var Secret = require('../Secrets/secrets.js');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(Secret.MANDRILL_API_KEY);
var moment = require('moment');
var async = require('async');


module.exports = {

emailVerify : function(user) {
  console.log("Mandrill", user);
  var message = {
    "html": "",
    "text": "Please verify your email address by clicking the following link localhost:9001/api/user/email/validation/"+ user._id,
    "subject": "Sked Email Verification",
    "from_email": "info@sked.us",
    "from_name": "no_reply@sked",
    "to": [{
            "email": user.email,
            "name": user.name,
            "type": "to"
        }],
    "important": true,
    "auto_text": true,
    "auto_html": true,
    "recipient_metadata": [{
            "rcpt": user.email,
            "values": {
                "user_id": user._id
            }
        }],
    "async" : false,
    "send_at": user.createdAt
    };

  this.sendEmail(message);
},

forgotPass : function(req, token, user) {
  console.log("Sending forgot Password email", req.headers, token, user);
  var message = { "html": "",
      "text": 'You are receiving this because you (or someone else) has requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      'http://' + req.headers.host + '/reset/' + token + '\n\n' +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      "subject": "Sked Email Verification",
      "from_email": "info@sked.us",
      "from_name": "no_reply@sked",
      "to": [{
              "email": user.email,
              "name": user.name,
              "type": "to"
          }],
      "important": true,
      "auto_html": true,
      "recipient_metadata": [{
              "rcpt": user.email,
              "values": {
                  "user_id": user._id
              }
          }],
          "send_at": user.createdAt
    };
    this.sendEmail(message);
},

passChangeConfirm : function(user) {
  console.log("sending password reset email", user);
  var message = { "html": "",
    "text": 'Hello,\n\n' +
      'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n',
    "subject": "Sked Email Verification",
    "from_email": "info@sked.us",
    "from_name": "no_reply@sked",
    "to": [{
            "email": user.email,
            "name": user.name,
            "type": "to"
        }],
    "important": true,
    "auto_html": true,
    "recipient_metadata": [{
            "rcpt": user.email,
            "values": {
                "user_id": user._id
            }
        }],

  };
  this.sendEmail(message);
},

// apptConfirm : function(user) {
//   console.log("Mandrill", user, appt);
//   var message = {
//     "html": "",
//     "text": "Your meeting has been booked for ",
//     "subject": "Sked Meeting Booked",
//     "from_email": "info@sked.us",
//     "from_name": "Sked Reminders",
//     "to": [{
//             "email": user.email,
//             "name": user.name,
//             "type": "to"
//         }],
//     "important": true,
//     "auto_text": true,
//     "auto_html": true,
//     "recipient_metadata": [{
//             "rcpt": user.email,
//             "values": {
//                 "user_id": user._id
//             }
//         }],
//     "async" : false,
//     "send_at": user.createdAt
//     };
//
//   this.sendEmail(message);
// },

sendEmail : function(message) {
    mandrill_client.messages.send({"message": message, "async": async}, function(result) {
      console.log(result);
    }, function(e) {
      console.log('A mandrill error occurred' + e.name + ' - ' + e.message);
    });
  },

};
