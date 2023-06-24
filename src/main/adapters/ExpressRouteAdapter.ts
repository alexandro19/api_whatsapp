import { HttpRequest } from '../../aplication/interfaces/Http'
import { Controller } from '../../aplication/interfaces/Controller'
import { Request, Response } from "express"
import { getToken } from '../../main/config/get-token'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    
    let body = req.body 
    
    const accessToken = getToken(req)
    
    if(accessToken){
      body = {...body, accessToken}
    } 

    const httpRequest: HttpRequest = {
      body: body,
      params: req.params,
      query: req.query,
      files: req.files
    }
    
    const httpResponse = await controller.handle(httpRequest)

    if(httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299){
      res.status(httpResponse.statusCode).json(httpResponse.body)  
    }
    else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.body.message })
    }
  }
}