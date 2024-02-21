// import  express  from "express";
// import { BodyParser } from "body-parser";
// import { Request } from "request";
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')


const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signupform.html")
})
app.post("/", function(req, res){
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    // res.send(`<h1> Thank you ${firstName} for signing up for our Newsletter!!</h1>`);

    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }   
        ]
    }
    let jsonData = JSON.stringify(data);

    let options = {
        url: "https://us12.api.mailchimp.com/3.0/lists/af14424414",
        method: "POST",
        headers: {
            "Authorization": "Gerald01 e426407a96e58fe6a7e36227e986b870-us12"
        },
        body: jsonData
    }

    request(options, function(err, response, body){
        if (err) {
            res.sendFile(__dirname + "/failure.html")
            console.log(err);
        }
       
          else if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html")
                console.log(response.statusCode);
            }
            else{
                res.sendFile(__dirname + "/failure.html")
            }
           
        
    })
})
app.post('/failure', function(req, res){
    res.redirect('/')
})

app.listen(3008, function(){
    console.log("Server is running on port 3008");
})

//e426407a96e58fe6a7e36227e986b870-us12

// af14424414