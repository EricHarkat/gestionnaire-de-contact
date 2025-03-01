const mongoose = require('mongoose');

const computerSchema = new mongoose.Schema({
    serialNumber: String,
    type: String,
    operatingSystem: String,
    owner: String,
    state: String,
    stateDetails: String,
    date: String
  });
  
  module.exports = mongoose.model('Computer', computerSchema);