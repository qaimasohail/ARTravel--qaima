var express = require('express');
var router = express.Router();


var TripsController  =   require('../controller/TripsController')



router.get('/viewall', TripsController.viewAllTrips);

router.post('/addTrips', TripsController.addTrips);

router.get('/:name', TripsController.viewTrips);

router.put('/update/:id', TripsController.updateTrips);

router.delete('/delete', TripsController.deleteTrips);

router.post('/login', TripsController.login);
















module.exports = router;
