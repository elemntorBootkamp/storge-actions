import Website from '../models/website.js';
import Backup from '../models/backup.js';
import logger from '../logger.js';

export const backupSite = async (data) => {
  const website = data.data;
  const newWebsite = new Website({
    title: website.title,
    description: website.description,
    domain: website.domain,
    typeOfDomain: website.typeOfDomain,
    cpu: website.cpu,
    memory: website.memory,
    status: 1,
  });

  const newBackup = new Backup({
    siteId: newWebsite.id,
    description: website.description,
  });

  await newWebsite.save();

  await newBackup.save();
  logger.info('Website copied successfully');
};

export const deleteWebsit = async (id) => {
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
