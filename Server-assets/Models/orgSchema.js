var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var User = require('./userSchema');
var Appt = require('./apptSchema');


var orgSchema = new Schema({
  name: {type: String, index: true, required: true},
  admin: [{type: Schema.Types.ObjectId, ref: 'User'}],
  appts: [{type: Schema.Types.ObjectId, ref: 'Appt'}],
  mentors: [{type: Schema.Types.ObjectId, ref: 'User'}],
  mentees: [{type: Schema.Types.ObjectId, ref: 'User'}],
  location: [{type: String}],
  desc: [{type: String}],
  image: [{type: String}],
  socialMedia: [{type: String}],
  status: {
    type: String,
    required: true,
    default: 'Active',
    enum: ['Active', 'Archived', 'Pending']
  }
  });

module.exports = mongoose.model('Org', orgSchema);
