import Users from './users'
import Games from './games'
import Characters from './characters'
import Activities from './activities'
import Logs from './logs'
import Tallies from './tallies'
import Items from './items'
import Lists from './lists'
import { SOCKET_HEADER } from 'common'

export interface HTTPRequests {
  GET: <T>(endpoint: string, query?: T) => Promise<any>
  POST: <T>(endpoint: string, body?: T) => Promise<any>
  PATCH: <T>(endpoint: string, body?: T) => Promise<any>
}

const RequestHelpers = (apiBaseUrl: string, socketId = '') => {
  const GET = <T>(endpoint: string, query?: T) =>
    fetch(apiBaseUrl + endpoint + '?' + new URLSearchParams(query || {}), {
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

  const HTTP = { GET, POST, PATCH }

  return {
    ...Users(HTTP),
    ...Games(HTTP),
    ...Characters(HTTP),
    ...Activities(HTTP),
    ...Logs(HTTP),
    ...Tallies(HTTP),
    ...Items(HTTP),
    ...Lists(HTTP)
  }
}

export type Requests = ReturnType<typeof RequestHelpers>

export default RequestHelpers
