var mongoose = require('mongoose');
var Org = require('../Models/orgSchema');
var User = require('../Models/userSchema');

module.exports = {

  addOrg: function(req, res) {
    console.log(11111, req.body);
    console.log(2222, req.params.userID);
    User.findById(req.params.userID).exec().then(function(user) {
      if (!user) {
        return res.status(500).end();
      }
      else {
        Org.findOne({name: req.body.name}).exec().then(function(org) {
          if(org) {
            return res.status(500).end();
          }
          else {
            console.log("req.params.id", req.params.id);
          org = new Org({
            name: req.body.name,
            desc: req.body.desc,
            location: req.body.location,
            members: [{userid: req.params.userID, role: 'Admin'}]
          });
          console.log("Before Org Save, ", req.body);
          org.save();
      }
      });
      }
      console.log('After', user);
      res.status(200).end();
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
    Org.findById(req.params.orgID).populate('admin').exec().then(function(result) {
      if(!result) {
        res.status(404);
      }
      else {
        var ary = result.admin;
        for (var i = 0; i < ary.length; i++) {
          if(ary[i]._id == req.body._id)  {
            return res.status(500).end();
          }
          else {
          ary.push(req.body._id);
          User.findById(req.body._id).exec().then(function(user){
            user.roles.push('Admin');
          });
          }
        }
        Org.save();
        console.log(10101, Org);
        res.send(Org).end();
      }
    });
},

getUserOrgs: function(req, res) {
  Org.find({}).exec().then(function(results) {
    console.log(results);
      console.log(results[14].members);
        console.log(results[14].members[0].userid);
    var userOrgs = [];
    var ary =[];
    for (var i = 0; i < results.length; i++) {
      ary = results[i].members;
      console.log(ary);
        for (var j = 0; j < ary.length; j++) {
          console.log(ary);
          console.log(ary[j]);
          console.log(ary[j].userid);
          if(ary[j].userid === req.params.id) {
            userOrgs.push(results[i]);
          }
      }
  }
    console.log("suloii");
    return res.send(userOrgs);
  });
},

  getOrgbyUserId: function(req, res) {
    Org.find({}).exec().then(function(results) {
      var userRole = "";
      var ary =[];
      for (var i = 0; i < results.length; i++) {
        ary = results[i].members;
          for (var j = 0; j < ary.length; j++) {
            if(ary[j].userid === req.params.id) {
              userRole = ary[j].role;
            }
            else {
              userRole = "User";
            }
        }
    }
      return res.send(userRole);
    });
  },


  updateOrg: function(req, res) {
    Org.update({_id: req.params.orgID}, req.body).exec().then(function(results) {
      return res.send('Organization Updated');
    }).then(null, function(err) {
      return res.status(500).json(err);
    });
  }

};
