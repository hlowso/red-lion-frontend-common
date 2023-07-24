import Users from './users'
import Games from './games'
import Characters from './characters'
import Activities from './activities'
import Logs from './logs'
import Tallies from './tallies'
import Items from './items'
import Lists from './lists'
import { SOCKET_HEADER } from 'common'

const RequestHelpers = (apiBaseUrl: string, socketId = '') => {
  const GET = <T>(endpoint: string, params?: T) =>
    fetch(apiBaseUrl + endpoint + '?' + new URLSearchParams(params || {}), {
      headers: {
        'Content-Type': 'application/json',
        [SOCKET_HEADER]: socketId
      }
    }).then((res) => res.json())

  const POST = (endpoint: string, body?: any) =>
    fetch(apiBaseUrl + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [SOCKET_HEADER]: socketId
      },
      body: JSON.stringify(body || {})
    })

  const PATCH = (endpoint: string, body?: any) =>
    fetch(apiBaseUrl + endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        [SOCKET_HEADER]: socketId
      },
      body: JSON.stringify(body || {})
    })

  return {
    ...Users({ GET }),
    ...Games({ GET }),
    ...Characters({ GET, PATCH }),
    ...Activities({ GET, POST, PATCH }),
    ...Logs({ GET }),
    ...Tallies({ GET }),
    ...Items({ GET }),
    ...Lists({ GET, POST })
  }
}

export type Requests = ReturnType<typeof RequestHelpers>

export default RequestHelpers
