import Cookie from 'js-cookie'

const tokenKey = 'Imatate-Admin-Token'

export function getToken() {
  return Cookie.get(tokenKey)
}

export function setToken(token) {
  return Cookie.set(tokenKey, token)
}

export function removeToken() {
  Cookie.remove(tokenKey)
}
