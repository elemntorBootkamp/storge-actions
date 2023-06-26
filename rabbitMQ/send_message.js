import amqp from 'amqplib';

export const sendToRabbitMQ = async (data, extraParam) => {
  const queue = 'website-subscriptions';
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
    console.log(' [x] Sent \'%s\'', message);
    await channel.close();
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
};
