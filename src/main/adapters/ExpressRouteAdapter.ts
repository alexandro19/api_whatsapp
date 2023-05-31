import { HttpRequest } from '../../aplication/interfaces/Http'
import { Controller } from '../../aplication/interfaces/Controller'
import { Request, Response } from "express"

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      files: req.files
    }
    
    const httpResponse = await controller.handle(httpRequest)

    if(httpResponse.statusCode === 200){
      res.status(httpResponse.statusCode).json(httpResponse.body)  
    }
    else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.body.message })
    }
  }
}