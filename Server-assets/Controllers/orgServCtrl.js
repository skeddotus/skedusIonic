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
          org = new Org({
            name: req.body.name,
            desc: req.body.desc,
            location: req.body.location,
            admin: req.params.userID,
          });
          console.log("Before Org Save, ", req.body);
          org.save();
          user.orgs.push(org._id);
          user.save();
      }
      });
      }
      console.log('After', user);
      res.status(200).end();
    });
},

  getOrgs: function(req, res) {
    Org.find({})
    .populate('appts')
    .populate('admin')
    .exec().then(function(results) {
      return res.json(results);
    }).then(null, function(err) {
      return res.status(500).json(err);
    });
  },
  getOrg: function(req, res) {
    Org.findById(req.params.orgID)
      .populate('appts')
      .populate('admin')
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

    // User.findOne({_id: req.query.id}).exec().then(function(user) {
    //   if(!user) {
    //     res.status(500);
    //   }
    //   else {
    //     for (var i = 0; i < user.roles; i++) {
    //       if(user.roles[i] === 'Admin') {
    //         break;
    //       }
    //       else {
    //         user.roles.push('Admin');
    //       }
    //     }
      //   user.save();
      //   console.log(5555, user);
      //   Org.findOne({_id: req.query.orgId}).exec().then(function(org) {
      //     org.admins.push(user._id);
      //     org.save();
      //     console.log(6666, org);
      //     res.send(org);
      //   });
      // }
    // }).then(null, function(err) {
    //   return res.status(500).json(err);
    // });
  // },
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
