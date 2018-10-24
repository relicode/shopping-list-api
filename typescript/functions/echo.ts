import { Handler, Context, Callback } from 'aws-lambda'

import { Request, Response } from '../utils/lambda-proxy'


export const echo: Handler = (event: any, context: Context, cb: Callback): void => {
  const request = new Request(event)
  const body = request.getBody()

  const response = new Response({
    body,
  })

  cb(null, response)
}
