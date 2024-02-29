import { PrismaClient } from "@prisma/client";
import { TaskRepository } from "../../domain/repository/TaskRepository";
import { Task } from "../../domain/entities/Task";

export class TaskRepositoryPrisma implements TaskRepository {

      private prisma : PrismaClient;

      constructor() { this.prisma = new PrismaClient() }

      async save(task: Task): Promise<Task> {
          
            const newTask = await this.prisma.task.create({

                  data : {

                        title : task.title!,
                        description : task.description! ? task.description : '',
                        dueDate : new Date(task.dueDate!).toISOString(),
                        userId : task.userId!

                  }
            })

            return new Task(

                  newTask.title,
                  newTask.description,
                  newTask.createdAt,
                  newTask.dueDate,
                  newTask.userId

            )
      }
      
}