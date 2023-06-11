// eslint-disable-next-line import/no-extraneous-dependencies
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const routesFiles = ['./routes/website.js', './routes/backup.js'];

const doc = {
  info: {
    version: '1.0.0',
    title: 'storge-action',
    description: '',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Website',
      description: 'Endpoints',
    },
    {
      name: 'Backup',
      description: 'Endpoints',
    },
  ],
  definitions: {
    Website: {
      title: 'My Website',
      description: 'A personal website showcasing my projects and interests',
      domain: ['mywebsite.com', 'www.mywebsite.com'],
      typeOfDomain: 'Primary',
      cpu: '4 GHz',
      memory: 8,
      status: 200,
    },
    addWebsite: {
      $title: 'My Website',
      $description: 'A personal website showcasing my projects and interests',
      $domain: ['mywebsite.com', 'www.mywebsite.com'],
      $typeOfDomain: 'Primary',
      $cpu: '4 GHz',
      $memory: 8,
      $status: 200,
    },
    Backup: {
      siteId: 12345,
      description: 'Backup from May 30, 2021',
    },
    addBackup: {
      $siteId: 12345,
      $descriprtion: 'Backup from May 30, 2021',
    },
  },
};

// eslint-disable-next-line global-require
swaggerAutogen(outputFile, routesFiles, doc).then(() => { require('./app'); });
