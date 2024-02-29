import express from 'express'
import cors from 'cors';

import { taskRouter } from './infraestructure/routes/TaskRoter';

const app = express()
app.disabled('x-powered-by')

app.use(express.json())
app.use(cors())

app.use('/api/tasks', taskRouter)

app.listen(3001, () => {

      console.log('Server running on port 3001')
      
})