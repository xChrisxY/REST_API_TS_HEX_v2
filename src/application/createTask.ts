import { TaskRepository } from "../domain/repository/TaskRepository";
import { Task } from "../domain/entities/Task";
import { INotification } from "../domain/services/INotificationAuth";

export class CreateTask {

      constructor(

            private readonly repository: TaskRepository,
            private readonly rabbitMQService : INotification
      ){}

      async run(title: string, description: string, createdAt: Date , dueDate: Date, userId: number) {

            try {

                  const task = new Task(title, description, createdAt, dueDate, userId);

                  if (task) this.rabbitMQService.sendMessage(`Task created: ${title}`);
                  console.log("La tarea creada es: ")
                  console.log(task);

                  return await this.repository.save(task)

            } catch (error) {
                  
                  console.error('Ha ocurrido un error:', error)
                  return null;                  
            }

      }

}