import axios from 'axios'

const create = async (gameId: number, comment: string, repliedToId?: number) =>
  axios.post('/api/comment', { gameId, comment, repliedToId })

const edit = async (id: number, comment: string) => axios.patch(`/api/comment/${id}`, { comment })
const remove = async (id: number) => axios.delete(`/api/comment/${id}`)

const action = async (id: number, isLike: boolean | null) =>
  axios.post(`/api/comment/${id}/action`, { isLike })

const CommentAPI = {
  create,
  edit,
  remove,
  action
}

export default CommentAPI
