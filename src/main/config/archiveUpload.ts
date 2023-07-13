import { Request } from 'express'
import multer from 'multer' 
import path from 'path'

const archiveStorage = multer.diskStorage({
  
  destination: function (req: Request, file, cb) {
    cb(null, `public/message/`)
  },
  filename: (req: Request, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const archiveUpload = multer({
  storage: archiveStorage
})

export { archiveUpload }