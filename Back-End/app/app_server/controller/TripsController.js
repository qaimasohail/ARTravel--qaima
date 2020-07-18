var TripsSchema = require('../models/TripsModal')


var TripsController = {




    addTrips: (req, res, next) => {


        var Trips = new TripsSchema(req.body)

        Trips.save((err) => {
            if (err) console.log("Not Saved")
           else{
            res.end("Trips added")
           }
            res.end("Trips added")
        })

    },

    viewTrips: (req, res, next) => {

        var name = req.params.name

        TripsSchema.findOne({ 'name': req.params.name }, function (err, result) {
            if (err) return handleError(err);

            if (!result) { res.send("No Trips Exist") }
            else {
                res.json(result)

            }
        });


    },

    deleteTrips: (req, res, next) => {

        var id = req.body.id;

        TripsSchema.findById(id, (err, doc) => {

            if (err)
                return handleError(err);

            if (doc) {
                doc.remove(() => {
                    res.end("Trips deleted")
                })
            }
            else {
                res.end("Trips does not exist")
            }


        })

    },

    updateTrips: (req, res, next) => {

        TripsSchema.findByIdAndUpdate(req.params.id,

            // the change to be made. Mongoose will smartly combine your existing 
            // document with this change, which allows for partial updates too
            req.body,

            // an option that asks mongoose to return the updated version 
            // of the document instead of the pre-updated one.
            { new: true },

            // the callback function
            (err, todo) => {
                // Handle any possible database errors
                if (err) return res.status(500).send(err);
                return res.send("Trips updated");
            })


    },

    viewAllTrips: (req, res, next) => {
        TripsSchema.find({}, (err, result) => {
            if (err) return handleError(err);
                res.json(result)   
        })
    },

    login: (req, res, next) => {
        var username = req.body.name;
        var password = req.body.password;
        TripsSchema.findOne({ 'name': username ,'password':password}, function (err, result) {
            if (err) return handleError(err);

            if (!result) { res.send("No Trips Exist") }
            else {
                res.send("Exist")

            }
        });

    }



}





module.exports = TripsController