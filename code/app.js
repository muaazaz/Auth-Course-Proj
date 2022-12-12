const express = require('express');
const mongoose = require('mongoose');
const authrouter = require('./routes/auth')
const cookieParser = require('cookie-parser')
const auth = require('./middleware/authentication')
const checkUser = require('./middleware/checkuser')

const app = express();


// middleware
app.use(express.static('public'));
app.use(express.json())

app.use(cookieParser())


// view engine
app.set('view engine', 'ejs');



// database connection
const dbURI = 'mongodb+srv://muaaz:mongodb@node-course.h5vuzva.mongodb.net/node-course?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000,()=>{
    console.log('Server is up and running on Port: 3000')
  }))
  .catch((err) => console.log(err));

// routes
app.get('*',checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', auth,(req, res) => res.render('smoothies'));
app.use(authrouter)