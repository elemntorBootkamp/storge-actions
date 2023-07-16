import Website from '../models/website.js';
import sendToRabbitMQ from '../rabbitMQ/send_message.js';
import { WebStatusEnum, cpuEnum } from '../enums/website.js';

export const createWeb = async (data) => {
  const website = new Website(data);
  await website.save();
  return { success: true, message: data };
};
export const getWebById = async (webid) => {
  const website = await Website.findById(webid);
  if (!website) {
    throw new Error(`Website with id ${webid} not found`);
  } else {
    return website;
  }
};
export const getAll = async () => {
  try {
    const websites = await Website.find({ status: WebStatusEnum.active });
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
export const startStopWebsitePart1 = async (websiteId) => {
  try {
    const website = await Website.findById(websiteId);
    if (!website) return { error: 'Website doesnt found' };
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
export const goingDeleteWebsite = async (id) => {
  try {
    const website = await Website.findById(id);
    if (!website) return { error: `Website with id ${id} not found` };
    if (website.status !== WebStatusEnum.deleted
      && website.status !== WebStatusEnum.about_to_be_deleted) {
      website.status = WebStatusEnum.about_to_be_deleted;
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
