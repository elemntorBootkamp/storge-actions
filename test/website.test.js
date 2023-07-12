import {
  getAll, deleteWebsite, goingDeleteWebsite, startStopWebsitePart2,
} from '../services/website.js';
import Website from '../models/website.js';

jest.mock('../models/website.js');

describe('getAll', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return all websites', async () => {
    const websites = [
      { id: '1', name: 'Website 1' },
      { id: '2', name: 'Website 2' },
    ];
    Website.find = jest.fn().mockResolvedValue(websites);

    const result = await getAll();

    expect(Website.find).toHaveBeenCalled();
    expect(result).toEqual(websites);
  });

  it('should return a message if there are no websites', async () => {
    Website.find = jest.fn().mockResolvedValue(null);

    const result = await getAll();

    expect(Website.find).toHaveBeenCalled();
    expect(result).toEqual({ error: 'There are no active websites' });
  });

  it('should return an error if an exception occurs', async () => {
    const error = new Error('Some error');
    Website.find = jest.fn().mockRejectedValue(error);

    const result = await getAll();

    expect(Website.find).toHaveBeenCalled();
    expect(result).toEqual({ error: error.message });
  });
});

describe('goingDeleteWebsite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a website with the given id', async () => {
    const id = '123';
    const website = {
      id: '123',
      status: 'Active',
      save: jest.fn(),
    };
    Website.findById = jest.fn().mockResolvedValue(website);

    const result = await goingDeleteWebsite(id);

    expect(Website.findById).toHaveBeenCalledWith(id);
    expect(website.status).toBe('About to be deleted');
    expect(website.save).toHaveBeenCalled();
    expect(result).toEqual({ success: true, message: `the website with id: ${id} is going to be deleted` });
  });

  it('should return an error if the website is already deleted', async () => {
    const id = '123';
    const website = {
      id: '123',
      status: 'Deleted',
    };
    Website.findById = jest.fn().mockResolvedValue(website);

    const result = await goingDeleteWebsite(id);

    expect(Website.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual({ error: `This website is already ${website.status}` });
  });

  it('should return an error if an exception occurs', async () => {
    const id = '123';
    const error = new Error('Some error');
    Website.findById = jest.fn().mockRejectedValue(error);

    const result = await goingDeleteWebsite(id);

    expect(Website.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual({ error: error.message });
  });
});

describe('deleteWebsite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a website with the given id', async () => {
    const id = '123';
    const website = {
      id: '123',
      status: 'About to be deleted',
      save: jest.fn(),
    };
    Website.findById = jest.fn().mockResolvedValue(website);

    const result = await deleteWebsite(id);

    expect(Website.findById).toHaveBeenCalledWith(id);
    expect(website.status).toBe('Deleted');
    expect(website.save).toHaveBeenCalled();
    expect(result).toEqual({ success: true, message: `the website with id: ${id} is going to be deleted` });
  });

  it('should return an error if the website is already deleted', async () => {
    const id = '123';
    const website = {
      id: '123',
      status: 'Deleted',
    };
    Website.findById = jest.fn().mockResolvedValue(website);

    const result = await deleteWebsite(id);

    expect(Website.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual({ error: `This website is already ${website.status}` });
  });

  it('should return an error if an exception occurs', async () => {
    const id = '123';
    const error = new Error('Some error');
    Website.findById = jest.fn().mockRejectedValue(error);

    const result = await deleteWebsite(id);

    expect(Website.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual({ error: error.message });
  });
});
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
