import axios from 'axios'

type IUpdateUserData = {
  isVerified?: boolean
}

const update = async (data: IUpdateUserData) => axios.patch('/api/user', data)

const UserAPI = {
  update
}

export default UserAPI
