import Website from '../models/website.js';
import sendToRabbitMQ from '../rabbitMQ/send_message.js';

export const startStopWebsitePart2 = async (websiteId) => {
  try {
    const website = await Website.findById(websiteId);
    if (!website) return { error: 'Website doesnt found' };
    if (website.status === 'About to be inactive') {
      website.status = 'Inactive';
      await website.save();
      return { success: true, message: `seccuss change status to ${website.status}` };
    } if (website.status === 'About to be active') {
      website.status = 'Active';
      await website.save();
      return { success: true, message: `seccuss change status to ${website.status}` };
    } return { error: `This website is already ${website.status}` };
  } catch (error) {
    return { error: error.message };
  }
};

export const startStopWebsitePart1 = async (websiteId) => {
  try {
    const website = await Website.findById(websiteId);
    if (!website) return { error: 'Website doesnt found' };
    if (website.status === 'Active') {
      website.status = 'About to be inactive';
      await website.save();
      sendToRabbitMQ(websiteId, 'startStopWebsitePart2');
      return { success: true, message: `seccuss change status to ${website.status}` };
    }
    if (website.status === 'Inactive') {
      website.status = 'About to be active';
      await website.save();
      sendToRabbitMQ(websiteId, 'startStopWebsitePart2');
      return { success: true, message: `seccuss change status to ${website.status}` };
    }
    return { error: `This website is already ${website.status}` };
  } catch (error) {
    return { error: 'Internal several error' };
  }
};
