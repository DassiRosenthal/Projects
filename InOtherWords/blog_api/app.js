const express = require('express');
const http = require('http');
const io = require('socket.io');
const app = express();
const PORT = process.env.PORT || 8080;
const session = require('express-session');

const server = http.createServer(app);
const socketIo = io(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
});
socketIo.on('connection', function(socket){
  socket.removeAllListeners();
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://dassirosenthal:MjY6Hal2oC2TKJkI@cluster0.ecnixjn.mongodb.net/blog?retryWrites=true&w=majority';
const client = new MongoClient(uri);


app.use(require('cors')({
  origin: 'https://master--in-other-words.netlify.app/',
  credentials: true
}));

(async () => {
  await client.connect();
  global.posts = await client.db('blog').collection('posts');
  global.users = await client.db('blog').collection('users');
})();

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
// app.use('/', function(){
//   console.log('hello')
// })
app.use('/posts', require('./routes/posts.js')(socketIo));
app.use('/', require('./routes/authentication.js'));
app.use('/addComment', require('./routes/comments.js')(socketIo));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const error = new Error('No such endpoint');
  error.statusCode = 404;
  next(error);
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.statusCode || 500)
    .send(err.message);
});

server.listen(PORT, ()=>{
  console.log(`server started on port ${PORT}`);
});

