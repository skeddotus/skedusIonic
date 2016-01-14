var mongoose = require('mongoose');
var Appt = require('../Models/apptSchema');
var User = require('../Models/userSchema');
var Org = require('../Models/orgSchema');

module.exports = {

  //let a mentor create an appt TEST DONE
  createAppt: function(req, res) {

    appt = new Appt({
      date : req.body.date,
      org : req.params.orgID,
    });

    console.log("appt adding", appt);

    var currentUser;
    var currentOrg;
    
    User.findOne({ _id : "5696c000a5a57cda03af07a8" }).exec().then(function(results) {
    // User.findOne({_id: req.user._id }).exec().then(function(results) {
      currentUser = results;

      currentUser.appts.push(appt._id);
      currentUser.save();

      appt.host = currentUser._id;
      appt.save();

      Org.findOne({ _id : req.params.orgID}).exec().then(function(results) {

        currentOrg = results;

        currentOrg.appts.push(appt._id);
        currentOrg.save();

      })
      

    })

    return res.json(appt).status(201).end();
  },

  //call all appts in organization
  getAppts: function(req, res) {
    //need to update call for specific dates
    Org.findOne({ _id : req.params.orgID }).exec().then(function(results) {
      console.log("appts from org: ", results.appts);

      return res.json(results.appts);
    }).then(null, function(err) {
      return res.status(500).json(err);
    });
  },

  //call a specific appt
  getAppt: function(req, res) {

    Appt.findOne({_id: req.params.apptID}).exec().then(function(err, results) {
      if(err) {
        res.status(404).end();
      }
      else {
        return res.json(results);
      }
    })
  },

  deleteAppt: function(req,res) {

  },

  //add an attendee to an appointment
  addAttendee : function(req, res) {

    var currentUser = req.user._id;
    var currentAppt = req.params.apptID;

    Appt.find({ _id : currentAppt }).exec().then(function(results) {

      console.log("adding attendee. appointment : ", results);
      var attendeesArray = results.attendees;
      attendeesArray.push(currentUser);

      Appt.update({ _id : currentAppt }, { attendees : attendeesArray }, { status : 'booked' }).exec();

      User.find({ _id : currentUser }).exec().then(function(results) {

        console.log("adding attendee. User : ", results);

        var apptArray = results.appts;
        apptArray.push(currentAppt);

        User.update({ _id : currentUser }, { appts : apptArray }).exec();

      })

      return res.status(204).end();

    })

  },

  //remove an attendee from an appointment, ONLY from attendees POV
  deleteAttendee : function(req, res) {

    var currentUser = req.user._id;
    var currentAppt = req.params.apptID;

    Appt.find({ _id : currentAppt }).exec().then(function(results) {
      console.log("deleteAttendee. deleting from appt : ", results);

      var attendeesArray = results.attendess;

      var index = attendeesArray.indexOf(currentUser);
      attendeesArray.splice(index, 1);
      if(attendeesArray.length === 0) {
        results.status = 'open';
      }

      Appt.update({ _id : currentAppt }, { attendees : attendesArray }).exec();

      User.find({ _id: currentUser }).exec().then(function(results) {
        console.log("deleteAttendee. deleting from user : ", results);

        var apptArray = results.appts;

        index = apptArray.indexOf(currentAppt);
        apptArray.splice(index, 1);

        User.update({ _id : currentUser }, { appts : apptArray}).exec();

      })

      console.log("attendee deleted from appointment");
      return res.status(200).end();

    })

  },

  //update appt: location and update sections of schema
  updateAppt : function(req,res) {

    var currentAppt = req.params.apptID;

    Appt.update({ _id: currentAppt }, req.body).exec().then(function(result) {
      console.log("app updated : ", result);
      return res.status(200).end();
    })

  },


};
