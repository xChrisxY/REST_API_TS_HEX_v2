import express from 'express'

import { createTaskController } from '../dependencies'

export const taskRouter = express.Router()

taskRouter.post('/', createTaskController.run.bind(createTaskController));



