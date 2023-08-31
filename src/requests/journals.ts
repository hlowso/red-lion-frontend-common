import { HTTPRequests } from '.'

const Journals = ({ GET }: HTTPRequests) => {
  const getJournals = (params: { gameId?: number }) => GET('/journals', params)

  return {
    getJournals
  }
}

export default Journals
