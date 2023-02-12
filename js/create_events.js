

// Global variables, the values come from the Developer Console
// Put your OWN clientID and apiKey
var clientId = '375811672559-g18sb58l1rbeml4hagglulh8695cnd8p.apps.googleusercontent.com';
var apiKey = 'AIzaSyCRopwVDEuITZaj-Xo_lQMVTN964fQZ72o';
var scopes = 'https://www.googleapis.com/auth/calendar';
      
      
/* Function invoked when the client javascript library is loaded */
function handleClientLoad() {
  console.log("Inside handleClientLoad ...");
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,100);
}

/* API function to check whether the app is authorized. */
function checkAuth() {
  console.log("Inside checkAuth ...");
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, 
                      handleAuthResult);
}

/* Invoked by different functions to handle the result of authentication checks.*/
function handleAuthResult(authResult) {
    console.log("Inside handleAuthResult ...");
    var authorizeButton = document.getElementById('authorize-button');
    var addButton = document.getElementById('addToCalendar');
    if (authResult && !authResult.error) {
          authorizeButton.style.visibility = 'hidden';
          addButton.style.visibility = 'visible'; 
          //load the calendar client library
          gapi.client.load('calendar', 'v3', function(){ 
            console.log("Calendar library loaded.");
          });
    } else {
          authorizeButton.style.visibility = '';
          authorizeButton.onclick = handleAuthClick;
        }
}

/* Event handler that deals with clicking on the Authorize button.*/
function handleAuthClick(event) {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, 
                        handleAuthResult);
    return false;
}

/* End of PART 1 - Authentication Process. */   

// Make an API call to create an event.  Give feedback to user.
document.getElementById("myBtn").addEventListener("click", createEvent);
var startleave = document.getElementById("startdate").value;
var lastleave = document.getElementById("lastdate").value;
function createEvent(eventData) {
  // First create resource that will be send to server.
    var resource = {
        "summary": eventData.eventTitle,
        "start": {
          "dateTime":startleave
        },
        "end": {
          "dateTime":lastleave
          }
        };
    // create the request
    gapi.client.load('calendar', 'v3', function () {					// load the calendar api (version 3)
      var request = gapi.client.calendar.events.insert
      ({
          'calendarId': 'primary', 
          "resource": resource							// pass event details with api call
      })
    
      
  
    // execute the request and do something with response
    request.execute(function(resp) {
      console.log(resp);
      alert("Your event was added to the calendar.");
    });
  })
  }
         
      