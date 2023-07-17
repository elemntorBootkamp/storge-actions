import logger from '../logger.js';
import {
  startStopWebsitePart1, goingDeleteWebsite, createWeb, getWebById, getAll, getAllCPUValues,
} from '../services/website.js';

export const getAllWebsites = async (req, res) => {
  /*
 #swagger.tags=['Website']
 #swagger.parameters['manager_id'] = {
        in: 'header',
        required: true,
        type: 'string',
        description: 'The ID of the user making the request'
      }
    */
  try {
    const managerId = req.headers.managerid;
    const result = await getAll(managerId);
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
   #swagger.parameters['manager_id'] = {
        in: 'header',
        required: true,
        type: 'string',
        description: 'The ID of the user making the request'
      }
    */
  const webid = req.params.id;
  const managerId = req.headers.manager_id;
  try {
    const result = await getWebById(webid, managerId);
    if (result.error) {
      if (result.error === `Website with id ${webid} not found`) res.status(404).send({ error: result.error });
      else if (result.error === `Website with managerId ${managerId} not found`) res.status(404).send({ error: result.error });
      else res.status(500).send({ error: result.error });
    } else res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
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
    res.status(200).send({ message: result.message, res: result.res });
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
 #swagger.parameters['user_id'] = {
      in: 'header',
      required: true,
      type: 'string',
      description: 'The ID of the user making the request'
    }
*/
  try {
    const websiteId = req.params.id;
    const userId = req.headers.user_id;
    const result = await startStopWebsitePart1(websiteId, userId);
    if (result.error) {
      if (result.error === 'Internal several error') {
        res.status(500).send({ error: result.error });
      } else if (result.error === 'Website doesnt found') {
        res.status(404).send({ error: result.error });
      } else if (result.error === 'This user can not delete this website') {
        res.status(400).send({ error: result.error });
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
 #swagger.parameters['webId'] = {
      in: 'path',
      required: true,
      type: 'string',
      description: 'The ID of the website to delete'
    }
    #swagger.parameters['user_id'] = {
      in: 'header',
      required: true,
      type: 'string',
      description: 'The ID of the user making the request'
    }
  */
  const { webId } = req.params;
  const userId = req.headers.user_id;
  try {
    const result = await goingDeleteWebsite(webId, userId);
    if (result.error) {
      if (result.error === `Website with id ${webId} not found`) res.status(404).send({ message: result.error });
      else if (result.error === 'This user can not delete this website') res.status(400).send({ message: result.error });
      else if (result.error === 'This website is already deleted') res.status(400).send({ message: result.error });
      else res.status(500).send({ error: result.error });
    } else res.status(200).send(result);
  } catch (error) {
    logger.error('500');
    res.status(500).send({ error: error.message });
  }
};
export async function getAllCPUValuesController(req, res) {
  /*
 #swagger.tags=['Website']
 */
  try {
    const cpuValues = await getAllCPUValues();
    res.status(200).json(cpuValues);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
