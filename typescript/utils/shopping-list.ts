import { v1 as uuidv1 } from 'uuid'


export interface IShoppingListItemProperties {
  name: string
  purchased?: boolean
  quantity?: number
  unit?: string
}

export class ShoppingListItem implements IShoppingListItemProperties {
  public itemId: string = uuidv1()
  public name: string
  public purchased: boolean
  public quantity: number
  public unit?: string

  constructor(properties: IShoppingListItemProperties) {
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
  constructor(readonly listId: string, readonly items: ShoppingListItem[] = []) {}
  public addItem(properties: IShoppingListItemProperties): string {
    const item = new ShoppingListItem(properties)
    this.items.push(item)
    return item.itemId
  }
}
