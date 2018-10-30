import { Handler } from 'aws-lambda'

import DynamoClient from '../services/dynamo-client'
import { Request, Response } from '../utils/lambda-proxy'


const dbClient = new DynamoClient(process.env.TABLE_NAME)

export const handler: Handler = async (event: any): Promise<Response> => {
  try {
    const request = new Request(event)
    const data = await dbClient.put(request.getBody())
    return new Response({ body: data })
  } catch (err) {
    return new Response({
      body: { message: err.message },
      statusCode: err.statusCode,
    })
  }
}
