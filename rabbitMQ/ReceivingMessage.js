import amqp from 'amqplib';
import { backupSite, deleteWebsit } from '../services/service.js';
import logger from '../logger.js';

export const handleData = async (data) => {
  const action = data.extraParam;
  switch (action) {
  case 'backupSite':
    backupSite(data);
    break;
  case 'deleteWebsit':
    deleteWebsit(data.data);
    break;
  default:
    logger.info(`Function ${action} not found.`);
  }
};

export const startConsumer = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queueName = 'website-subscriptions';
  const durable = false;
  await channel.assertQueue(queueName, { durable });

  channel.consume(queueName, (message) => {
    const data = JSON.parse(message.content.toString());
    handleData(data);
  }, { noAck: true });

  logger.info(`Waiting for messages in ${queueName}...`);
};
export default startConsumer;
