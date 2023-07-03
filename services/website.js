import Website from '../models/website.js';
import logger from '../logger.js';

const deleteWebsit = async (id) => {
  try {
    const website = await Website.findById(id);
    if (website.status === 'About to be deleted') {
      website.status = 'Deleted';
      await website.save();
      logger.info('website deleted');
    } else logger.info(`This website is already ${website.status}`);
  } catch (error) {
    logger.error(error);
  }
};
export default deleteWebsit;
