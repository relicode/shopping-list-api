import docClient from '@services/dynamodb'
import { SHOPPING_LIST_NOT_FOUND } from '@utils/errors'
import Logger from '@utils/logger'
import { shoppingListFactory } from '@utils/shopping-list'

const { SHOPPING_LIST_TABLE_NAME } = process.env
const { error, info } = new Logger('services/shopping-list-db')

export const getShoppingList = async (listId: string) => {
  try {
    const response = await docClient.get({
      TableName: SHOPPING_LIST_TABLE_NAME,
      Key: { listId },
    }).promise()

    const item = response.Item

    if (!item) {
      error(`Couldn't find shopping list with listId "${listId}"`)
      throw new Error(SHOPPING_LIST_NOT_FOUND)
    }

    info('Fetched a shopping list: ', item)
    return item
  } catch (err) {
    error(err.message)
    throw err
  }
}

export const putShoppingList = async (shoppingList) => {
  try {
    info(`Putting shoppingList with listId ${shoppingList.listId}`)
    const response = await docClient.put({
      TableName: SHOPPING_LIST_TABLE_NAME,
      Item: shoppingListFactory(shoppingList),
    }).promise()
    info(`Successfully put shoppingList with listId ${shoppingList.listId}`)
    return response
  } catch (err) {
    error(err.message)
    throw err
  }
}
