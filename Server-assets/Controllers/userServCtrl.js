var mongoose = require('mongoose');
var User = require('../Models/userSchema');

module.exports = {

  addUser: function(req, res) {
    console.log("addadd", req.body);
    User.findOne({ email: req.body.email }).exec().then(function(user) {
      if (user) {
        return res.status(409).end();
      }
      user = new User({
        email: req.body.email,
        password:req.body.password,
        name: req.body.name,
      });
      console.log("adduser userservctrl, ", req.body);
      user.save().then(function() {
        console.log("adduser userservctrl after saving", req.body);
        return res.status(201).end();
      });
    });
  },
  getUsers: function(req, res) {
    User.find({})
      .populate("orgs")
      .populate("appts")
      .exec().then(function(results) {
        return res.json(results);
      }).then(null, function(err) {
        return res.status(500).json(err);
      });
  },
  getUser: function(req, res) {
    User.findById(req.params.id)
      .populate("orgs")
      .populate("appts")
      .exec().then(function(results) {
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

  updateUser: function(req, res) {
    User.update({_id: req.params.id}, req.body). exec().then(function(result) {
      return res.send('User Updated');
    }).then(null, function(err) {
      return res.status(500).json(err);
    });
  }


};
