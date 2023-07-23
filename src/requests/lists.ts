import { ListGetParams, ListRow } from 'common'

const Lists = ({ GET, POST }) => {
  const getLists = (params: ListGetParams) => GET('/lists', params)
  const createList = (params: Omit<ListRow, 'id'>) => POST('/lists', params)

  return {
    getLists,
    createList
  }
}

export default Lists
