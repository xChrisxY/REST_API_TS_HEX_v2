import * as amqp from 'amqplib';
import { INotification } from '../../../domain/services/INotificationAuth';

export class RabbitMQService implements INotification {

  private url: any;
  private exch : any;

  constructor(){

    this.url = 'amqps://suowzuyq:iT10HQrIzfRKfoyRHIS6RZi3ViZ9gTMy@shrimp.rmq.cloudamqp.com/suowzuyq';
    this.exch = 'app.task.initial';

  }

  async sendMessage(message: string): Promise<void> {
      
    try {
      
      const notification = {
        
        success : true,
        message : `${message} is the new task`
        
      };
      
      const connection = await amqp.connect(this.url);
      const channel = await connection.createChannel();


      let success = await channel.publish(this.exch, "", Buffer.from(JSON.stringify(notification)));

      if (success) console.log('Tarea publicada: ' + notification.message);

      await channel.close();
      await connection.close();

    } catch (error) {

      console.log('error al momento de enviar un mensaje');

    }

  }

}
