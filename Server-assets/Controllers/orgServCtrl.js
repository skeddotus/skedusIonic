var mongoose = require('mongoose');
var Org = require('../Models/orgSchema');

module.exports = {

  addOrg: function(req, res) {
    console.log(11111, req.body);
    Org.findOne({_id: req.body.name}).exec().then(function(org) {
      if(org) {
        return res.status(404).end();
      }
      org = new Org({
        name: req.body.name,
        admin: req.params.id,
        dateCreated: Date.now(),
      });
      console.log("Before Org Save, ", req.body);
      org.save().then(function() {
        console.log("Org Saved", req.body);
        return res.status(201).end();
      });
    });
  },
  getOrgs: function(req, res) {
    Org.find({}).exec().then(function(results) {
      return res.json(results);
    }).then(null, function(err) {
      return res.status(500).json(err);
    });
  },
  getOrg: function(req, res) {

  },
  updateOrg: function(req, res) {

  }

};
