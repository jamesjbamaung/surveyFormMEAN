// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var app = express();
console.log("Let's find out what app is", app);
// use app's get method and pass it the base route '/' and a callback

//linking static folder
app.use(express.static(__dirname + "/static"));

//linking views folder and importing ejs (the view engine)
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//importing and installing body-parser
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({extended: true}));

//importing and installing express-session
// new code:
var session = require('express-session');

// more new code:
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

//importing stylesheet.css however it is already imported on line 10
//app.use(express.static(__dirname + "/static/stylesheet.css"))


app.get('/', function (request, response) {
    // just for fun, take a look at the request and response objects
    // use the response object's .send() method to respond with an h1
    response.render('index')
})
app.post('/info', function (req, res){
    data = req.body
    res.redirect('/result');
});
app.get('/result', function (req, res){
    res.render('result', {data: data});
})
// app.get("/users", function (request, response) {
//     // hard-coded user data
//     var users_array = [
//         { name: "Michael", email: "michael@codingdojo.com" },
//         { name: "Jay", email: "jay@codingdojo.com" },
//         { name: "Brendan", email: "brendan@codingdojo.com" },
//         { name: "Andrew", email: "andrew@codingdojo.com" }
//     ];
//     response.render('users', { users: users_array });
// })

// app.post('/users', function (req, res){
//     console.log("POST DATA \n\n", req.body)
//     // set the name property of session.  
//     req.session.name = req.body.name;
//     console.log(req.session.name);
//     //code to add user to db goes here!
//     // redirect the user back to the root route. 
//     res.redirect('/');
// });
// app.post('/users', function (req, res){
//     console.log("POST DATA \n\n", req.body)
//     //code to add user to db goes here!
//     // redirect the user back to the root route.  
//     res.redirect('/')
// });
// app.get("/users/:id", function (req, res){
//     console.log("The user id requested is:", req.params.id);
//     // just to illustrate that req.params is usable here:
//     res.send("You requested the user with id: " + req.params.id);
//     // code to get user from db goes here, etc...
// });

// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function () {
    console.log("listening on port 8000");
})