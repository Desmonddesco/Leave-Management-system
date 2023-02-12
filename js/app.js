// Google api console clientID and apiKey 
var clientId = '85605634322-gkqtsju7eishgf8cvof9kf0jgsuk1jed.apps.googleusercontent.com';
var apiKey = 'AIzaSyB2K3gG5RTCKoHzAK24nrgeV3Lw17Ya3so';

// enter the scope of current project (this API must be turned on in the Google console)
  var scopes = 'https://www.googleapis.com/auth/calendar';


// OAuth2 functions
    function handleClientLoad() {
          gapi.client.setApiKey(apiKey);
          window.setTimeout(checkAuth, 1);
       }

//To authenticate
 function checkAuth() {
   gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: true }, handleAuthResult);
       }

// This is the resource we will pass while calling api function

var startleave = document.getElementById("startdate").value;
var lastleave = document.getElementById("lastdate").value;
 var resource = {
    
           "summary": "My Event",
           "start": {
               "dateTime": startleave
           },
           "end": {
               "dateTime": lastleave
           },
           "description":"We are organizing events",
           "location":"South Africa",
           "attendees":[
           {
                   "email":"mushiana.desmond@gmail.com",
                   "displayName":"Desmond",
                   "organizer":true,
                   "self":false,
                   "resource":false,
                   "optional":false,
                   "responseStatus":"needsAction",
                   "comment":"This is my demo event",
                   "additionalGuests":3
                   
           },
           {    
               "email":"mushiana.phumudzo@.com",
                   "displayName":"phumudzo",
                   "organizer":true,
                   "self":false,
                   "resource":false,
                   "optional":false,
                   "responseStatus":"needsAction",
                   "comment":"This is an official event",
                   "additionalGuests":3
           }
           ],
       };


function makeApiCall() {
var eventResponse = document.getElementById('event-response');

gapi.client.load('calendar', 'v3', function () {					// load the calendar api (version 3)
    var request = gapi.client.calendar.events.insert
    ({
        'calendarId': '09eb531b634f8c82bbe3c870817984dd61b002f932a04560e1fbd60c40062b9d@group.calendar.google.com', 
        "resource": resource							// pass event details with api call
    });
    
    // handle the response from our api call
    request.execute(function (resp) {
        if (resp.status == 'confirmed') {
            eventResponse.innerHTML = "Event created successfully. View it <a href='" + resp.htmlLink + "'>online here</a>.";
            eventResponse.className += ' panel-success';
            refreshICalendarframe();
        } else {
            document.getElementById('event-response').innerHTML = "There was a problem. Reload page and try again.";
            eventResponse.className += ' panel-danger';
        }
    });
});
}