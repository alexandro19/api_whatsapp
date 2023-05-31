import { ServerError, Unauthorized } from '../errors'
import { HttpResponse } from '../interfaces/Http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error 
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new Unauthorized()
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error)
})


export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})