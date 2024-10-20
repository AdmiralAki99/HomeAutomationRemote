# Backend Documentation

## Overview

Created a basic backend server to hold the data and models and route them on the localhost to allow for the frontend to fetch the data using JSON objects.

## Technologies Used

<ol>
    <li>Python</li>
    <li>Flask API</li>
</ol>

## Feature Managers
<ol>
    <li>Lights Manager</li>
    <li>Calendar/Event Manager</li>
    <li>Manga Manager</li>
    <li>Ebook Downloader</li>
    <li>Spotify Manager</li>
    <li>Anime Scraper</li>
</ol>

### Lights Manager

The lights manager uses the API from TP-Link Kasa and then detects, connects, and turns on and off the lights.

#### Future Upgrades

The manager does not have brightness manipulation and colour manipulation yet.

### Calendar/Event Manager

The manager is able to schedule, create, edit, display and show the events on the UI. For now this is done through API endpoints only as opposed to encapsulated classes.

### Manga Manager

The manager uses the Mangadex API to store, retreive,display and search for mangas and get them as per the request of the user.

### Ebook Downloader

The downloader is able to query Project Gutenberg and get the ebooks and download them as well as get their metadata. (Not used for now)

### Spotify Manager

Uses the Oauth-2 workflow used by Spotify to log in to the users profile and update the music players state as well as retreive some metadata.

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

## Todo

<ul>
    <li> Implementing a memory allocation management (LRU,Time-based,Manual control) for Manga Scraper  rather than storing all recent Mangas</li>
    <li>Implemeting Anime Scraper</li>
</ul>

## Problems Faced

<ul>
    <li> Parsing Complex JSON data with data from different languages</li>
    <li> Using the OAuth2.0 For Spotify Manager</li>
</ul>

