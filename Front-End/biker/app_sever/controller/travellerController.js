var travellerSchema = require('../models/travellerModal')


var travellerController = {




    addtraveller: (req, res, next) => {


        var traveller = new travellerSchema(req.body)

        traveller.save((err) => {
            if (err) console.log("Not Saved")
            console.log("saved")
            res.end("traveller added")
        })

    },

    viewtraveller: (req, res, next) => {

        var name = req.params.name

        travellerSchema.findOne({ 'name': req.params.name }, function (err, result) {
            if (err) return handleError(err);

            if (!result) { res.send("No traveller Exist") }
            else {
                res.json(result)

            }
        });


    },

    deletetraveller: (req, res, next) => {

        var id = req.body.id;

        travellerSchema.findById(id, (err, doc) => {

            if (err)
                return handleError(err);

            if (doc) {
                doc.remove(() => {
                    res.end("traveller deleted")
                })
            }
            else {
                res.end("traveller does not exist")
            }


        })

    },

    updatetraveller: (req, res, next) => {

        travellerSchema.findByIdAndUpdate(req.params.id,

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
                return res.send("traveller updated");
            })


    },

    viewAlltraveller: (req, res, next) => {
        travellerSchema.find({}, (err, result) => {
            if (err) return handleError(err);
                res.json(result)   
        })
    },

    login: (req, res, next) => {
        var username = req.body.name;
        var password = req.body.password;
        travellerSchema.findOne({ 'name': username ,'password':password}, function (err, result) {
            if (err) return handleError(err);

            if (!result) { res.send("No traveller Exist") }
            else {
                res.send("Exist")

            }
        });

    }



}





module.exports = travellerController