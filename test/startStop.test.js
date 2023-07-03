import {
  describe, it, expect, jest, beforeEach, afterEach,
} from '@jest/globals';
import Website from '../models/website.js';
import logger from '../logger.js';

import startStopWebsite from '../services/website.js'; // הוסף את הנתיב המדויק של הפונקציה

describe('startStopWebsite', () => {
  let websiteId;
  let website;

  beforeEach(() => {
    websiteId = '6476fb4b3eff4848430b4f93'; // ערך דומי למזהה של האתר
    website = {
      id: websiteId,
      status: 'About to be inactive',
      save: jest.fn(),
    };
    logger.info(website.id);
    Website.findById = jest.fn().mockResolvedValue(website);
    logger.info(website.id);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should change website status to "Inactive" if current status is "About to be inactive"', async () => {
    logger.info(website.id);
    logger.info(website.id);
    await startStopWebsite(websiteId);
    logger.info(website.id);
    expect(website.status).toBe('Inactive');
    expect(website.save).toHaveBeenCalled();
  });

  it('should change website status to "Active" if current status is "About to be active"', async () => {
    website.status = 'About to be active';
    await startStopWebsite(websiteId);
    expect(website.status).toBe('Active');
    expect(website.save).toHaveBeenCalled();
  });

  it('should not change website status if current status is already "Inactive" or "Active"', async () => {
    website.status = 'Inactive';
    await startStopWebsite(websiteId);
    expect(website.status).toBe('Inactive');
    expect(website.save).not.toHaveBeenCalled();
    website.status = 'Active';
    await startStopWebsite(websiteId);
    expect(website.status).toBe('Active');
    expect(website.save).not.toHaveBeenCalled();
  });

  it('should handle errors and log "Internal Server Error"', async () => {
    Website.findById.mockRejectedValueOnce(new Error('Internal Server Error'));
    const loggerErrorSpy = jest.spyOn(logger, 'error');
    await startStopWebsite(websiteId);
    expect(loggerErrorSpy).toHaveBeenCalledWith('Internal Server Error');
  });
});
