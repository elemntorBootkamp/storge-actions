import Website from '../models/website.js';

export const getAllWebsites = (req, res) => {
  /*

  #swagger.tags=['Website']
  */
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
  const website = await Website.findById(webid);
  if (!website) {
    res.status(404).send({ message: `Website with id ${webid} not found` });
  } else {
    res.status(200).send(website);
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
  const website = req.body;
  const website1 = new Website(website);
  try {
    await website1.save();
    res.status(201).json(website1);
  } catch (error) {
    res.status(409).json({ message: error.message });

  }
};
