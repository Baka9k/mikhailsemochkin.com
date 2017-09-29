const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const cookieParser = require('cookie-parser')
const session = require('express-session')
const port = process.env.PORT || 8080
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const _ = require('lodash')
const chalk = require('chalk');

const args = process.argv.slice(2);

// Admin's login and password
const adminLogin = args[0]
const adminPassword = args[1]
const noArgsErrorMessage = 'You should start app.js with two arguments - admin login and admin password'
if (!adminLogin || !adminPassword) {
  console.log(chalk.red(noArgsErrorMessage))
}

// configure app
// app.use(morgan('dev')); // log requests to the console
app.use('/static', express.static('./dist/static'))
app.use('/uploads', express.static('./uploads'))
app.use(cookieParser())

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// configure db
const options = {}
const url = 'mongodb://localhost/mikhailsemochkin.com'
mongoose.connect(url, options, function (err) {
  if (err) {
    console.log(err)
  }
})

// models
const PortfolioEntry = require('./models/section')

// configure passport
app.use(session({ secret: 'VS9aqJd1q4ksabn' })) // session secret
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions

// Files
const getFileList = function (path, callback) {
  fs.readdir(path, function (err, files) { callback(err, files) })
}
const deleteFile = function (path) {
  fs.unlink(path)
}

// ============================== AUTHORIZATION ===============================

function isLoggedIn (req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next()
  }
  // if they aren't
  res.send(401, 'Unauthorized')
}

// =============================================================================


const router = express.Router();


router.route('/')
  
  .get(isLoggedIn, function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
  })


router.route('/login')

  .get(function (req, res) {
    res.sendFile(__dirname + '/html/login.html');
  })

  .post(passport.authenticate('local-login', {
    successRedirect: '/', // redirect to the secure section
    failureRedirect: '/login-error' // redirect back to the signup page if there is an error
  }))


router.route('/login-error')
  .get(function (req, res) {
    res.sendFile(__dirname + '/html/login-error.html');
  })


router.route('/logout')
  
  .get(function (req, res) {
    req.logout()
    res.redirect('/login')
  })


router.route('/api/amiadmin')
  
  .get(
    isLoggedIn,
    function (req, res) {
      if (req.user.isAdmin) {
        res.json({isAdmin: true})
      } else {
        res.json({isAdmin: false})
      }
    })




app.use('/', router)


app.listen(port);
console.log('App listening on port ' + port)
