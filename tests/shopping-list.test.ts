import ShoppingList, { IShoppingListItemProperties, ShoppingListItem } from '../typescript/utils/shopping-list'


const APPLE = 'An apple'
const TWIGS = 'A bunch of twigs'
const MINIMAL = 'Minimal items'
const BUNCHES = 'bunches'
const ANSSIS_LIST = `Anssi's list`

const item1Props: IShoppingListItemProperties = {
  name: APPLE,
  purchased: false,
  quantity: 1,
}

const item2Props: IShoppingListItemProperties = {
  name: TWIGS,
  quantity: 3,
  unit: BUNCHES,
}

const item3Props: IShoppingListItemProperties = {
  name: MINIMAL,
}

test('ShoppingList gets instanciated without parameters.', () => {
  const list: ShoppingList = new ShoppingList(ANSSIS_LIST)
  expect(list.listId).toEqual(ANSSIS_LIST)
})

test('ShoppingList gets instanciated without items and a new ShoppingListItem can be added.', () => {
  const list: ShoppingList = new ShoppingList(ANSSIS_LIST)
  list.addItem(item1Props)
  expect(list.items[0].name).toMatch(new RegExp(APPLE))
})

test('ShoppingList gets instanciated with items.', () => {
  const listItems = [
    new ShoppingListItem(item1Props),
    new ShoppingListItem(item2Props),
    new ShoppingListItem(item3Props),
  ]
  const list: ShoppingList = new ShoppingList(ANSSIS_LIST, listItems)
  expect(list.items).toEqual([...listItems])
})
