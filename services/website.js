import Website from '../models/website.js';

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
