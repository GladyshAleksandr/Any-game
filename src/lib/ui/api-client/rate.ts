import axios from 'axios'

const rate = async (rating: number, gameId: number) => axios.post('/api/rate', { rating, gameId })

export default rate
