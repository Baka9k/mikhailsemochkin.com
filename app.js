const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 8080
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const _ = require('lodash')
const chalk = require('chalk')

const args = process.argv.slice(2)

// Admin's login and password
const adminLogin = args[0]
const adminPassword = args[1]
const sessionSecret = args[2]
const noArgsErrorMessage = 'You should start app.js with three arguments - admin login, admin password and session secret'
if (!adminLogin || !adminPassword || !sessionSecret) {
  console.log(chalk.red(noArgsErrorMessage))
}

const session = require('express-session')
app.use(session({
  secret: sessionSecret,
  resave: true,
  saveUninitialized: true
}))

// configure app
app.use(morgan('dev')) // log requests to the console
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
    console.log(chalk.red('Error while connecting to DB:'))
    console.log(chalk.pink(err))
  }
})

// models
const PortfolioEntry = require('./models/section')

// Files
const getFileList = function (path, callback) {
  fs.readdir(path, function (err, files) { callback(err, files) })
}
const deleteFile = function (path) {
  fs.unlink(path)
}

// ============================== AUTHORIZATION ===============================

// Authentication and Authorization Middleware
const auth = function (req, res, next) {
  if (req.session && req.session.loggedIn) {
    return next()
  } else {
    return res.sendStatus(401)
  }
}

// =============================================================================


const router = express.Router()


router.route('/')
  
  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
  })


router.route('/login')

  .get(function (req, res) {
    res.sendFile(path.join(__dirname, '/html/login.html'))
  })

  .post(function (req, res) {
    if (req.query.username === adminLogin && req.query.password === adminPassword) {
      req.session.loggedIn = true
      res.redirect('/')
    } else {
      res.sendFile(path.join(__dirname, '/html/login-error.html'))
    }
  })


router.route('/logout')

  .get(function (req, res) {
    req.session.destroy()
    res.redirect('/login')
  })


router.route('/api/amiadmin')

  .get(
    function (req, res) {
      if (req.session.loggedIn) {
        res.json({isAdmin: true})
      } else {
        res.json({isAdmin: false})
      }
    })




app.use('/', router)


app.listen(port)
console.log(chalk.green('App listening on port ' + port))
