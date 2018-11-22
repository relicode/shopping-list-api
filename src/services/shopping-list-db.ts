import docClient from '@services/dynamodb'
import { SHOPPING_LIST_NOT_FOUND } from '@utils/errors'
import Logger from '@utils/logger'


const { SHOPPING_LIST_TABLE_NAME } = process.env
const { error, info } = new Logger('services/shopping-list-db')

export const getShoppingList = async (listId: string) => {
  try {
    const data = await docClient.get({
      TableName: SHOPPING_LIST_TABLE_NAME,
      Key: { listId },
    }).promise()

    const item = data.Item

    if (!item) {
      error(`Couldn't find shopping list with listId "${listId}"`)
      throw new Error(SHOPPING_LIST_NOT_FOUND)
    }

    info('Fetched a shopping list: ', item)
    return item
  } catch (err) {
    error(err)
    throw err
  }
}
