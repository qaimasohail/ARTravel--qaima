var mongoose = require('mongoose');


var travellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    owned: { type: String, required: false },
    
});

var traveller = mongoose.model('travellers', travellerSchema);


module.exports = traveller;

