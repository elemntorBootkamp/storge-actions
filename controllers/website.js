import Website from '../models/website.js';
import logger from '../logger.js';
import sendToRabbitMQ from '../rabbitMQ/send_message.js';

export const getAllWebsites = (req, res) => {
  /*
 #swagger.tags=['Website']
 */
  Website.find()
    .then((websites) => { res.status(200).send({ websites }); })
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
export const deleteWebsit = async (req, res) => {
  /*
#swagger.tags=['Website']
*/
  /*
#swagger.parameters['id'] = {
         in: 'path',
              required: true,
          schema: { $ref: "#/definitions/deleteWebsite" }
      }
  */
  const webId = req.params.id;
  logger.info(webId);
  try {
    const website = await Website.findById(webId);
    if (website.status !== 'Deleted') {
      website.status = 'About to be deleted';
      await website.save();
      sendToRabbitMQ(webId, 'deleteWebsit');
      return res.status(200).send(website);
    }
    if (!website) return res.status(404).json({ message: `Website with id ${webId} not found` });
    return res.status(400).send({ message: 'This website is already deleted' });
  } catch (error) {
    logger.error(error);
    return res.status(500).json(error.message);
  }
};
