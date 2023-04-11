const mongoose = require('mongoose')
// schema 
const Schema = mongoose.Schema
const StateClicksSchema = new Schema({
  state: String,
  clicks: Number
})

// Model
const StateClicks = mongoose.model('StateClicks', StateClicksSchema)

module.exports = StateClicks;