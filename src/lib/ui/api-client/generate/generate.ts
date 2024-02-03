import axios from 'axios'

const create = async (data: any) => axios.get('/api/generate')

export default create
