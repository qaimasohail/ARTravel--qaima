var mongoose = require('mongoose');


var locationSchema = new mongoose.Schema({
    address: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    description: { type: String, required: true }
    
});

var location = mongoose.model('locations', locationSchema);


module.exports = location;

