import Website from '../models/website.js';
import logger from '../logger.js';
import { goingDeleteWebsite } from '../services/website.js';

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
    const result = await goingDeleteWebsite(webId);
    if (result.error) {
      if (result.error === `Website with id ${webId} not found`) res.status(404).send({ message: result.error });
      else if (result.error === 'This website is already Deleted') res.status(400).send({ message: result.error });
      else res.status(500).send({ message: result.error });
    } else res.status(200).send(result);
  } catch (error) {
    logger.error('500');
    res.status(500).send({ message: error.message });
  }
};
export const tryTest = async () => true;
