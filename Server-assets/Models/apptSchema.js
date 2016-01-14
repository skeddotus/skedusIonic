var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var User = require('./userSchema');
var Org = require('./orgSchema');

var apptSchema = new Schema({
  host: {type: Schema.Types.ObjectId, ref:'User', required: true},
  // host: {type: String, required: true},
  attendees: [{type: Schema.Types.ObjectId, ref:'User'}],
  // date: {type: Date, default: Date.now, required: true},
  date: String,
  org: {type: Schema.Types.ObjectId, ref: 'Org'},
  location: {type: String},
  updates: [{type: String}],
  status: {
    type: String,
    required: true,
    default: 'open',
    enum: ['open', 'past', 'booked' ]
  },
  intStatus: {
    type: String,
    require: true,
    default: 'active',
    enum: ['active', 'archived'],
  },
}, {timestamps: true});

module.exports = mongoose.model('Appt', apptSchema);
