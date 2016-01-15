var mongoose = require('mongoose');
var Org = require('../Models/orgSchema');
var User = require('../Models/userSchema');

module.exports = {

  /* addOrg checks creators userID to see if it exists. If yes, then the function
  moves onto check whether if the Organzation name submitted is an original,
  if yes, then an Organization is created with the desired inputs from the user
  and the user's ID and role is set to a members property before the org is saved to the database */
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

  //gets Organizations for users not associated with an organization yet
  getOrgs: function(req, res) {
    Org.find({})
    .exec().then(function(results) {
      return res.json(results);
    }).then(null, function(err) {
      return res.status(500).json(err);
    });
  },

  //gets an Organization for users not associated with an organization yet
  getOrg: function(req, res) {
    Org.findById(req.params.orgID).exec().then(function(results) {
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

  //This function allows the addition of another admin to an organization
  // addAdmin: function(req, res) {
  //   Org.findById(req.params.orgID).populate('admin').exec().then(function(result) {
  //     if(!result) {
  //       res.status(404);
  //     }
  //     else {
  //       var ary = result.admin;
  //       for (var i = 0; i < ary.length; i++) {
  //         if(ary[i]._id == req.body._id)  {
  //           return res.status(500).end();
  //         }
  //         else {
  //         ary.push(req.body._id);
  //         User.findById(req.body._id).exec().then(function(user){
  //           user.roles.push('Admin');
  //         });
  //         }
  //       }
  //       Org.save();
  //       console.log(10101, Org);
  //       res.send(Org).end();
  //     }
  //   });
  // },

  //This allows for organization properties like description, location, name, etc. to be changed
  updateOrg: function(req, res) {
    Org.update({_id: req.params.orgID}, req.body).exec().then(function(results) {
      return res.send('Organization Updated');
    }).then(null, function(err) {
      return res.status(500).json(err);
    });
  },

  // app.get('/api/org/:orgID', orgServCtrl.addOrgUser);
  addOrgUser: function(req, res) {
    console.log(3, req.params);
    console.log(4, req.body);
    Org.findById({_id: req.params.orgID}).exec().then(function(results) {
      if(!results) {
        res.status(404);
      }
      else {
        var members = results.members;
        var userExists;
        console.log(5, members);
        console.log(6, req.body);
        for(var i = 0; i < members.length; i++) {
          if(members[i].userid === req.body.userid){
            console.log(7, members[i].userid);
            console.log(8, req.body.userid);
            userExists = true;
            break;
          }
          else{
              console.log(9, "Here");
              userExists = false;
          }
        }

        if(userExists === true) {
            console.log(10, "Here");
          return res.send("User already in Org!").end();
        }
        else if (userExists === false) {
          members.push(req.body);
          console.log(11, members);
          Org.save();
        }
      }
    console.log('Updated Org', Org);
    return res.send("Org User Added", Org).end();
    });
  }







};
