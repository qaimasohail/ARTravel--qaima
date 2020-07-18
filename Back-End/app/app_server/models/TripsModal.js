var mongoose = require('mongoose');


var TripsSchema = new mongoose.Schema({
    duration: { type: Number, required: true },
    startLong: { type: Number, required: true },
    startLat: { type: Number, required: true },
    endLong: { type: Number, required: true },
    endLat: { type: Number, required: true },
    distance: { type: Number, required: true },
    
    

});

var Trips = mongoose.model('Trips', TripsSchema);


module.exports = Trips;

