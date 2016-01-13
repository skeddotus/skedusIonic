var express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    userServCtrl = require('./Server-assets/Controllers/userServCtrl.js'),
    orgServCtrl = require('./Server-assets/Controllers/orgServCtrl.js'),
    mongoose = require('mongoose'),
  	passport = require('passport'),
  	port = process.env.PORT || 9001,
  	bodyParser = require('body-parser'),
  	session = require('express-session'),
  	mongoUri = require('./Server-assets/Config/database.js'),
  	Secret = require('./Server-assets/Secrets/secrets.js');

    app.use(cors(), bodyParser.json(), express.static(__dirname + '/Public'));

    //User Requests
    app.post('/api/users', userServCtrl.addUser);
    app.get('/api/users', userServCtrl.getUsers);
    app.get('/api//user/:id', userServCtrl.getUser);
    app.put('/api/user/:id', userServCtrl.updateUser); //Includes archiveUser

    // //Org Request
    app.post('/api/orgs/:userID', orgServCtrl.addOrg);
    app.get('/api/orgs', orgServCtrl.getOrgs);
    app.get('/api/org/:orgID', orgServCtrl.getOrg);
    app.put('/api/org/:orgID', orgServCtrl.updateOrg);
    app.get('/api/org/:orgID/admin/:userID', orgServCtrl.addAdmin);
    // app.put('/api/org/:orgID', orgServCtrl.addMentor);
    // app.put('/api/org/:orgID', orgServCtrl.addMentee);
    // app.put('/api/org/:orgID', orgServCtrl.addAppt);  //Includes archiveOrg

    // //appt
    // app.post('/api/appts', apptServCtrl.addAppt);
    // app.get('/api/appts', apptServCtrl.getAppts);
    // app.get('/api/appt/:id', apptServCtrl.getAppt);
    // app.put('/api/appt/:id', apptServCtrl.updateAppt); //Includes archiveAppt


// required for passport
app.use(session({
	secret: Secret.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//configure passport
require('./Server-assets/Config/passport.js')(passport);

//endpoints/routes
require('./Server-assets/Config/routes.js')(app, passport);

app.listen(port, function() {
	console.log("Listening on port ", port);
});

mongoose.connect(process.env.MONGOLAB_URI || mongoUri.url );
mongoose.connection.once('connected', function() {
  console.log('db connected');
});
