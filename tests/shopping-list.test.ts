import {
  ListItemFactoryParams,
  ShoppingListFactoryParams,
  listItemFactory,
  shoppingListFactory,
} from '@utils/shopping-list'

const BUNCHES = 'bunches'
const TWIGS = 'twigs'

const itemWithAllProps = {
  itemId: 'aae7e080-dd08-11e8-b761-e71312b67519',
  name: TWIGS,
  purchased: true,
  quantity: 3,
  unit: BUNCHES,
}

const itemWithMinimalProps = {
  name: TWIGS,
}

const listWithAllProps = {
  items: [
    listItemFactory(itemWithAllProps),
    listItemFactory(itemWithAllProps),
    listItemFactory(itemWithAllProps),
  ],
  listId: 'my awesome shopping list',
}

const listWithMinimalProps = {
  listId: 'my first shopping list',
}

test('A valid ListItem with id is factured.', () => {
  const item = listItemFactory(itemWithAllProps)
  expect(item).toEqual(itemWithAllProps)
})

test('A valid ListItem with minimal props (only a name) is factured.', () => {
  const item = listItemFactory(itemWithMinimalProps)
  expect(item.itemId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
  expect(item.name).toBe(TWIGS)
  expect(item.purchased).toBe(false)
  expect(item.quantity).toBe(1)
  expect(item.unit).toBe(undefined)
})

test('An invalid ListItem throws an error', () => {
  expect(() => {
    listItemFactory({} as ListItemFactoryParams)
  }).toThrowError('"name" is required')
})

test('A valid ShoppingList with items is factured.', () => {
  const list = shoppingListFactory(listWithAllProps)
  expect(list).toEqual(listWithAllProps)
})

test('A valid ShoppingList with minimal props (only a id) is factured.', () => {
  const list = shoppingListFactory(listWithMinimalProps)
  expect(list.listId).toEqual(listWithMinimalProps.listId)
})

test('An invalid ShoppingList throws an error', () => {
  expect(() => {
    shoppingListFactory({} as ShoppingListFactoryParams)
  }).toThrowError('"listId" is required')
})
