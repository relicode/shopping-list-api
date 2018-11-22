import {ErrorResponse, Request, Response} from '@utils/lambda-proxy'

import { DUMMY_TEAPOT } from '@utils/errors'
import Logger from '@utils/logger'

const { error, log } = new Logger('functions/async-echo')

const getPromise = (requestBody: any) => (
  new Promise((resolve, reject) => {
    return (
      requestBody.fail === true ?
      reject(DUMMY_TEAPOT) :
      resolve({...requestBody, message: 'GREAT SUCCESS' })
    )
  })
)

export const handler = async (event: any): Promise<Response> => {
  try {
    const request = new Request(event)
    const data = await getPromise(request.getBody())
    log(data)
    return new Response({ body: data })
  } catch (err) {
    error(err)
    return new ErrorResponse(err)
  }
}
