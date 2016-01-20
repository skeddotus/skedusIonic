var Secret = require('../Secrets/secrets.js');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(Secret.MANDRILL_API_KEY);
var moment = require('moment');


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

  sendEmail : function(message) {
      mandrill_client.messages.send({"message": message}, function(result) {
        console.log(result);
      }, function(e) {
        console.log('A mandrill error occurred' + e.name + ' - ' + e.message);
      });
  },

};
