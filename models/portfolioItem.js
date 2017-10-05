const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PortfolioModel = function () {
  const portfolioSchema = Schema({
    title: String,
    dateCreated: Date,
    description: String,
    priority: Number,
    content: String,
    hide: Boolean
  })
  
  portfolioSchema.pre('save', function (next) {
    // Continue with the save operation
    next()
  })
  
  return mongoose.model('PortfolioEntry', portfolioSchema)
}

module.exports = new PortfolioModel()
