import { Request, Response, json } from "express";
import { CreateTask } from "../../application/createTask";
import ioClient from 'socket.io-client';
const socket = ioClient('https://server-ws.onrender.com')

export class CreateTaskController {

      constructor(readonly CreateTask: CreateTask) { } 

      async run(req: Request, res: Response) {

            const data = req.body;
            console.log('viendo la data: ');
            console.log(data)

            try {
                  
                  const task = await this.CreateTask.run(
                        data.title,
                        data.descripporttion,
                        data.createdAt,
                        data.dueDate,
                        data.userId
                  )

                  if (task) {

                        console.log('vamos a hacer el emmit');
                        socket.emit('Task created' , data);

                        res.status(200).json({
                              success : true,
                              data : {
                                    title : task.title,
                                    description : task.description,
                                    createdAt : task.createdAt,
                                    dueDate : task.dueDate,
                                    userId : task.userId
                              }
                        })

                  } else {

                        res.status(400).json({
                              success : false,
                              data : 'NO fue posible agregar la tarea',
                              
                        })


                  }

            } catch (error) {

                  res.status(500).json({
                        success : false,
                        data : 'Ocurrió un error',
                        message : error,
                        
                  })
                  
            } 

      }

}