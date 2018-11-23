import * as Joi from 'joi'
import { v1 as uuidv1 } from 'uuid'

import { validateSchema } from '@utils/validators'


const ITEM_ITEM_ID = 'itemId'
const ITEM_PURCHASED = 'purchased'
const ITEM_QUANTITY = 'quantity'
const ITEM_UNIT = 'unit'
const LIST_ITEMS = 'items'

export interface ListItemFactoryParams {
  itemId?: string,
  name: string,
  purchased?: boolean,
  quantity?: number,
  unit?: string,
}

interface ListItem {
  itemId: string,
  name: string,
  purchased: boolean,
  quantity: number,
  unit?: string,
}

export interface ShoppingListFactoryParams {
  listId: string,
  items?: ListItem[],
}

interface ShoppingList {
  listId: string,
  items: ListItem[],
}

const listItemSchema = Joi.object().keys({
  [ITEM_ITEM_ID]: Joi.string().required(),
  name: Joi.string().required(),
  [ITEM_PURCHASED]: Joi.boolean().required(),
  [ITEM_QUANTITY]: Joi.number().integer().positive().required(),
  [ITEM_UNIT]: Joi.string(),
})

export const listItemFactory = (params: ListItemFactoryParams): ListItem => {
  const itemData = { name: params.name }
  itemData[ITEM_ITEM_ID] = params.hasOwnProperty(ITEM_ITEM_ID) ? params[ITEM_ITEM_ID] : uuidv1()
  itemData[ITEM_PURCHASED] = params.hasOwnProperty(ITEM_PURCHASED) ? params[ITEM_PURCHASED] : false
  itemData[ITEM_QUANTITY] = params.hasOwnProperty(ITEM_QUANTITY) ? params[ITEM_QUANTITY] : 1
  itemData[ITEM_UNIT] = params.hasOwnProperty(ITEM_UNIT) ? params[ITEM_UNIT] : undefined
  return validateSchema(itemData, listItemSchema) as ListItem
}

const shoppingListSchema = Joi.object().keys({
  listId: Joi.string().required(),
  items: Joi.array().items(listItemSchema).required(),
})

export const shoppingListFactory = (params: ShoppingListFactoryParams): ShoppingList => {
  const listData = { listId: params.listId }
  listData[LIST_ITEMS] = (
    params.hasOwnProperty(LIST_ITEMS) ?
    params[LIST_ITEMS].map((i) => listItemFactory(i)) :
    []
  )
  return validateSchema(listData, shoppingListSchema) as ShoppingList
}
