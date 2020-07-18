var mongoose = require('mongoose');


var travellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    bitmojiPath: { type: String, required: true },
    profileImage: { type: String, required: true },
    currentLat: { type: Number, required: false },
    currentLong: { type: Number, required: false },
    
    
});

var traveller = mongoose.model('travellers', travellerSchema);


module.exports = traveller;

