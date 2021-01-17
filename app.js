const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

//  const apikey = 53efdbd800e2097f21358d5a63ecca6e-us7;
// list ID
// 10c6d335ef
const data = {
  members:[{
  email_address: email,
  status: "subscribed",
  merge_fields: {
    FNAME : firstName,
    LNAME : lastName  }
  }]
};

var jsonData = JSON.stringify(data);
console.log(jsonData);

const url = "https://us7.api.mailchimp.com/3.0/lists/10c6d335ef";

const options ={
  method : "POST",
  auth: "shahmir:385a2f429d0e0debcbeef9f7ae59fc68-us7"
};

const request = https.request(url, options, function(response){
response.on("data", function(data){
  console.log(JSON.parse(data)); });
});

request.write(jsonData);
request.end();

});

app.listen(3000, function(){
  console.log("server running at port 3000");
});
