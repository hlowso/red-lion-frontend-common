import { ListGetParams, ListRow } from 'common'
import { HTTPRequests } from '.'

const Lists = ({ GET, POST }: HTTPRequests) => {
  const getLists = (params: ListGetParams) => GET('/lists', params)
  const createList = (params: Omit<ListRow, 'id'>) => POST('/lists', params)

  return {
    getLists,
    createList
  }
}

export default Lists
