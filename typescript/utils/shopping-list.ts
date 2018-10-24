import { v1 as uuidv1 } from 'uuid'


export interface ShoppingListItemProperties {
  name: string
  purchased?: boolean
  quantity?: number
  unit?: string
}

export class ShoppingListItem implements ShoppingListItemProperties {
  itemId: string = uuidv1()
  name: string
  purchased: boolean
  quantity: number
  unit?: string

  constructor(properties: ShoppingListItemProperties) {
    const { name, purchased, quantity, unit } = properties
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
  constructor(readonly listId: string, readonly items: ShoppingListItem[] = []) {}
  addItem(properties: ShoppingListItemProperties): string {
    const item = new ShoppingListItem(properties)
    this.items.push(item)
    return item.itemId
  }
}
