import mongoose from 'mongoose';
import Website from '../models/website.js';
import logger from '../logger.js';
import { createWeb, getWebById } from '../services/website.js';

export const getAllWebsites = (req, res) => {
  /*

  #swagger.tags=['Website']
  */
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(process.env.DB_CONNECTION, connectionParams)
    .then(() => {
      logger.info('Connected to MongoDB');
    })
    .catch((error) => {
      logger.error(`Error connecting to MongoDB: ${error}`);
    });
  Website.find()
    .then((websites) => { res.status(200).send({ websites }); })
    .catch((error) => { res.status(404).send({ message: error.message }); });
};
export const getWebsiteById = async (req, res) => {
  /*
  #swagger.tags=['Website']
  #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      schema: { $ref: "#/definitions/getWebsiteById" }
  }
  */
  const webid = req.params.id;
  try {
    const website = await getWebById(webid);
    res.status(200).send(website);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
export const createWebsite = async (req, res) => {
  /*
  #swagger.tags=['Website']
 #swagger.parameters['website'] = {
           in: 'body',
                required: true,
            schema: { $ref: "#/definitions/createWebsite" }
        }
*/
  try {
    const result = await createWeb(req.body);
    res.status(200).send({ message: result.message });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
