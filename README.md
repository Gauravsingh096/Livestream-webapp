###LiveStream WebApp

##Table of Contents

#Introduction
#Technologies Used
#Features
#Getting Started
#Usage
#API Endpoints
#Contributing
#License

##Introduction
The LiveStream WebApp is a full-stack application that provides a platform for video streaming using RTSP, along with overlay functionalities. Built with Python (Flask), MongoDB, and React, it allows users to add, edit, and delete overlays on the video stream.



##Technologies Used
#Frontend: React
#Backend: Python (Flask)
#Database: MongoDB
#Video Streaming: RTSP-compatible streaming
#Libraries: Axios, Draggable (for overlay movement)


##Features
#Live video streaming from an RTSP source.
#Create, update, and delete overlay text on the video.
#Draggable overlays that can be positioned anywhere on the video stream.
#RESTful API for handling overlay data.

##Getting Started
#Prerequisites
#Python 3.x
#Node.js
#MongoDB
#FFmpeg (for video streaming)

##Setup Instructions
#Clone the repository:
git clone https://github.com/Gauravsingh096/Livestream-webapp.git
cd Livestream-webapp
#Backend Setup:
Navigate to the backend folder.
pip install -r requirements.txt
python app.py
Ensure MongoDB is running.

#Navigate to the frontend folder.
npm install
npm start


##Usage
#Open your browser and navigate to http://localhost:3000.
#You will see the live video stream.
#Use the input field to add overlay text. Click on the overlay to make it editable.
#Drag the overlay to position it as needed.
#Click "Save Overlay" to store your overlay in the database.
#Click "Delete Overlay" to remove an overlay.

##API Endpoints
GET /api/overlay - Retrieve all overlays.
POST /api/overlay - Create a new overlay.
PUT /api/overlay/
- Update an existing overlay.
DELETE /api/overlay/
- Delete an overlay.


Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any improvements or bug fixes.

License
This project is licensed under the MIT License. See the LICENSE file for more details.



