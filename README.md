# it202-big
# Multi-Purpose

IT-202 Big Project

Tyler Lyczak

tlyczak2


**[Link to planning doc](https://docs.google.com/document/d/1gWrJ66LanUh8SbFqFjAoLgabiaiu1Loin7mVgVUYHjI/edit?usp=sharing)**

**[View Live Preview](https://tylerlyczak.github.io/it202-big/)**

## Big Project Checklist
1. Includes at least 3 screens
  - Has 6 screens accessable from the nav-bar
2. UI built using Material Components for the Web
  - The buttons are all Material Design buttons
  - The text inputs are from Semantic UI
3. Retrieves data from at least two different endpoints
  - There are 4 different APIs being used
    - Dog Picture/Video API
    - Merriam Webster API
    - City of Chicago Crime API
    - Google Maps API
4. Includes a visualization (map, chart, or ?)
  - Uses CanvasJS to make a chart of the crimes in Chicago
  - Uses Google Maps to display where you are with Geolocation
5. Stores and retrieves data from the IndexedDB
  - For the crime API, it stores the data into the IndexDB
  - If the user changes the type of graph, it will pull from the IndexDB instead of calling the API
6. Utilizes some hardware feature (sensor, camera, microphone, etc)
  - Uses Geolocation for the Google Maps API
7. Includes a Service Worker
  - Caches all the pages for the website
8. Functions offline (due to cached assets)
  - Since the service worker caches everything, it functions offline
9. Installs on device (due to Web App Manifest)
  - includes a manifest and install on a device
