planefinder = require('./plane.js');
geolib = require('geolib');
Firebase = require('firebase');
config = require('./config.js');

console.log(config);

//get config data
var dburl = config.db.url;
var AUTH_TOKEN = config.db.token;

var coords = config.poller.coords;
var maxDistance = config.poller.distance;  // meters
var interval = config.poller.interval; //millisec
var poller = config.poller.name;

//start process
var ref = new Firebase(dburl);
var refpoller = ref.child("robots");
var refdetect = ref.child("detect");
ref.authWithCustomToken(AUTH_TOKEN, function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Login Succeeded!", authData);
    dt=new Date;
    start={timestamp:Firebase.ServerValue.TIMESTAMP,name:poller,coords:coords,distance:maxDistance,interval:interval};
    refpoller.push(start);
  }
});

var bounds = geolib.getBoundsOfDistance(coords, maxDistance);
console.log("FligthTracker Started");
console.log("Coord:",coords);
console.log("Distance", maxDistance, " meters");
console.log("Polling every ",interval/1000," sec")
console.log("----------------------------");

var client = planefinder.createClient({
  bounds: bounds,
  interval: interval
});

client.on('data', function(traffic) {
  if (traffic.length > 0 ) {
    traffic.forEach(function(plane) {
       plane.timestamp = Firebase.ServerValue.TIMESTAMP;
       plane.robot = poller;
       refdetect.push(plane);
       console.log(plane.callsign);
    });
  };
});

client.resume();