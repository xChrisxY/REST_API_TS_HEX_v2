import { CreateTask } from "../application/createTask";

import { RabbitMQService } from "./services/servicesRabbitMQ/RabbitMQService";

import { TaskRepositoryPrisma } from "./repositories/PrismaTaskRepository";
import { CreateTaskController } from "./controllers/createTaskController";

export const PrismaTaskRepository = new TaskRepositoryPrisma()

export const brokerRabbitMQ = new RabbitMQService();

export const createTaskCase = new CreateTask(PrismaTaskRepository, brokerRabbitMQ);

export const createTaskController = new CreateTaskController(createTaskCase);