import { deleteWebsite, goingDeleteWebsite } from '../services/website.js';
import Website from '../models/website.js';

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
