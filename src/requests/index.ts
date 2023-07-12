import Users from './users'
import Games from './games'
import Characters from './characters'
import Activities from './activities'
import Logs from './logs'
import Tallies from './tallies'
import Items from './items'
import Lists from './lists'

const RequestHelpers = (apiBaseUrl: string) => {
  const GET = <T>(endpoint: string, params?: T) =>
    fetch(apiBaseUrl + endpoint + '?' + new URLSearchParams(params || {}), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())

  const POST = (endpoint: string, body: any) =>
    fetch(apiBaseUrl + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

  const PATCH = (endpoint: string, body: any) =>
    fetch(apiBaseUrl + endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

  return {
    ...Users({ GET }),
    ...Games({ GET }),
    ...Characters({ GET, PATCH }),
    ...Activities({ GET, POST }),
    ...Logs({ GET }),
    ...Tallies({ GET }),
    ...Items({ GET }),
    ...Lists({ GET })
  }
}

export type Requests = ReturnType<typeof RequestHelpers>

export default RequestHelpers
