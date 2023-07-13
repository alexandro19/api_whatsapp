import path from "path"
import { HttpRequest } from "../interfaces"
import { readdirSync } from "fs"

export const fetchFile = (httpRequest: HttpRequest): Promise<string> => {
  
  let dev = false
  readdirSync(`${__dirname}`).map(async file => {
    if(file.includes('.ts')){
      dev = true    
    }
  })
  
  let file = ''
  if(httpRequest.file){
    if(dev){
      file = path.normalize(__dirname + '/../../../') + httpRequest.file.path 
    }
    else {
      file = path.normalize(__dirname + '/../../') + httpRequest.file.path 
    } 
  }
  return Promise.resolve(file)
}