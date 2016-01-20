var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var User = require('./userSchema');
var Org = require('./orgSchema');

var apptSchema = new Schema({
  org: {type: String, ref: "Org"},
  mentor: {type: String, ref:'User', required: true},
  mentee: {type: String, ref:'User'},
  startsAt: {type: Date},
  endsAt: {type: Date},
  loc: {type: String},
  updates: [{
    message: {type: String},
    updated: {type: Date, default: Date.now}
  }],
  status: {type: String, required: true, default: 'open', enum: ['open', 'booked', 'past', 'completed']},
}, {timestamps: true});

module.exports = mongoose.model('Appt', apptSchema);
