import Website from '../models/website.js';
import sendToRabbitMQ from '../rabbitMQ/send_message.js';
import { WebStatusEnum, cpuEnum } from '../enums/website.js';

export const createWeb = async (data) => {
  try {
  // eslint-disable-next-line no-param-reassign
    data.status = WebStatusEnum.pending;
    await sendToRabbitMQ(data, 'create');
    return { success: true, message: 'going to create website' };
  } catch (error) {
    return { error: error.message };
  }
};
export const create = async (data) => {
  try {
    const website = new Website(data);
    website.status = WebStatusEnum.active;

    await website.save();
    return { success: true, message: data };
  } catch (err) {
    // There should be a code for sending an email here
    return { error: err.message };
  }
};

export const getWebById = async (webid, managerId) => {
  try {
    const website = await Website.findOne({ _id: webid });
    if (!website) {
      return { error: `Website with id ${webid} not found` };
    } if (website.managerId !== managerId) {
      return { error: `Website with managerId ${managerId} not found` };
    }
    return website;
  } catch (err) {
    return { error: err.message };
  }
};

export const getAll = async (managerId) => {
  try {
    const websites = await Website.find({
      status: {
        $nin:
       [WebStatusEnum.deleted, WebStatusEnum.about_to_be_deleted],
      },
      managerId,
    }).limit(50);
    if (!websites || websites.length === 0) {
      return { error: 'There are no active websites' };
    }
    return websites;
  } catch (err) {
    return { error: err.message };
  }
};
export const startStopWebsitePart2 = async (websiteId) => {
  try {
    const website = await Website.findById(websiteId);
    if (!website) return { error: 'Website doesnt found' };
    if (website.status === WebStatusEnum.about_to_be_inactive) {
      website.status = WebStatusEnum.inactive;
      await website.save();
      return { success: true, message: `seccuss change status to ${website.status}` };
    } if (website.status === WebStatusEnum.about_to_be_active) {
      website.status = WebStatusEnum.active;
      await website.save();
      return { success: true, message: `seccuss change status to ${website.status}` };
    } return { error: `This website is already ${website.status}` };
  } catch (error) {
    return { error: error.message };
  }
};
export const startStopWebsitePart1 = async (websiteId, userId) => {
  try {
    const website = await Website.findById(websiteId);
    if (!website) return { error: 'Website doesnt found' };
    if (website.managerId !== userId) return { error: 'This user can not delete this website' };
    if (website.status === WebStatusEnum.active) {
      website.status = WebStatusEnum.about_to_be_inactive;
      await website.save();
      sendToRabbitMQ(websiteId, 'startStopWebsitePart2');
      return { success: true, message: `seccuss change status to ${website.status}` };
    }
    if (website.status === WebStatusEnum.inactive) {
      website.status = WebStatusEnum.about_to_be_active;
      await website.save();
      sendToRabbitMQ(websiteId, 'startStopWebsitePart2');
      return { success: true, message: `seccuss change status to ${website.status}` };
    }
    return { error: `This website is already ${website.status}` };
  } catch (error) {
    return { error: 'Internal several error' };
  }
};
export const goingDeleteWebsite = async (webId, userId) => {
  try {
    const website = await Website.findById(webId);
    if (!website) return { error: `Website with id ${webId} not found` };
    if (website.managerId !== userId) return { error: 'This user can not delete this website' };
    if (website.status !== WebStatusEnum.deleted
      && website.status !== WebStatusEnum.about_to_be_deleted) {
      website.status = WebStatusEnum.about_to_be_deleted;
      await website.save();
      sendToRabbitMQ(webId, 'deleteWebsit');
      return { success: true, message: `the website with id: ${webId} is going to be deleted` };
    }
    return { error: 'This website is already deleted' };
  } catch (err) {
    return { error: err.message };
  }
};
export const deleteWebsite = async (id) => {
  try {
    const website = await Website.findById(id);
    if (website.status === WebStatusEnum.about_to_be_deleted) {
      website.status = WebStatusEnum.deleted;
      await website.save();
      return { success: true, message: `the website with id: ${id} is going to be deleted` };
    }
    return { error: `This website is already ${website.status}` };
  } catch (err) {
    return { error: err.message };
  }
};
export async function getAllCPUValues() {
  try {
    return cpuEnum;
  } catch (err) {
    return { error: err.message };
  }
}
