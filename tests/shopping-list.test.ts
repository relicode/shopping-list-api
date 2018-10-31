import { /* shoppingListFactory, */ shoppingListItemFactory } from '../src/utils/shopping-list'


// const APPLE = 'An apple'
const TWIGS = 'A bunch of twigs'
// const MINIMAL = 'Minimal items'
const BUNCHES = 'bunches'
// const ANSSIS_LIST = `Anssi's list`

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

test('A valid ShoppingListItem with id is factured.', () => {
  const item = shoppingListItemFactory(itemWithAllProps)
  expect(item).toEqual(itemWithAllProps)
})

test('A valid ShoppingListItem with minimal props (only a name) is factured.', () => {
  const item = shoppingListItemFactory(itemWithMinimalProps)
  expect(item.itemId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
  expect(item.name).toBe(TWIGS)
  expect(item.purchased).toBe(false)
  expect(item.quantity).toBe(1)
  expect(item.unit).toBe(undefined)
})
