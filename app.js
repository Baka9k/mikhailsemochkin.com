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
  process.exit(1)
}

const session = require('express-session')
app.use(session({
  secret: sessionSecret,
  resave: true,
  saveUninitialized: true
}))

// configure app
// app.use(morgan('dev')) // log requests to the console
app.use('/static', express.static('./dist/static'))
app.use('/uploads', express.static('./uploads'))
app.use(cookieParser())

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// configure db
const options = {}
const url = 'mongodb://localhost/mikhailsemochkin'
mongoose.Promise = Promise
mongoose.connect(url, options, function (err) {
  if (err) {
    console.log(chalk.red('Error while connecting to DB:'))
    console.log(chalk.red(err))
  }
})

// models
const PortfolioItem = require('./models/portfolioItem')

// Files
const getFileList = function (path, callback) {
  fs.readdir(path, function (err, files) { callback(err, files) })
}
const deleteFile = function (path) {
  fs.unlink(path)
}

// ============================== AUTHORIZATION ===============================

// Authentication and Authorization Middleware
const isLoggedIn = function (req, res, next) {
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

  .post(function (req, res) {
    console.log(chalk.cyan('Login attempt: ') + `\nLogin: ${req.body.login}\nPassword: ${req.body.password}`)
    if (req.body.login === adminLogin && req.body.password === adminPassword) {
      req.session.loggedIn = true
      res.redirect('/')
      console.log(chalk.green('User logged in'))
    } else {
      res.redirect('/#/login-error')
      console.log(chalk.red('Login rejected'))
    }
  })


router.route('/logout')

  .get(function (req, res) {
    req.session.destroy()
    res.redirect('/#/login')
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


// ============== API ===============

router.route('/api/portfolio')

  // Create new portfolio item

  .post(
    isLoggedIn,
    function (req, res) {
      const newPortfolioItem = new PortfolioItem()
      newPortfolioItem.title = req.body.title || ''
      newPortfolioItem.description = req.body.description || ''
      newPortfolioItem.dateCreated = new Date()
      newPortfolioItem.priority = req.body.priority || Infinity
      newPortfolioItem.content = req.body.content || ''
      newPortfolioItem.hide = req.body.hide || false
      newPortfolioItem.save(function (err, item) {
        if (err) {
          console.log(chalk.red('Error while saving portfolio entry: '))
          console.log(chalk.red(err))
          res.status(500).json({ error: err })
        }
        res.json({ itemID: item._id })
      })
    })


  // Get list of portfolio items

  .get(function (req, res) {
    PortfolioItem
      .find({}, {
        content: 0   // don't send content
      })
      .sort({priority: 1})
      .exec(function (err, items) {
        if (err) {
          console.log(chalk.red('Error while getting portfolio items in /api/portfolio/ GET: '))
          console.log(chalk.red(err))
          res.status(500).json({ error: err })
        } else {
          res.json({ items: items })
        }
      })
  })




router.route('/api/portfolio/:item_id')

  // Get portfolio item content

  .get(
    function (req, res) {
      Promise
        .all([
          PortfolioItem.findById(req.params.item_id),
          PortfolioItem.count({})
        ])
        .then(function (results) {
          const item = results[0]
          const maxPriority = results[1]
          res.json({
            item: item,
            maxPriority: maxPriority
          })
        })
        .catch(function (err) {
          console.log(chalk.red('Error while getting portfolio item with id ' + req.params.item_id + ': '))
          console.log(chalk.red(err))
          res.status(500).json({ error: err })
        })
    })


  // Edit portfolio item content

  .put(
    isLoggedIn,
    function (req, res) {
      if (!req.body.title || !req.body.description || !(typeof req.body.content === 'string')) {
        const errorMsg = 'Error: PUT request to /api/portfolio/:item_id should contain "title", ' +
          '"description" and "content" fields'
        console.log(chalk.red(errorMsg))
        res.status(400).json({ error: errorMsg })
        return
      }
      PortfolioItem.findById(req.params.item_id, function (err, item) {
        if (err) {
          console.log(chalk.red('Error while updating portfolio item with id ' + req.params.item_id + ': '))
          console.log(chalk.red(err))
          res.status(500).json({ error: err })
        } else {
          item.title = req.body.title
          item.description = req.body.description
          item.priority = req.body.priority || Infinity
          item.content = req.body.content
          item.save(function (err) {
            if (err) {
              console.log(chalk.red('Error while updating portfolio item with id ' + req.params.item_id + ': '))
              console.log(chalk.red(err))
              res.status(500).json({ error: err })
            } else {
              res.json({ itemID: item._id })
            }
          })
        }
      })
    })


  // Delete portfolio item

  .delete(
    isLoggedIn,
    function (req, res) {
      PortfolioItem.remove({
        _id: req.params.item_id
      }, function (err, item) {
        if (err) {
          console.log(chalk.red('Error while deleting portfolio item with id ' + req.params.item_id + ': '))
          console.log(chalk.red(err))
          res.status(500).json({ error: err })
        } else {
          res.json({ itemID: item._id })
        }
      })
    })


// File upload

router.route('/api/uploadimg')

  .post(
    isLoggedIn,
    upload.array('image', 1),
    function (req, res) {

      // req.files is array of files
      // req.files[i] looks like:
      /*
       {
       fieldname: 'myfile',
       originalname: '12912531_225240144508422_22998161_n.jpg',
       encoding: '7bit',
       mimetype: 'image/jpeg',
       destination: 'uploads/',
       filename: '2b0831e79589b8cd722568c9e5259b63',
       path: 'uploads/2b0831e79589b8cd722568c9e5259b63',
       size: 54728
       }
       */

      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i]
        if (!(file.mimetype.startsWith('image/'))) {
          console.log(file.mimetype + ' is not an image and will be deleted')
          deleteFile(file.path)
          continue
        }
        const extension = file.originalname.match(/\.\w+$/)
        if (!extension) {
          console.log(file.originalname + ' has no extension and will be deleted')
          deleteFile(file.path)
        } else {
          file.pathWithExtension = file.path + extension[0]
          fs.rename(file.path, file.pathWithExtension, function () {
            // const fullUrl = req.protocol + '://' + req.get('host') + '/';
            console.log(chalk.cyan(`Image uploaded: ${file.originalname}`))
            res.json({
              path: file.pathWithExtension,
              success: true
            })
          })
        }
      }
    }
  )



// ============== /API ==============

app.use('/', router)



app.listen(port)
console.log(chalk.green('App listening on port ' + port))
PortfolioItem.count({})
  .then(function (count) {
    console.log(chalk.green('Portfolio items in DB: ' + count))
  })
