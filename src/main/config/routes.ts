import { Router, Express } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

export default (app: any): void => {
  const router = Router()
  app.use('/whatsapp', router)
  readdirSync(join(__dirname, '../routes')).map(async file => {
    if (!file.endsWith('.map')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}