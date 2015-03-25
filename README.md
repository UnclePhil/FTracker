# FligthTracker

## Purpose
The goal of this double software is to track the planes coming over my house to land in the BRU airport through the planefinder.net website.
Then i'll try to combine this with the noise value detected by my personnal sonometer.
All of these are running on a simple RaspberryPi v2 under my desk.


## Prerequisite
A computer running node for the robot
A firebase Account, and his secretkey
Some gps coordinate or coords coming from planefinder.net 

## Robot
The robot is intended to run on a PI (v2) and to save the data in Firebase 
I use this with the forever module of nodes, because the json analyzer is not totally clean

### Config
Copy the config.js.sample into config.js
Change it to reflect your data 


## Viewer
The Viewer will be an angular apps, directly connected on the firebase data, and will show all plane  passing over my head 

## Me
Unclephil
@unclephildotnet

