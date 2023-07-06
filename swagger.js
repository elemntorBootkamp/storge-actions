import swaggerAutogen from 'swagger-autogen';
import logger from './logger.js';

const outputFile = './swagger_output.json';
const routesFiles = ['./routes/website.js', './routes/backup.js'];

const doc = {
  info: {
    version: '1.0.0',
    title: 'My API',
    description: 'Documentation automatically generated by the <b>swagger-autogen</b> module.',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'website',
      description: 'Endpoints',
    },
    {
      name: 'backup',
      description: 'Endpoints',
    },
  ],
  definitions: {
    Website: {
      title: 'fdghjk',
      description: 'fghj',
      domain: ['hkl'],
      typeOfDomain: 'school',
      cpu: 'intel core i7',
      memory: 673,
      status: 'Active',
    },
    addWebsite: {
      $title: 'fdghjk,',
      $description: 'fghj',
      $domain: ['hkl'],
      $typeOfDomain: 'school',
      $cpu: 'intel core i7',
      $memory: 673,
      $status: 'Active',
    },
    deleteWebsite: {
      $_id: '6476fafd31fe80568d17ccb5',
    },
    Backup: {
      siteId: 1,
      description: 'fghj',
    },
    addBackup: {
      $siteId: 1,
      $description: 'fghj',
    },
  },
};
swaggerAutogen(outputFile, routesFiles, doc).then(() => {
  logger.info('run');
});

export default doc;
