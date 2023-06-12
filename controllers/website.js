const Website = require('../models/website');

module.exports = {

  getAllWebsites: (req, res) => {
    /*
 #swagger.tags=['Website']
 */
    Website.find()
      .then((websites) => { res.status(200).send({ websites }); })
      .catch((error) => { res.status(404).send({ message: error.message }); });
  },
  addWebsite: async (req, res) => {
    /*
 #swagger.tags=['Website']
 */
    /*
 #swagger.parameters['bwebsite'] = {
           in: 'body',
                required: true,
            schema: { $ref: "#/definitions/addWebsite" }
        }
    */
    const website = await new Website(req.body);
    try {
      await website.save();
      res.status(200).send(website);
    } catch (err) {
      res.status(404).send(err);
    }
  },
  deleteWebsite: async (req, res) => {
    /*
 #swagger.tags=['Website']
 */
    /*
 #swagger.parameters['bwebsite'] = {
           in: 'body',
                required: true,
            schema: { $ref: "#/definitions/deleteWebsite" }
        }
    */
    const webId = req.params.id;
    try {
      const website = await Website.findById(webId);
      if (website.isDeleted === false) {
        website.isDeleted = true;
        await website.save();
        res.status(200).send(website);
      }
      res.status(400).send({ message: 'This website is already deleted!' });
    } catch (error) {
      res.status(404).send(error);
    }
  },
  tryTest: () => true,
};
