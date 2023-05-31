import path from "path"
import { HttpRequest } from "../../aplication/interfaces"
import { readdirSync } from "fs"

export const fetchFiles = (httpRequest: HttpRequest): Promise<Array<string>> => {
  
  let dev = false
  readdirSync(`${__dirname}`).map(async file => {
    if(file.includes('.ts')){
      dev = true    
    }
  })
  
  let files = []
  if(httpRequest.files){
    for(const file in httpRequest.files){
      if(dev){
        files.push(path.normalize(__dirname + '/../../../') + httpRequest.files[file].path) 
      }
      else {
        files.push(path.normalize(__dirname + '/../../') + httpRequest.files[file].path) 
      }
    }
  }
  return Promise.resolve(files)
}