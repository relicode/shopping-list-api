import { Callback, Context, Handler } from 'aws-lambda'

import { Request, Response } from '../utils/lambda-proxy'


export const echo: Handler = (event: any, context: Context, cb: Callback): void => { // tslint:disable-line
  const request = new Request(event)
  const body = request.getBody()

  const response = new Response({
    body,
  })

  cb(null, response)
}
