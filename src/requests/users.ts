import { HTTPRequests } from '.'

const Users = ({ GET }: HTTPRequests) => {
  const getCurrentUser = (username?: string) => GET('/user', { username })

  return {
    getCurrentUser
  }
}

export default Users
