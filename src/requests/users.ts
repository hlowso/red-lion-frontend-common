const Users = ({ GET }) => {
  const getCurrentUser = (username?: string) => GET('/user', { username })

  return {
    getCurrentUser
  }
}

export default Users
