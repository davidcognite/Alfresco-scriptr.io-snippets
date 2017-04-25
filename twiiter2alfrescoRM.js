var http = require("http");

//Get the body of the post
var myRequestBody = JSON.parse(request.rawBody);
var myTweet =  myRequestBody.tweet;
var myTweetLink =  myRequestBody.tweetLink;
var myUser =  myRequestBody.user;

//The request object below will be used to make an HTTP call that will do a country lookup based on the IP 
var requestObject = {
 "url": "http://ec2-35-176-16-152.eu-west-2.compute.amazonaws.com/alfresco/s/api/login",
 "bodyString": "{'username':'admin','password':'i-0c0a39342fe975cbd'}",
 "method": "POST" // the method is optional, it defaults to GET.
}

var now = new Date();
var timestamp = now.getMilliseconds();
var recordName = "Tweet from " + myUser + " ( " + timestamp + " ) ";
var recordProperties = "{\"cm:description\":\"" + myTweet + "\",\"rma:storageLocation\":\"" + myTweetLink + "\"}";

//... and now we issue the request
var ticket = null;
var ticketresponse = http.request(requestObject);
if(ticketresponse.status == "200"){
 var result = JSON.parse(ticketresponse.body);
 ticket = result.data.ticket;
}

var bodyRequest = "{\"name\":\"" + recordName + "\",\"nodeType\":\"rma:nonElectronicDocument\",\"properties\":" + recordProperties + "}";

var postTweetObj = {
 "url": "http://ec2-35-176-16-152.eu-west-2.compute.amazonaws.com/alfresco/api/-default-/public/gs/versions/1/unfiled-containers/-unfiled-/children?alf_ticket=" + ticket,
 "bodyString": bodyRequest,
 "headers" : {"Content-Type" : "application/json"},
 "method": "POST" // the method is optional, it defaults to GET.
}

var postTweetResult = null;
var tweetResponse = http.request(postTweetObj);
if(tweetResponse.status == "200"){
 var postTweetResult = JSON.parse(tagResponse.body);
 // do something ?
}

return tweetResponse;

