import { getShoppingList, putShoppingList } from '@services/shopping-list-db'
import { ErrorResponse, Request, Response } from '@utils/lambda-proxy'


export const get = async (event: any): Promise<Response> => {
  try {
    const { listId } = event.pathParameters
    const shoppingList = await getShoppingList(listId)
    return new Response ({
      body: {
        ...shoppingList,
      },
    })
  } catch (e) {
    return new ErrorResponse(e)
  }
}

export const put = async (event: any): Promise<Response> => {
  try {
    const body = new Request(event).getBody()
    const shoppingList = await putShoppingList(body)
    return new Response ({
      body: {
        ...shoppingList,
      },
    })
  } catch (e) {
    return new ErrorResponse(e, {
      body: {
        message: e.message,
      },
      statusCode: e.statusCode || 500,
    })
  }
}
