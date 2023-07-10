/* eslint-disable max-len */
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

// const websitesList = [
//   {
//     name: 'Google',
//     description: 'A search engine',
//     manager: 'Sundar Pichai',
//     datePublished: new Date('08-19-2006'),
//     size: '15000 GB',
//     websiteLogo: 'https://upload.wikimedia.org/wikipedia/he/f/f6/Googleisrael.png',
//   },
//   {
//     name: 'WikipediaGoogle',
//     description: 'A free online encyclopedia',
//     manager: 'Sundar Pichai', // Katherine Maher
//     datePublished: new Date('2001-01-15'),
//     size: '12000 GB',
//     websiteLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/640px-Wikipedia-logo-v2.svg.png',
//   },
//   {
//     name: 'Stack Overflow',
//     description: 'A question and answer site for professional and enthusiast programmers',
//     manager: 'Prashanth Chandrasekar',
//     datePublished: Date.parse('2008-09-15'),
//     size: 'Varies depending on content',
//     websiteLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/1920px-Stack_Overflow_logo.svg.png',
//   },
//   {
//     name: 'GitHub',
//     description: 'A web-based platform for version control and collaboration',
//     manager: 'Nat Friedman',
//     datePublished: Date.parse('2008-04-10'),
//     size: 'Varies depending on content',
//     websiteLogo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
//   },
//   {
//     name: 'Docker',
//     description: 'A platform for developing, shipping, and running applications using containerization',
//     manager: 'Steve Singh',
//     datePublished: Date.parse('2013-3-13'),
//     size: '150 MB',
//     websiteLogo: 'https://www.zadara.com/wp-content/uploads/docker.png',
//   },
//   {
//     name: 'Keycloak',
//     description: 'An open-source identity and access management solution for modern applications and services',
//     manager: 'Sundar Pichai', // Stian Thorgersen
//     datePublished: Date.parse('2014-6-10'),
//     size: '40 MB',
//     websiteLogo: 'https://www.keycloak.org/resources/images/keycloak_logo_200px.svg',
//   },
//   {
//     name: 'Pinterest',
//     description: 'A visual discovery platform',
//     manager: 'Ben Silbermann',
//     datePublished: new Date('2010-03-01'),
//     size: '3000 GB',
//     websiteLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pinterest-logo.png/640px-Pinterest-logo.png',
//   },
// ];

// export const Websites = (req, res) => {
//   res.send(websitesList);
// };
