const beckup= require("../models/beckup")


module.exports = {

    getAllBeckups: (req, res) => {
        User.find()
            .then((beckups) => { res.status(200).send({ beckups }) })
            .catch((error) => { res.status(404).send({ message: error.message }) })
    },
    addBeckup:(req,res)=> {
        const beckups= new beckups(req.body);
        beckups.save(function(error) { 
              if (error)
                  res.status(404).send(err)
            else
            res.status(200).send(website)
           })
        }
}