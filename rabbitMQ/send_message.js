import amqp from 'amqplib';
import logger from '../logger.js';
import { queueName } from './config.js';

const sendToRabbitMQ = async (data, extraParam) => {
  const queue = queueName;
  let connection;
  try {
    connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const message = {
      data,
      extraParam,
    };
    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    logger.info(' [x] Sent \'%s\'', message);
    await channel.close();
  } catch (err) {
    logger.error(err);
  } finally {
    if (connection) await connection.close();
  }
};
export default sendToRabbitMQ;
