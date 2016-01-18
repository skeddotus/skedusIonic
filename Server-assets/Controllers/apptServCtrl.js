var mongoose = require('mongoose');
var Appt = require('../Models/apptSchema');
var User = require('../Models/userSchema');
var Org = require('../Models/orgSchema');

module.exports = {


  //  api/apt/:orgID/:userID // POST
  createAppt: function(req, res) {
    var apt = new Appt(req.body);
    apt.save().then(function(err, results){
      return res.status(201).end();
    });
  }, 

  //  api/apt/:orgID/:userID // PUT
  addApptToOrg: function(req, res){
    Org.findOne({_id: req.params.orgID}).exec().then(function(org){
      org.apts.push(req.body);
      return org.save().then(function(results){
        return res.json(results)
      })
    })
  },

// api/apt/:orgID/:userID/open // GET
  getMyOpenAppts: function(req, res){
    Appt.find({mentor: req.params.userID}).find({org: req.params.orgID}).find({status: "open"}).sort({startTime: 1}).exec().then(function(results){
      res.json(results);
    })
  },

// api/apt/:orgID/mentor/:userID/booked // GET
  getMyMentorBookedAppts: function(req, res){
    Appt.find({mentor: req.params.userID}).find({org: req.params.orgID}).find({status: "booked"}).sort({startTime: 1}).exec().then(function(results){
      res.json(results);
    });
  },

  // api/apt/:userID/booked // GET
  getMyMenteeBookedAppts: function(req, res){
    Appt.find({mentee: req.params.userID}).sort({startTime: 1}).populate("org").populate("mentor").exec().then(function(results){
      res.json(results);
    });
  },

// api/apt/:orgID/open // GET
  getOrgOpenAppts: function(req, res){
    Appt.find({org: req.params.orgID}).find({status: "open"}).sort({startTime: 1}).populate("mentor").exec().then(function(results){
      res.json(results);
    })
  },

// api/apt/:aptID // PUT
  skedApt: function(req, res){
    Appt.update({_id: req.params.aptID}, req.body).then(function(){
      res.status(200).end();
    });
  },

// api/apt/cancel/:aptID // PUT
  aptCancel: function(req, res){
    console.log("got to server");
    console.log("aptID: ", req.params.aptID);
    Appt.update({_id: req.params.aptID}, req.body).then(function(){
      res.status(201).end();
    });
  },





  //call all appts in organization TEST DO
  getAppts: function(req, res) {
    //need to update call for specific dates ///////////////////////////////////////////////////////////////////
    Org.findOne({ _id : req.params.orgID }).populate("host").exec().then(function(results) {
      console.log("appts from org: ", results.appts);

      return res.json(results.appts);
    }).then(null, function(err) {
      return res.status(500).json(err);
    });
  },

  //call a specific appt TEST DONE
  getAppt: function(req, res) {

    Appt.findOne({_id: req.params.apptID}).exec().then(function(results) {
      if(results) {
        console.log("appt : ", results);
        return res.json(results);
      }
      else {
        res.status(404).end();
      }
    })
  },

  //delete appointment, not the same as cancelling TEST DONE
  deleteAppt: function(req,res) {
    console.log("DELETE PROCESS START");


    Appt.findOne({ _id : req.params.apptID }).exec().then(function(results) {

      var currentAppt = results;
      // console.log("appt found : ", currentAppt);

      Org.findOne({ _id : currentAppt.org }).exec().then(function(results) {


        var currentOrg = results;
        // console.log("ORG BEFORE : ", currentOrg);
        var orgIndex = currentOrg.appts.indexOf(req.params.apptID);
        currentOrg.appts.splice(orgIndex, 1);
        // console.log("ORG AFTER : ", currentOrg);
        currentOrg.save();

        User.findOne({ _id : currentAppt.host }).exec().then(function(results) {

          var currentHost = results;
          // console.log("HOST BEFORE: ", currentHost);
          var hostIndex = currentHost.host.indexOf(req.params.apptID);
          currentHost.host.splice(hostIndex, 1);
          // console.log("HOST AFTER : ", currentHost);
          currentHost.save();


          for (var i = 0; i < currentAppt.attendees; i++) {

            User.findOne({ _id : currentAppt.attendees[i] }).exec().then(function(results) {
              
              var currentUser = results;
              // console.log("USER BEFORE : ", currentUser);
              var userIndex = currentUser.appts.indexOf(req.params.apptId);
              currentUser.appts.splice(userIndex, 1);
              // console.log("USER AFTER : ", currentUser);
              currentUser.save();

            })

          }
          

          Appt.remove({ _id : req.params.apptID }).exec();

          console.log("app deleted");
          return res.status(204).end()

        })

      })

    })
    
  },

  //add an attendee to an appointment TEST DONE
  addAttendee : function(req, res) { 

    var currentAppt = req.params.apptID;
    // var currentUser = req.user._id;
    var currentUser = "5696bfa5ac8f7eeb0aba1a10"; /////////////////////////////////////////////////////
    

    Appt.findOne({ _id : currentAppt }).exec().then(function(results) {

      var attendeesArray = results.attendees;
      // console.log("adding attendee.  BEFORE : ", attendeesArray);
      attendeesArray.push(currentUser);
      // console.log("adding attendee.  AFTER : ", attendeesArray);

      Appt.update({ _id : currentAppt }, { attendees : attendeesArray }, { status : 'booked' }).exec();


      User.findOne({ _id : currentUser }).exec().then(function(results) {

        // console.log("adding appointment. USER BEFORE : ", results);

        var apptArray = results.appts;
        apptArray.push(currentAppt);

        User.update({ _id : currentUser }, { appts : apptArray }).exec();

      })

      return res.status(204).end();

    })

  },

  //remove an attendee from an appointment, ONLY from attendees POV, TEST DONE
  deleteAttendee : function(req, res) {

    var currentAppt = req.params.apptID;
    // var currentUser = req.user._id;
    var currentUser = "5696bfa5ac8f7eeb0aba1a10"; /////////////////////////////////////////////////////

    Appt.findOne({ _id : currentAppt }).exec().then(function(results) {

      var appt = results;
      console.log("deleteAttendee. APPT BEFORE : ", appt);

      var index = appt.attendees.indexOf(currentUser);
      appt.attendees.splice(index, 1);
      if(appt.attendees.length === 0) {
        appt.status = 'open';
      }
      console.log("delete Attendee. APPT AFTER : ", appt);

      Appt.update({ _id : currentAppt }, appt).exec();

      User.findOne({ _id: currentUser }).exec().then(function(results) {

        var user = results
        console.log("deleteAttendee. USER BEFORE : ", user);

        index = user.appts.indexOf(currentAppt);
        user.appts.splice(index, 1);

        console.log("delete Attendee. USER AFTER : ", user);

        User.update({ _id : currentUser }, user).exec();

      })

      console.log("attendee deleted from appointment");
      return res.status(200).end();

    })

  },

  //update appt: location and update sections of schema, cancelling TEST DONE
  updateAppt : function(req,res) {

    var currentAppt = req.params.apptID;

    Appt.update({ _id: currentAppt }, req.body).exec().then(function(result) {
      console.log("app updated : ", result);
      return res.status(200).end();
    })

  },


};
