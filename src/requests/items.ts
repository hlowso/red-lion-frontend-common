import { ItemGetQuery } from 'common'

const Items = ({ GET }) => {
  const getItems = async (params: ItemGetQuery) => GET('/items', params)

  return {
    getItems
  }
}

export default Items
