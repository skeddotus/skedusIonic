var mongoose = require('mongoose');
var Appt = require('../Models/apptSchema');

module.exports = {

  addAppt: function(req, res) {
    console.log("appt adding", req.body);
    appt = new Appt({
    	host: req.body.host,
    	date: req.body.date,
    });
    appt.save().then(function() {
    	console.log("addappt saved", req.body);
    	return res.status(201).end();
    })
  },

  getAppts: function(req, res) {
    Appt.find({}).exec().then(function(results) {
      return res.json(results);
    }).then(null, function(err) {
      return res.status(500).json(err);
    });
  },

  getAppt: function(req, res) {
    Appt.findbyId(req.params.id).exec().then(function(results) {
      if(!result) {
        res.status(404);
      }
      else {
        return res.json(results);
      }
    }).then(null, function(err) {
      return res.status(500).json(err);
    });
  },

  updateAppt: function(req, res) {
    Appt.update({_id: req.params.id}, req.body). exec().then(function(result) {
      return res.send('Appt Updated');
    }).then(null, function(err) {
      return res.status(500).json(err);
    });
  },

};
