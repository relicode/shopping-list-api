import { Handler } from 'aws-lambda'
// import * as Joi from 'joi'

import dynamoClient from '@services/dynamo-client'
import { /*Request,*/ Response } from '@utils/lambda-proxy'
import Logger from '@utils/logger'
// import { validateSchema } from '@utils/validators'


const { SHOPPING_LIST_TABLE_NAME } = process.env

const { error, info } = new Logger('functions/shopping-list')


export const get: Handler = async (event: any): Promise<Response> => {
  try {
    const { listId } = event.pathParameters
    const data = await dynamoClient.get({
      TableName: SHOPPING_LIST_TABLE_NAME,
      Key: { listId },
    })
    if (!data.Item) {
      error(`Couldn't find shopping list with listId "${listId}"`)
      return new Response({ body: {}, statusCode: 404 })
    }
    info('Fetched a table entry: ', data)
    return new Response({ body: data })
  } catch (err) {
    error(err)
    return new Response({
      body: { ...err },
      statusCode: 400,
    })
  }
}
