# Leave-Management-system
Leave management system with google event calendar

A simple client-side HTML/javascript app to Create Google calendar events for a given date, and adding new events. It requires a Google authentication by the user (via OAuth2), and then will show events for the selected date, 

The user may also add a new event (to simplify things I default to using the user's primary calendar, and I use the quickAdd api call). I used firebase database to store the users infomation and also to retrieve them back to the leave request list.

I've divided up the business logic JS into a few different files, which makes maintenance/development/project-layout more clear, but comes at the cost of extra HTTP requests to load the several files. In production you could have a preprocessing step of some sort that compiles the local JS files together into one minified JS download (Ruby on Rails does something similar to this out of the box for apps in production mode).

NOTE: For this challenge I had to learn Google APIs (Calendar specifically), Google OAuth2, Backbone.js, and SASS all mostly from scratch as I have never used any of these so far in my professional projects. So yes, it was a challenge for sure :) 

NOTE: I defined the project on the Google Developers Console to expect to be running from firebase hosting ,  so you may need to rig up your checkout to run from that identical host or you will get authorization failures from Google.

NOTE: I developed/tested with latest Chrome. However it support other browsers such as IE and Firefox.

NOTE: There's still some functional massaging I could do for full day events if I had more time. Also I wasn't really sure which values to display for each calendar event, so I just show start, end, and title (summary). Other fields from the API could easily be added.

NOTE: The Add New Event as I have coded it does not check the date field, With more time I could envision developing a more fully functional form for defining the new event, and using the insert API call.
