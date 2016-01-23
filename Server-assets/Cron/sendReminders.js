var User = require('../Models/userSchema.js'),
	Appt = require('../Models/userSchema.js'),
	mandrillService = require('../Services/mandrillService');



//sends at midnight
Appt.find({ startsAt : { $lt : (Date.now() + 86400000 )}, status : 'booked' }).exec().then(function(results) {

	for (var i = 0; i < results.length; i++) {
		User.find({ _id : results[i].mentees}).exec().then(function(mentees) {
			for (var k = 0; k < mentees.length; k++) {
				mandrillService.apptRemindMentee(results[i], results[i].host, mentees[k]);
			}
		})
	}

});