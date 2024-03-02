import axios from 'axios'
import Auth from '../types/Auth'

const login = async (data: { usernameOrEmail: string; password: string }) =>
  axios.post('/api/auth/login', data)

const signup = async (data: Auth) => axios.post('/api/auth/signup', data)

const JWT = {
  login,
  signup
}

export default JWT
