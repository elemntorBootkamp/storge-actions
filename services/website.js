import Website from '../models/website.js';
import sendToRabbitMQ from '../rabbitMQ/send_message.js';

export const getAll = async () => {
  try {
    const websites = await Website.find();
    if (!websites) return { message: 'There are no websites' };
    return websites;
  } catch (err) {
    return { error: err.message };
  }
};

export const goingDeleteWebsite = async (id) => {
  try {
    const website = await Website.findById(id);
    if (!website) return { error: `Website with id ${id} not found` };
    if (website.status !== 'Deleted') {
      website.status = 'About to be deleted';
      await website.save();
      sendToRabbitMQ(id, 'deleteWebsit');
      return { success: true, message: `the website with id: ${id} is going to be deleted` };
    }
    return { error: 'This website is already Deleted' };
  } catch (err) {
    return { error: err.message };
  }
};
export const deleteWebsite = async (id) => {
  try {
    const website = await Website.findById(id);
    if (website.status === 'About to be deleted') {
      website.status = 'Deleted';
      await website.save();
      return { success: true, message: `the website with id: ${id} is going to be deleted` };
    }
    return { error: `This website is already ${website.status}` };
  } catch (err) {
    return { error: err.message };
  }
};
