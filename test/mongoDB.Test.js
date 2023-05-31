const mongoose = require('mongoose');

describe('MongoDB Connection', function() {
  it('should connect to MongoDB', function() {
    return mongoose.connect('mongodb://localhost:27017/storge-action')
      .then(() => {
        console.log('MongoDB connection successful');
      })
      .catch((err) => {
        console.log('MongoDB connection error:', err);
        throw err;
      });
  });
});