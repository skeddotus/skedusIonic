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
	.populate('admin')
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

  //This allows for organization properties like description, location, name, etc. to be changed
  updateOrg: function(req, res) {
    Org.update({_id: req.params.orgID}, req.body).exec().then(function(results) {
      return res.send('Organization Updated');
    }).then(null, function(err) {
      return res.status(500).json(err);
    });
  },

  addOrgUser: function(req, res) {
    Org.findById({_id: req.params.orgID}).exec().then(function(org) {
      if(!org) {
        res.status(404);
      }
      else {
        var members = org.members;
        var userExists;
        for(var i = 0; i < members.length; i++) {
          if(members[i].userid === req.body.userid){
            userExists = true;
            break;
          }
          else{
              userExists = false;
          }
        }
        if(userExists === true) {
          return res.send("User already in Org!").end();
        }
        else if (userExists === false) {
          members.push(req.body);
          org.save();
        }
      }
    console.log('Added User to Org', org);
    return res.status(200).end();
    });
  },

  // //Could just make a changeRole function that updates role based on req.body
  // addOrgMentor: function(req, res) {
  //   Org.findById({_id: req.params.orgID}).exec().then(function(org) {
  //     if(!org) {
  //       res.status(404);
  //     }
  //     else {
  //       var members = org.members;
  //       for(var i = 0; i < members.length; i++) {
  //         if(members[i].userid === req.body.userid && members[i].role === "Mentor"){
  //           console.log("User is already a Mentor!");
  //           return res.status(500).end();
  //         }
  //         else if(members[i].userid === req.body.userid && members[i].role !== "Mentor"){
  //           members[i].role = "Mentor";
  //           break;
  //         }
  //       }
  //       org.save();
  //     }
  //   console.log('Added Mentor to Org', org);
  //   return res.status(200).end();
  //   });
  // },

  //This function allows the addition of another admin to an organization
  // addOrgAdmin: function(req, res) {
  //   Org.findById({_id: req.params.orgID}).exec().then(function(org) {
  //     if(!org) {
  //       res.status(404);
  //     }
  //     else {
  //       var members = org.members;
  //       for(var i = 0; i < members.length; i++) {
  //         if(members[i].userid === req.body.userid && members[i].role === "Admin"){
  //           console.log("User is already a Admin!");
  //           return res.status(500).end();
  //         }
  //         else if(members[i].userid === req.body.userid && members[i].role !== "Admin"){
  //           members[i].role = "Admin";
  //           break;
  //         }
  //       }
  //       org.save();
  //     }
  //   console.log('Added Admin to Org', org);
  //   return res.status(200).end();
  //   });
  // },
  //
  // removeOrgUser: function(req, res) {
  //   Org.findById({_id: req.params.orgID}).exec().then(function(org) {
  //     if(!org) {
  //       res.status(404);
  //     }
  //     else {
  //       var members = org.members;
  //       var userExists;
  //       for(var i = 0; i < members.length; i++) {
  //         if(members[i].userid === req.body.userid){
  //           userExists = true;
  //           break;
  //         }
  //         else{
  //             userExists = false;
  //         }
  //       }
  //       if(userExists === true) {
  //         members.splice(i, 1);
  //         org.save();
  //       }
  //       else if (userExists === false) {
  //         return res.send("User not in Org!").end();
  //       }
  //     }
  //   console.log('Removed User from Org', org);
  //   return res.status(200).end();
  //   });
  // },

//If this works then cleaner than other
  changeOrgRole: function(req, res) {
    Org.findById({_id: req.params.orgID}).exec().then(function(org) {
      if(!org) {
        res.status(404);
      }
      else {
        var members = org.members;
        var userExists;
        for(var i = 0; i < members.length; i++) {
          if(members[i].userid === req.body.userid){
            userExists = true;
            break;
          }
          else{
              userExists = false;
          }
        }
        if(userExists === true) {
          members[i].role = req.body.role;
        }
        else if (userExists === false) {
          console.log("User not in Org!");
          return res.status(404).end();
        }
      }
    org.save();
    console.log('Changed User Role', org);
    return res.status(200).end();
  });
  },














};
