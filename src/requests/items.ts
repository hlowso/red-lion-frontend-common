import { ItemGetQuery } from 'common'
import { HTTPRequests } from '.'

const Items = ({ GET }: HTTPRequests) => {
  const getItems = async (params: ItemGetQuery) => GET('/items', params)

  return {
    getItems
  }
}

export default Items
