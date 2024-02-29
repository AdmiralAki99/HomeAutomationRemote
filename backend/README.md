# Backend Documentation

## Overview

Created a basic backend server to hold the data and models and route them on the localhost to allow for the frontend to fetch the data using JSON objects.

## Technologies Used

<ol>
    <li>Python</li>
    <li>Flask API</li>
    <li> React</li>
</ol>

## API End Points
End Points were used in order to organize the models as well as the requests in order to test the fetching and sending as well as allow for each route to be independent of each other. The backend is routed to <i>http://localhost:3000</i>

### `/light/all`

This is the route that gets all the lights that are stored in the database and returns them in a JSON format.

<strong>Methods:</strong> GET
<strong>Parameters:</strong> None
<strong>Response:</strong> JSON array of SmartLight Objects.

### `/light/<int:light_id>`

This route allows for lights to get updated, added, deleted and specific lights be retreived.

<strong>Methods:</strong> GET/POST/PUT/DELETE
<strong>Parameters:</strong> Light ID
<strong>Response:</strong> Response/ Specific Smartlight JSON Object

### `/spotify/get/current`

This route allows for the current spotify metadata to be retreived.

<strong>Methods:</strong> GET
<strong>Parameters:</strong> None
<strong>Response:</strong> Current Playback Metadata

### `/spotify/pause`

This route allows for the current playback to be paused on the Spotify device

<strong>Methods:</strong> GET
<strong>Parameters:</strong> None
<strong>Response:</strong> Message/Error

### `/spotify/play`

This route allows for current playback to be played/resumed on the Spotify Device

<strong>Methods:</strong> GET
<strong>Parameters:</strong> None
<strong>Response:</strong> Message/Error

### `/spotify/next`

This route skips the current playback track to the next one in queue.

<strong>Methods:</strong> POST
<strong>Parameters:</strong> None
<strong>Response:</strong> Message/Error

### `/spotify/prev`

This route rewinds the current playback to the last track in queue.

<strong>Methods:</strong> POST
<strong>Parameters:</strong> None
<strong>Response:</strong> Message/Error

### `/calendar/get/all`

This route returns all the events that are stored on the database.

<strong>Methods:</strong> GET
<strong>Parameters:</strong> None
<strong>Response:</strong> Calendar Object /Error

### `/calendar/get/<selected_date>`

This route returns all the events that are stored on this specific date

<strong>Methods:</strong> GET
<strong>Parameters:</strong> Date (dd-mm-yyyy)
<strong>Response:</strong> Calendar Events/ Error

### `/calendar/get/month/<month_id>`

This route returns all the events that are stored on this specific month

<strong>Methods:</strong> GET
<strong>Parameters:</strong> Month ID
<strong>Response:</strong> Calendar Events/ Error

### `/calendar/get/today`

This route returns all the events that are stored today

<strong>Methods:</strong> GET
<strong>Parameters:</strong> None
<strong>Response:</strong> Calendar Events/ Error

### `/calendar/get/today/count`

This route returns all the count of the events that are stored today

<strong>Methods:</strong> GET
<strong>Parameters:</strong> None
<strong>Response:</strong> Calendar Events/ Error

### `/calendar/add/`

This route adds a calendar event to the database

<strong>Methods:</strong> POST
<strong>Parameters:</strong> Calendar Event
<strong>Response:</strong> Message/Error

### `/calendar/complete/<int:event_id>`

This route changes the status of the event to `True`

<strong>Methods:</strong> POST
<strong>Parameters:</strong> Event ID
<strong>Response:</strong> Message/Error

### `/calendar/change/status/<int:event_id>`

This route changes the status of the event to `False`

<strong>Methods:</strong> POST
<strong>Parameters:</strong> Event ID
<strong>Response:</strong> Message/Error

### `/calendar/change/start/<int:event_id>`

This route changes the start time for the event.

<strong>Methods:</strong> POST
<strong>Parameters:</strong> Event ID, Start Hour, Start Minutes
<strong>Response:</strong> Message/Error

### `/calendar/change/end/<int:event_id>`

This route changes the end time for the event.

<strong>Methods:</strong> POST
<strong>Parameters:</strong> Event ID, End Hour, End Minutes
<strong>Response:</strong> Message/Error


## Models

### SmartLight Model

#### Fields:

<ul>
    <li><strong><code>id</code> </strong>(Integer, Primary Key): Unique identifier for the smart light.</li>
    <li><strong><code>name</code> </strong>(String, 100 characters, Not Null): Name of the smart light.</li>
    <li><strong><code>ip</code> </strong> (String, 100 characters, Not Null): IP address of the smart light for communication.</li>
    <li><strong><code>state</code> </strong>(String, 100 characters, Not Null): Current state of the smart light (e.g., on, off, color).</li>
</ul>

#### Usage

```
# Creating a SmartLight Object
light = SmartLight(name='Living Room Light', ip='192.168.1.100', state='on')
```

#### Notes
<ul>
    <li>Ensure that the <code>name</code> and <code>ip</code> fields are unique for each smart light.</li>
    <li>The <code>state</code> field can be updated to reflect the current state of the smart light device.</li>
</ul>

### CalendarEvent Model

#### Fields

<ul>
    <li><code>id</code> (Integer, Primary Key): Unique identifier for the calendar event.</li>
    <li><code>title</code> (String, 100 characters, Not Null): Title or name of the event.</li>
    <li><code>start_date_day</code> (Integer, Not Null): Day of the starting date for the event.</li>
    <li><code>start_date_month</code> (Integer, Not Null): Month of the starting date for the event.</li>
    <li><code>start_date_year</code> (Integer, Not Null): Year of the starting date for the event.</li>
    <li><code>start_time_hour</code> (Integer, Not Null): Hour component of the starting time for the event.</li>
    <li><code>start_time_minute</code> (Integer, Not Null): Minute component of the starting time for the event.</li>
    <li><code>end_date_day</code> (Integer, Not Null): Day of the ending date for the event.</li>
    <li><code>end_date_month</code> (Integer, Not Null): Month of the ending date for the event.</li>
    <li><code>end_date_year</code> (Integer, Not Null): Year of the ending date for the event.</li>
    <li><code>end_time_hour</code> (Integer, Not Null): Hour component of the ending time for the event.</li>
    <li><code>end_time_minute</code> (Integer, Not Null): Minute component of the ending time for the event.</li>
    <li><code>all_day</code> (Boolean, Not Null): Indicates whether the event is an all-day event.</li>
    <li><code>description</code> (String, 100 characters, Not Null): Description or additional information about the event.</li>
    <li><code>calendar</code> (String, 100 characters, Not Null): Calendar identifier or name the event belongs to.</li>
    <li><code>status</code> (Boolean, Not Null): Status of the event (active/inactive).</li>
    <li><code>colour</code> (String, 10 characters, Not Null): Color identifier or code associated with the event.</li>
</ul>

#### Usage

```
# Creating a CalendarEvent Object
event = CalendarEvent(
    title='Meeting',
    start_date_day=10,
    start_date_month=11,
    start_date_year=2023,
    start_time_hour=9,
    start_time_minute=0,
    end_date_day=10,
    end_date_month=11,
    end_date_year=2023,
    end_time_hour=10,
    end_time_minute=0,
    all_day=False,
    description='Discussion on project',
    calendar='Work Calendar',
    status=True,
    colour='#FF5733'
)
```

#### Notes

<ul>
    <li>Ensure proper validation of date and time components when creating or updating events.</li>
    <li><code>all_day</code> field should be handled accordingly to set the event as an all-day event or not.</li>
    <li><code>status</code> field determines the status of the event, such as active/inactive.</li>
    <li><code>colour</code> field represents the color associated with the event for visual identification.</li>
</ul>

### Network Scanner

The network scanner scans the connected network for devices connected on the network. This is to use the Wake-On-LAN feature to wake up the my personal computer.

## Learning Objectives

<ol>
    <li>Understanding Flask API Basics</li>
    <li>Understand Endpoint Routes</li>
    <li>Understanding of Postman Tests </li>
    <li>JSON Object Management</li>
    <li>Network Scanning</li>
</ol>

