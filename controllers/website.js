import Website from '../models/website.js';

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
