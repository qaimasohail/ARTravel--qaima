var express = require('express');
var router = express.Router();


var travellerController  =   require('../controller/travellerController')



router.get('/viewall', travellerController.viewAlltraveller);

router.post('/addtraveller', travellerController.addtraveller);

router.get('/:name', travellerController.viewtraveller);

router.put('/update/:id', travellerController.updatetraveller);

router.delete('/delete', travellerController.deletetraveller);

router.post('/login', travellerController.login);
















module.exports = router;
