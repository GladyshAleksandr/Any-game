import axios from 'axios'
import Auth from '../../types/Auth'

const login = async (data: Auth) => axios.post('/api/auth/oauth/login', data)

const signup = async (data: Auth) => axios.post('/api/auth/oauth/signup', data)

const OAuth = {
  login,
  signup
}

export default OAuth
