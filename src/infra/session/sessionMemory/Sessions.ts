type SessionType = {
  session: string,
  connected?: boolean,
  qrCode?: string,
  phone?: string,
  client?: any
}

export default class Sessions {

  static session = Array()
  
  // checar ou adiciona um usuario na sessão
  static checkAddUser(session: string) {
    var checkFilter = this.session.filter(order => (order.session === session)), add = null
    if (!checkFilter.length) {
      const add = {
        session: session
      }
      this.session.push(add)
      return true
    }
    return false
  }

  // checar se exite o usuario na sessão
  static checkSession(session: string) {
    var checkFilter = this.session.filter(order => (order.session === session))
    if (checkFilter.length) {
      return true
    }
    return false
  }

  static checkSessionPhone(phone: string) {
    var checkFilter = this.session.filter(order => (order.phone === phone))
    if (checkFilter.length) {
      return true
    }
    return false
  }

  // pegar index da sessão (chave)
  static getSessionKey(name) {
    if (this.checkSession(name)) {
      for (var i in this.session) {
        if (this.session[i].session === name) {
          return i
        }
      }
    }
    return false
  }

  static getSessionKeyPhone(phone: string) {
    if (this.checkSessionPhone(phone)) {
      for (var i in this.session) {
        if (this.session[i].phone === phone) {
          return i
        }
      }
    }
    return false
  }

  // adicionar informações a sessão 
  static addInfoSession(name, extend) {

    if (this.checkSession(name)) {
      for (var i in this.session) {
        if (this.session[i].session === name) {
          Object.assign(this.session[i], extend)
          return true
        }
      }
    }
    return false
  }

  // Remove object na sessão
  static removeInfoObjects(name, key) {
    if (this.checkSession(name)) {
      for (var i in this.session) {
        if (this.session[i].session === name) {
          delete this.session[i][key]
          return true
        }
      }
    }
    return false
  }

  // deletar sessão
  static deleteSession(name) {
    if (this.checkSession(name)) {
      var key = this.getSessionKey(name)
      delete this.session[key as string]
      return true
    }
    return false
  }

  // retornar sessão
  static getSession(name) {
    if (this.checkSession(name)) {
      var key = this.getSessionKey(name)
      return this.session[key as string]
    }
    return false
  }

  static getSessionPhone(phone: string) {
    if (this.checkSessionPhone(phone)) {
      var key = this.getSessionKeyPhone(phone)
      return this.session[key as string]
    }
    return false
  }

  // retornar todas
  static getAll() {
    return this.session
  }

  // checa o client
  static checkClient(name: string) {
    if (this.getSession(name) && this.getSession(name).client) {
      return true
    }
    return false
  }

}