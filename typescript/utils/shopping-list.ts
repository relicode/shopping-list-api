export interface ShoppingListItemProperties {
  name: string
  purchased?: boolean
  quantity?: number
  unit?: string
}

export class ShoppingListItem implements ShoppingListItemProperties {
  name: string
  purchased: boolean
  quantity: number
  unit?: string

  constructor(readonly itemId: number, properties: ShoppingListItemProperties) {
    const { name, purchased, quantity, unit } = properties
    this.itemId = itemId
    this.name = name
    this.purchased = typeof purchased === 'boolean' ? purchased : false
    this.quantity = typeof quantity === 'number' ? quantity : 1
    if (typeof unit === 'string') {
      this.unit = unit
    }
  }
}

export default class ShoppingList {
  private itemIdCounter: number = 0
  constructor(readonly listId: string, readonly items: ShoppingListItem[] = []) {
    if (items.length) {
      this.itemIdCounter = items.reduce((acc, cur) => (
        cur.itemId > acc.itemId ? cur : acc
      )).itemId
    }
  }
  addItem(properties: ShoppingListItemProperties): number {
    this.itemIdCounter += 1
    const item = new ShoppingListItem(this.itemIdCounter, properties)
    this.items.push(item)
    return item.itemId
  }
}
