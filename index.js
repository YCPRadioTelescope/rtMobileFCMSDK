var admin = require("firebase-admin");
var config = require('./config.json');


var serviceAccount = require("./rtmobile-7");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.databaseURL
});

/*
var app = admin.initializeApp();*/

// This registration token comes from the client FCM SDKs.
var registrationToken = config.registrationToken;

var message = {
  notification: {
    title: 'YCAS Radio Telescope',
    body: 'Weather has exceeded threshold!!! IMMEDIATE ACTION is required!'
  },
  token: registrationToken
};


// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
    process.exit(-1)
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
