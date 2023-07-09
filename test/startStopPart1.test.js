import {
  describe, it, expect, jest, afterEach,
} from '@jest/globals';
import { startStopWebsitePart2 } from '../services/website.js';
import Website from '../models/website.js';

jest.mock('../models/website.js');

describe('startStopWebsitePart2', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an error message if the website is not found', async () => {
    const websiteId = '6476fb4b3eff4848430b4f93';
    Website.findById.mockResolvedValue(null);

    const result = await startStopWebsitePart2(websiteId);

    expect(Website.findById).toHaveBeenCalledWith(websiteId);
    expect(result).toEqual({ error: 'Website doesnt found' });
  });

  it('should change the status to "Inactive" if the current status is "About to be inactive"', async () => {
    const websiteId = '6476fb4b3eff4848430b4f93';
    const website = { status: 'About to be inactive', save: jest.fn() };
    Website.findById.mockResolvedValue(website);

    const result = await startStopWebsitePart2(websiteId);

    expect(Website.findById).toHaveBeenCalledWith(websiteId);
    expect(website.status).toBe('Inactive');
    expect(website.save).toHaveBeenCalled();
    expect(result).toEqual({ success: true, message: `seccuss change status to ${website.status}` });
  });

  it('should change the status to "Active" if the current status is "About to be active"', async () => {
    const websiteId = '6476fb4b3eff4848430b4f93';
    const website = { status: 'About to be active', save: jest.fn() };
    Website.findById.mockResolvedValue(website);

    const result = await startStopWebsitePart2(websiteId);

    expect(Website.findById).toHaveBeenCalledWith(websiteId);
    expect(website.status).toBe('Active');
    expect(website.save).toHaveBeenCalled();
    expect(result).toEqual({ success: true, message: `seccuss change status to ${website.status}` });
  });

  it('should return an error message if the current status is neither "About to be inactive" nor "About to be active"', async () => {
    const websiteId = '6476fb4b3eff4848430b4f93';
    const website = { status: 'Active' };
    Website.findById.mockResolvedValue(website);

    const result = await startStopWebsitePart2(websiteId);

    expect(Website.findById).toHaveBeenCalledWith(websiteId);
    expect(result).toEqual({ error: `This website is already ${website.status}` });
  });

  it('should return an error message if an internal error occurs during the process', async () => {
    const websiteId = '6476fb4b3eff4848430b4f93';
    const error = new Error('Internal error');
    Website.findById.mockRejectedValue(error);

    const result = await startStopWebsitePart2(websiteId);

    expect(Website.findById).toHaveBeenCalledWith(websiteId);
    expect(result).toEqual({ error: error.message });
  });
});
