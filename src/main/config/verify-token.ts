import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { getToken } from './get-token'
import { serverError, unauthorized } from '../../aplication/helpers/HttpHelpers'
import env from './env'

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  
  try {
    if(!req.headers.authorization){
      const httpResponse = unauthorized() 
      return res.status(httpResponse.statusCode).json(httpResponse.body) 
    }
    
    const token = getToken(req)
    if(!token){
      const httpResponse = unauthorized() 
      return res.status(httpResponse.statusCode).json(httpResponse.body) 
    }

    const verified = jwt.verify(token, env.jwtSecret)
    
    if(!verified){
      const httpResponse = unauthorized() 
      return res.status(httpResponse.statusCode).json(httpResponse.body) 
    }
    
    next()

  } 
  catch (error) { 
    const httpResponse = serverError(error) 
    return res.status(httpResponse.statusCode).json(httpResponse.body)  
  }
}

export {checkToken}