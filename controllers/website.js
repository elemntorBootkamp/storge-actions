import Website from '../models/website.js';
// import startStopWebsites from '../services/website.js';
import sendToRabbitMQ from '../rabbitMQ/send_message.js';

export const getAllWebsites = (req, res) => {
/*
  #swagger.tags=['Website']
  */
  Website.find()
    .then((websites) => {
      res.status(200).send({ websites });
    })
    .catch((error) => { res.status(404).send({ message: error.message }); });
};
export const addWebsite = async (req, res) => {
  /*
  #swagger.tags=['Website']
  */
  /*
  #swagger.parameters['website'] = {
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
};
export const startStopWebsite = async (req, res) => {
/*
#swagger.tags=['Website']
*/
  /*
#swagger.parameters['id'] = {
   in: 'path',
     required: true,
   schema: { $ref: "#/definitions/startStopWebsite" }
 }
*/
  const websiteId = req.params.id;
  try {
    const website = await Website.findById(websiteId);
    if (website.status === 'Active') {
      website.status = 'About to be inactive';
      await website.save();
      sendToRabbitMQ(websiteId, 'startStopWebsites');
      return res.status(200).send(website);
    }
    if (website.status === 'Inactive') {
      website.status = 'About to be active';
      await website.save();
      sendToRabbitMQ(websiteId, 'startStopWebsites');
      return res.status(200).send(website);
    }
    return res.status(400).json({ message: `This website is already ${website.status}` });
  } catch (error) {
    return res.status(500).send(error);
  }
};
