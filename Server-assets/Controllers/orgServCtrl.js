var mongoose = require('mongoose');
var Org = require('../Models/orgSchema');
var User = require('../Models/userSchema');

module.exports = {

  addOrg: function(req, res) {
    console.log(11111, req.body);
    Org.findOne({name: req.body.name}).exec().then(function(org) {
      if(org) {
        return res.status(404).end();
      }
      org = new Org({
        name: req.body.name,
        admin: req.params.userID,
      });
      console.log("Before Org Save, ", req.body);
      org.save().then(function() {
        console.log("Org Saved", req.body);
        return res.status(201).end();
      });
    });
  },
  getOrgs: function(req, res) {
    Org.find({})
    .populate('admin')
    .exec().then(function(results) {
      return res.json(results);
    }).then(null, function(err) {
      return res.status(500).json(err);
    });
  },
  getOrg: function(req, res) {
    Org.findById(req.params.orgID)
      .exec()
      .then(function(results) {
      if(!results) {
        res.status(404);
      }
      else {
      return res.json(results);
      }
    }).then(null, function(err) {
      return res.status(500).json(err);
    });
  },
  addAdmin: function(req, res) {
    console.log("Adding Admin", req.body);
    console.log("Adding Admin", req.query);
    User.findOne({_id: req.query.id}).exec().then(function(user) {
      if(!user) {
        res.status(500);
      }
      else {
        for (var i = 0; i < user.roles; i++) {
          if(user.roles[i] === 'Admin') {
            break;
          }
          else {
            user.roles.push('Admin');
          }
        }
        user.save();
        console.log(5555, user);
        Org.findOne({_id: req.query.orgId}).exec().then(function(org) {
          org.admins.push(user._id);
          org.save();
          console.log(6666, org);
          res.send(org);
        });
      }
    }).then(null, function(err) {
      return res.status(500).json(err);
    });
  },
  // addMentor: function(req, res) {
  //
  // },
  // addMentee: function(req, res) {
  //
  // },
  // addAppt: function(req, res) {
  //
  // },
  updateOrg: function(req, res) {
    Org.update({_id: req.params.orgID}, req.body).exec().then(function(results) {
      return res.send('Organization Updated');
    }).then(null, function(err) {
      return res.status(500).json(err);
    });
  }

};
