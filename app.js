var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost:15247/tvshows', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/public')); 

// Import Models and controllers
var models     = require('./models/tvshow')(app, mongoose);
var TVShowCtrl = require('./controllers/tvshows');

// Example Route
var router = express.Router();
app.use(router);

// API routes
var tvshows = express.Router();

router.get('/tvshows', TVShowCtrl.findAllTVShows);
router.post('/tvshows', TVShowCtrl.addTVShow);

router.get('/tvshows/:id', TVShowCtrl.findById);
router.delete('/tvshows/:id', TVShowCtrl.deleteTVShow);
router.put('/tvshows/:id', TVShowCtrl.updateTVShow);

app.use('/api', tvshows);

// Start server
app.listen(15246, function() {
  console.log("Node server running on http://localhost:15246");
});
