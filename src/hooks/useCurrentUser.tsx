import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { UserRow } from 'common'
import { RequestsContext } from '../contexts/RequestsContext'

const useCurrentUser = (username?: string) => {
  const Requests = useContext(RequestsContext)
  return useQuery<UserRow>({
    queryKey: ['users', username],
    queryFn: () => Requests.getCurrentUser(username)
  })
}

export default useCurrentUser
