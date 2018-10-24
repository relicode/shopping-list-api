import ShoppingList, { ShoppingListItem, ShoppingListItemProperties } from '../typescript/utils/shopping-list'


const APPLE = 'An apple'
const TWIGS = 'A bunch of twigs'
const MINIMAL = 'Minimal items'
const BUNCHES = 'bunches'
const ANSSIS_LIST = `Anssi's list`

const item1Props: ShoppingListItemProperties = {
  name: APPLE,
  purchased: false,
  quantity: 1,  
}

const item2Props: ShoppingListItemProperties = {
  name: TWIGS,
  quantity: 3,
  unit: BUNCHES,
}

const item3Props: ShoppingListItemProperties = {
  name: MINIMAL,
}

test('A ShoppingList gets instanciated without parameters.', () => {
  const list: ShoppingList = new ShoppingList(ANSSIS_LIST)
  expect(list.listId).toEqual(ANSSIS_LIST)
})

test('A ShoppingList gets instanciated without items and a new ShoppingListItem can be added.', () => {
  const list: ShoppingList = new ShoppingList(ANSSIS_LIST)
  list.addItem(item1Props)
  expect(list.items[0].name).toMatch(new RegExp(APPLE))
})

test('A ShoppingList gets instanciated with items.', () => {
  const list: ShoppingList = new ShoppingList(ANSSIS_LIST, [
    new ShoppingListItem(1, item1Props),
    new ShoppingListItem(2, item2Props),
    new ShoppingListItem(3, item3Props),
  ])
  expect(list.items[0].name).toMatch(new RegExp(APPLE))
  expect(list.items[1].quantity).toBe(3)
  expect(list.items[2].purchased).toBe(false)
})
