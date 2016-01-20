
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var Appt = require('./apptSchema');
var bcrypt = require('bcrypt');
var q = require('q');

var userSchema = new Schema({
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String, unique: true},
  validatedEmail : {type: String, required: true, default: false},
  password: {type: String},
  linkedinId : String,
  linkedinToken : String,
  linkedinEmail : String,
  linkedinName : String,
  appts: [{type: Schema.Types.ObjectId, ref: 'Appt'}], //appts where you're an attendee
  host: [{type: Schema.Types.ObjectId, ref: 'Appt'}], //appts where you're the host
  desc: {type: String},
  title: {type: String},
  image: {type: String},
  company: {type: String},
  socialMedia: {type: String},
  specialities: {type: String},
  status: {
    type: String,
    required: true,
    default: 'Active',
    enum: ['Active', 'Archived', 'Pending']
  }
},{timestamps: true});


userSchema.methods.validPassword = function(givenPassword) {
	console.log("going to validate password");
	// console.log("this.password", this.password);

	//method 2 (localstrategy)
    var dfd = q.defer();
    bcrypt.compare(givenPassword, this.password, function(err, result) {
        if(result) {
        	console.log("treu");
            dfd.resolve(true);
        }
        else {
        	console.log("false");
            dfd.reject(false);
        }
    });
    return dfd.promise;

    //method 1 (localstrategy)
     // var validPass = bcrypt.compareSync(givenPassword, this.password);
     // console.log('validPass', validPass)
     // return validPass
};

userSchema.pre('save', function(next) {
    // console.log("going to hash password");
    // console.log('this,', this);
   var user = this;
   if (user.isModified('password')) {
     bcrypt.genSalt(12, function(err, salt) {
         bcrypt.hash(user.password, salt, function(err, hash) {
             // console.log("user.password,", user.password);
             // console.log("hash, ", hash);
             user.password = hash;
             // console.log("password hashed");
             next();
         });
     });
   }
   else{
    //  console.log("nothing doing");
     next();
   }

});

module.exports = mongoose.model('User', userSchema);
