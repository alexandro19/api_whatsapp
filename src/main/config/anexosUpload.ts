import { Request } from 'express'
import multer from 'multer' 
import path from 'path'

const anexoStorage = multer.diskStorage({
  
  destination: function (req: Request, file, cb) {
    cb(null, `public/anexos/`)
  },
  filename: (req: Request, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const anexoUpload = multer({
  storage: anexoStorage
})

export { anexoUpload }