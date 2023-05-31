import { AuthenticationController } from './AuthenticationController'
import { Authentication } from '../../../entities/whatsapp/Authentication'
import { HttpRequest, HttpResponse } from '../../interfaces/Http'
import { ServerError } from '../../errors/ServerError'

const mockAuthentication = (): Authentication => {
  class FakeAuthentication implements Authentication {
    auth(params: Authentication.Params): Promise<Authentication.Result> {
      return Promise.resolve({authenticated: true})
    }
  }
  return new FakeAuthentication()
}

type TypeMock = {
  fakeAuthentication: Authentication,
  authenticationController: AuthenticationController
}

const mockController = (): TypeMock => {
  const fakeAuthentication = mockAuthentication()
  const authenticationController = new AuthenticationController(fakeAuthentication) 
  
  return {
    fakeAuthentication,
    authenticationController  
  }
}

describe('Test Authentication Controller', () => {
  test('Deve retornar statusCode 200 caso a autenticação seja bem sucedida', async () => {
    
    const { authenticationController } = mockController()
    
    const fakeHttpRequest: HttpRequest = {
      body: {
        session: 'any_session'
      }
    }

    const httpResqponse: HttpResponse = await authenticationController.handle(fakeHttpRequest)
    expect(httpResqponse.statusCode).toEqual(200)
  })

  test('Deve retornar statusCode 400 (badRequest) caso o parametro session não for informado', async () => {
     
    const { authenticationController } = mockController()
    
    const fakeHttpRequest: HttpRequest = {
      body: {
      }
    }

    const httpResqponse: HttpResponse = await authenticationController.handle(fakeHttpRequest)
    expect(httpResqponse.statusCode).toEqual(400)
  })

  test('Deve chamar a function auth do Authentication passando a session correta que veio da requisição', async () => {
    
    const { authenticationController, fakeAuthentication } = mockController()
    
    const fakeHttpRequest: HttpRequest = {
      body: {
        session: 'any_session'
      }
    }
    
    const spy = jest.spyOn(fakeAuthentication, 'auth')
    
    const fakeParam: Authentication.Params = {
      session: 'any_session'
    }

    await authenticationController.handle(fakeHttpRequest)
    expect(spy).toHaveBeenCalledWith(fakeParam)
  })

  test('Deve retornar um server error com statusCode 500 caso ocorra algum problema na execução', async () => {
    
    const { authenticationController, fakeAuthentication } = mockController()
    
    const fakeHttpRequest: HttpRequest = {
      body: {
        session: 'any_session'
      }
    }
    
    jest.spyOn(fakeAuthentication, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse: HttpResponse = await authenticationController.handle(fakeHttpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError(new Error()))
  })
})