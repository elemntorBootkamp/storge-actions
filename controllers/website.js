const Website = require('../models/website');

module.exports = {

  getAllWebsites: (req, res) => {
    Website.find()
      .then((websites) => { res.status(200).send({ websites }); })
      .catch((error) => { res.status(404).send({ message: error.message }); });
  },
  getWebsiteById: async (req, res) => {

    const id = req.params.id;
    const website = await Website.findById(id);
    if (!website) {
      res.status(404).send({ message: `Website with id ${id} not found` });
    } else {
      res.status(200).send(website);
    }

  },
  addWebsite: async (req, res) => {
    const website = await new Website(req.body);
    try {
      await website.save();
      res.status(200).send(website);
    } catch (err) {
      res.status(404).send(err);
    }
  },
  tryTest: () => true,
};
