var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var User = require('./userSchema');
var Org = require('./orgSchema');

var apptSchema = new Schema({
  host: [{type: Schema.Types.ObjectId,ref:'User', required: true}],
  attendee: [{type: Schema.Types.ObjectId,ref:'User', required: true}],
  date: {type: Date, default: Date.now, required: true},
  location: {type: String},
  updates: [{type: String}],
  status: {
    type: String,
    required: true,
    default: 'open',
    enum: ['open', 'past', 'booked', ]
  },
  intStatus: {
    type: String,
    require: true,
    default: 'active',
    enum: ['active', 'archived'],
  },
});

module.exports = mongoose.model('Appt', apptSchema);
