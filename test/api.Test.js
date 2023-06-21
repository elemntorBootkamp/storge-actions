//const express = require('express');
const Website = require('../models/website');
//import jest from "jest";
const express = require('express');
const Website = require('./models/website');

// Create a new module
const test = {};

// Import the Jest module
test.jest = require('jest');


describe('getAllWebsites', () => {
  it('should return all websites', async () => {
    const app = express();
    app.use(express.json());
    app.use('/website', Website.routes());

    await app.listen(3000);

    const res = await fetch('http://localhost:3000/website', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(res.status).toBe(200);
    const websites = await res.json();
    expect(websites).toHaveLength(1);
  });
});
