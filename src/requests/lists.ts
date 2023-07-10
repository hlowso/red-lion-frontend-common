import { ListGetParams } from 'common'

const Lists = ({ GET }) => {
  const getLists = (params: ListGetParams) => GET('/lists', params)

  return {
    getLists
  }
}

export default Lists
