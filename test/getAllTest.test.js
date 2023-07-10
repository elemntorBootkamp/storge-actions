import Website from '../models/website.js';
import { getAll } from '../services/website.js';

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
    expect(result).toEqual({ message: 'There are no websites' });
  });

  it('should return an error if an exception occurs', async () => {
    const error = new Error('Some error');
    Website.find = jest.fn().mockRejectedValue(error);

    const result = await getAll();

    expect(Website.find).toHaveBeenCalled();
    expect(result).toEqual({ error: error.message });
  });
});
