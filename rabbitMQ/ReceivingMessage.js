import amqp from 'amqplib';
import addWebsite from '../controllers/website';
import backupSite from '../Servise';

export const handleData = async (data) => {
  console.log(`Received message: ${data}`);
  const functionName = data.extraParam;
  console.log(data);
  switch (functionName) {
  case 'addWebsite':
    addWebsite(data);
    break;
  case 'backupSite':

    backupSite(data);
    break;
    // case 'addBackup':
    //   addBackup(data);
    //   break;
  default:
    console.log(`Function ${functionName} not found.`);
  }
};

export const startConsumer = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queueName = 'website-subscriptions';
  const durable = false; // Set durable to false to match the existing queue
  await channel.assertQueue(queueName, { durable });

  channel.consume(queueName, (message) => {
    const data = JSON.parse(message.content.toString());
    handleData(data);
  }, { noAck: true });

  console.log(`Waiting for messages in ${queueName}...`);
};
