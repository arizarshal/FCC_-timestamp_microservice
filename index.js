// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date_string", (req, res) => {
  let dateString = req.params.date_string === "" ? new Date() : req.params.date_string;
  console.log(dateString);
  
  let dateInt = parseInt(dateString);

  if (/\d{,}/.test(dateString)) {
    // let emptyDate = parse(dateString)
    return res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString()})
  } else {
    
    //A 4 digit number is a valid ISO-8601 for the beginning of that year
    //5 digits or more must be a unix time, until we reach a year 10,000 problem
    if (/\d{5,}/.test(dateString)) {
      //Date regards numbers as unix timestamps, strings are processed differently
      res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
    } else {
      let dateObject = new Date(dateString);
  
      if (dateObject.toString() === "Invalid Date") {
        res.json({ error: "Invalid Date" });
      } else {
        res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
      }
  
    }
  }

});

app.get('/api', (req, res) => {
  const newDate = new Date()
  // const dateObject2 = new Date(new Date)
  // const atUnix = Math.floor(newDate) / 1000
  // let dateInt2 = newDate.toString();
  res.json({ unix: newDate.valueOf(), utc: newDate.toUTCString().toString()})
})



const PORT = 3000
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


// listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });