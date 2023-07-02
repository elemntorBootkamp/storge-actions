import logger from '../logger.js';
import Website from '../models/website.js';

const startStopWebsite = async (websiteId) => {
  try {
    const website = await Website.findById(websiteId);
    if (website.status === 'About to be inactive') {
      website.status = 'Inactive';
      await website.save();
      logger.info(`seccuss change status to ${website.status}`);
    } else if (website.status === 'About to be active') {
      website.status = 'Active';
      await website.save();
      logger.info(`seccuss change status to ${website.status}`);
    } else logger.error(`This website is already ${website.status}`);
  } catch (error) {
    logger.error('Internal Server Error');
  }
};
export default startStopWebsite;
