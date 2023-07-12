import logger from '../logger.js';
import {
  startStopWebsitePart1, goingDeleteWebsite, createWeb, getWebById, getAll,
} from '../services/website.js';

export const getAllWebsites = async (req, res) => {
  /*
 #swagger.tags=['Website']
 */
  try {
    const result = await getAll();
    if (result.error) {
      if (result.error === 'There are no active websites') res.status(404).send({ message: result.error });
      else res.status(500).send({ error: result.error });
    } else res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
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
  try {
    const websiteId = req.params.id;
    const result = await startStopWebsitePart1(websiteId);
    if (result.error) {
      if (result.error === 'Internal several error') {
        res.status(500).send({ error: result.error });
      } else if (result.error === 'Website doesnt found') {
        res.status(404).send({ error: result.error });
      } else {
        res.status(400).send({ error: result.error });
      }
    } else res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const deleteWebsit = async (req, res) => {
/*
#swagger.tags=['Website']
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
      else res.status(500).send({ error: result.error });
    } else res.status(200).send(result);
  } catch (error) {
    logger.error('500');
    res.status(500).send({ error: error.message });
  }
};
