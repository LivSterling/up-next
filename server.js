// server.js

// set up ======================================================================
// get all the tools we need
const express = require('express')
const app = express()
const port     = process.env.PORT || 7070
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const session = require('express-session')
const bcrypt = require('bcrypt')
require('dotenv').config()
const passport = require('passport')
const User = require('./app/models/user')




const configDB = require('./config/database.js')

let db

// configuration ===============================================================

mongoose.connect(configDB.url || process.env.DB_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected')
    app.listen(port, () => {
      console.log(`The magic happens on port ${port}`)
    })
  })
  .catch(err => console.error(err))
  // connect to our database

require('./config/passport')(passport)// pass passport for configuration

app.set('view engine', 'ejs') // set up ejs for templating
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// required for passport
app.use(session({
  secret: "thriftSessionKey" || process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

// launch ======================================================================

const authRoutes = require('./app/routes/auth')
const homeRoutes = require('./app/routes/home.js')
const projectRoutes = require('./app/routes/project-routes.js')
app.use('/projects', projectRoutes)
app.use('/', authRoutes)

app.use('/', homeRoutes)

app.get('/', (req, res) => {
        res.redirect('projects')
      })  
