var express = require('express');
var mongoose = require('mongoose');

var contacts = require('./routes/contact');

var uriString = process.env.MONGOLAB_URI;

mongoose.connect(uriString, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uriString + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uriString);
  }
});

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use('/api',contacts);

app.get('/', function(request, response) {
    response.render('index.html')
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
