const {exec}=require('child process');
require('dotenv').config();
var mqtt = require('mqtt');


// CONFIG VARIABLES

 CLOUD_ADDRESS =process.env.ADDS
//const CLIENT_ID ='mqttjs01'

var client = mqtt.connect("mqtt://" + CLOUD_ADDRESS,{
	username:process.env.USER1,
    password:process.env.PASS,
	keepalive: 120,
    reconnectPeriod: 2000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
})



const TIME_INTERVAL=2000;

//handle incoming messages
client.on('message', function (topic, message, packet) {
	console.log("message is " + message);
	console.log("topic is " + topic);
});


client.on("connect", function () {
	console.log("connected  " + client.connected);

})
//handle errors
client.on("error", function (error) {
	console.log("Can't connect" + error);
	process.exit(1)
});


//publish 
function publish(topic, msg, options) {
	msg=Math.round(30 + Math.random() * 50) + "";
	console.log("publishing", msg);

	if (!!client.connected) client.publish(topic, msg, options);


}

// function to publish heartbeat 
function publishHeartbeat(value) {
	if (!!client.connected) client.publish("heartbeat", value, options);

}


// function to publish temperature
function publishTemperature(value) {
	if (!!client.connected) client.publish("temperature", value, options);

}

//////////////

var options = {
	retain: true,
	qos: 1
};

console.log("subscribing to topics");


var temperatureTimer = setInterval(function () {exec('sudo /home/pi/bcm2835-1.56/mlx90614',(err,stdout,stderr)=>{
	const value=stdout;
	publishTemperature(value);})}, TIME_INTERVAL);

//var heartbeatTimer = setInterval(function () { 
//	const value=Math.round(60 + Math.random() * 20) + "";
//	publishHeartbeat(value); }, TIME_INTERVAL);



// var topic_list = ["topic2", "topic3", "topic4"];
// var topic_o = { "topic22": 0, "topic33": 1, "topic44": 1 };
// client.subscribe(topic, { qos: 1 }); //single topic
// client.subscribe(topic_list, { qos: 1 }); //topic list
// client.subscribe(topic_o); //object

