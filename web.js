var express = require('express');
var logfmt = require('logfmt');
var app = express();
var moment = require('moment');
var google = require('googleapis');
var calendar = google.calendar('v3');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

var googleToken = process.env.GOOGLE_TOKEN;

app.use(logfmt.requestLogger());

app.get('/auth', function(req, res){
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/calendar'
  });

  res.redirect(url);
});

app.get('/oauth2callback', function(req, res) {
  console.log(req.query["code"]);
  oauth2Client.getToken(req.query["code"], function(err, token) {
    if (err) {
      console.log("error: " + err);
      res.send(500, "Error getting token.");
      return;
    }

    if (!token.refresh_token) {
      oauth2Client.refreshAccessToken(function(err, tokens) {
        console.log(tokens);
      });
    } else {
      console.log(token);
    }
  });
});

app.get('/', function(req, res) {
  if ((req.query.command == '/hangout') && (typeof(req.query.user_name) != 'undefined')) {
    oauth2Client.credentials = {
      access_token: googleToken,
      token_type: 'Bearer'
    };
    var now = moment().format();

    calendar
      .events
      .insert({
        calendarId: 'primary',
        resource: {
          summary: req.query.user_name + '\'s hangout',
          description: 'Hangout started from Slack',
          reminders: {
            overrides: {
              method: 'popup',
              minutes: 0
            }
          },
          start: {
            dateTime: now
          },
          end: {
            dateTime: now
          },
          attendees: []
        },
        auth: oauth2Client
      }, function(err, event) {
        if (event != null) {
          res.send(req.query.user_name + ' invited you to Hangout: ' + event.hangoutLink);
        } else {
          res.status(500).send(err);
        }
      });
  } else {
    res.status(400).send('Invalid parameters');
  }
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log('Listening on ' + port);
});
