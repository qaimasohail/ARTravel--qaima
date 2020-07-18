var express = require('express');
var router = express.Router();


var locationController  =   require('../controller/LocationController')



router.get('/viewall', locationController.viewAlllocation);

router.post('/addlocation', locationController.addlocation);

router.get('/:name', locationController.viewlocation);

router.put('/update/:id', locationController.updatelocation);

router.delete('/delete', locationController.deletelocation);

router.post('/buylocation', locationController.buylocation);

















module.exports = router;
