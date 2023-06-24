import { Request } from "express"

const getToken = (req: Request) => {
  const authHeader: any = req.headers.authorization
  
  if(!authHeader){
    return null
  }
  const token = authHeader.split(" ")[1]
  return token
}

export {getToken}