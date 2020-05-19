var app = require('express')(),
  port = 8000,
   mongoose = require('mongoose'),
   tasks = require('./app/models/task.model'), //created model loading here
   users = require('./app/models/user.model'), //created model loading here
  db = require('./app/config/db'),
  bodyParser = require('body-parser');
  
  const cors           = require('cors');
  const http = require('http').createServer(app);
  const io = require('socket.io')(http);

mongoose.Promise = global.Promise;
mongoose.connect(db.url, { useUnifiedTopology: true,useNewUrlParser: true }); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var routes = require('./app/routes/index'); 

io.on('connection', (socket) => {
  console.log('a user connected');
  routes(socket, io);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(port, () => {
  console.log('Server starts on ' + port);
});
