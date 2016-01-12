var mongoose = require('mongoose');
var Appt = require('../Models/apptSchema');

module.exports = {

  createAppt: function(req, res) {

    console.log("appt adding", req.body);

    appt = new Appt({
      date: req.body.date,
    });

    User.findOne({_id: req.user._id}).exec().then(function(results) {
      var currentUser = results;
    })

    currentUser.save(function (err) {
      if (err) {
        console.log("problem saving to user");
        return res.status(404).end();
      }

      currentUser.appts.push(appt);

      appt.save(function(err) {
        if (err) {
          console.log("problem saving the appt");
          return res.status(404).end();
        }

        appt.host.push(currentUser);

      })

    })

    return res.json(appt).status(201).end();
  },

  getAppts: function(req, res) {
    Appt.find({}).exec().then(function(results) {
      console.log("getting appts", results);
      return res.json(results);
    }).then(null, function(err) {
      return res.status(500).json(err);
    });
  },

  getAppt: function(req, res) {
    Appt.findOne({_id: req.params.id}).exec().then(function(err, results) {
      if(err) {
        res.status(404).end();
      }
      else {
        return res.json(results);
      }
    })
  },

  // updateAppt: function(req, res) {
  //   Appt.update({_id: req.params.id}, req.body). exec().then(function(result) {




  //     return res.send('Appt Updated');
  //   }).then(null, function(err) {
  //     return res.status(500).json(err);
  //   });
  // },

  updateAppt : function(req, res) {

    Appt.find({_id: req.params.id}, req.body).exec().then(function(result) {





    })

  }














};
