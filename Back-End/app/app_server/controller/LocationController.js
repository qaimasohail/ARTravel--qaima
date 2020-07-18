var locationSchema = require('../models/LocationModal')


var locationController = {




    addlocation: (req, res, next) => {


        var location = new locationSchema(req.body)

        if (req.body.name != "" || req.body.artist != "")
            location.save((err) => {
                if (err) console.log("Not Saved")

                console.log("saved")
                res.end("location added")
            })
        else {
            res.end("location not added")
        }

    },

    viewlocation: (req, res, next) => {

        var name = req.params.name

        locationSchema.findOne({ 'name': req.params.name }, function (err, result) {
            if (err) return handleError(err);

            if (!result) { res.send("No location Exist") }
            else {
                res.json(result)

            }
        });


    },

    deletelocation: (req, res, next) => {

        var id = req.body.id;

        locationSchema.findById(id, (err, doc) => {

            if (err)
                return handleError(err);

            if (doc) {
                doc.remove(() => {
                    res.end("location deleted")
                })
            }
            else {
                res.end("location does not exist")
            }


        })

    },

    updatelocation: (req, res, next) => {

        locationSchema.findByIdAndUpdate(req.params.id,

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
                return res.send("location updated");
            })


    },

    viewAlllocation: (req, res, next) => {
        locationSchema.find({}, (err, result) => {
            if (err) return handleError(err);
            res.json(result)
        })
    },

    buylocation: (req, res, next) => {
            locationSchema.findOneAndUpdate({"name":req.body.name},req.body,(err, result) => {
                if (err) return handleError(err);
                res.send("updated")
            })
        },






}





module.exports = locationController