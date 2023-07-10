import { LogGetParams } from 'common'

const Logs = ({ GET }) => {
  const getLogs = (params: LogGetParams) => GET('/logs', params)

  return {
    getLogs
  }
}

export default Logs
