const website= require("../models/website")


module.exports = {

    getAllWebsites: (req, res) => {
        User.find()
            .then((websites) => { res.status(200).send({ websites }) })
            .catch((error) => { res.status(404).send({ message: error.message }) })
    },
    addWebsite:(req,res)=> {
        const website= new website(req.body);
        website.save(function(error) { 
              if (error)
                  res.status(404).send(err)
            else
            res.status(200).send(website)
           })
        }
}