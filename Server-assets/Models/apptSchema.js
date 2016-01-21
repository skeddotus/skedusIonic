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
  title: {type: String},
  loc: {type: String},
  type: {type: String, default: "info", enum: ['info', 'important', 'warning', 'inverse', 'success', 'special']}, // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
  editable: {type: Boolean, default: false}, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
  deletable: {type: Boolean, default: false}, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
  draggable: {type: Boolean, default: false}, //Allow an event to be dragged and dropped
  resizable: {type: Boolean, default: false}, //Allow an event to be resizable
  updates: [{
    message: {type: String},
    updated: {type: Date, default: Date.now}
  }],
  status: {type: String, required: true, default: 'open', enum: ['open', 'booked', 'past', 'completed']},
}, {timestamps: true});

module.exports = mongoose.model('Appt', apptSchema);
