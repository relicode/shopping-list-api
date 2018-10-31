import { Handler } from 'aws-lambda'

import { Request, Response } from '@utils/lambda-proxy'
import Logger from '@utils/logger'


const logger = new Logger('functions/async-and-uncertain-echo')

const getRandomPromise = (requestBody: object) => (
  new Promise((resolve, reject) => {
    if (new Date().getTime() % 2 === 0) {
      return resolve({...requestBody, message: 'GREAT SUCCESS' })
    }
    return reject({...requestBody, message: 'EPIC FAILURE' })
  })
)

export const asyncAndUncertainEcho: Handler = async (event: any): Promise<Response> => {
  try {
    const request = new Request(event)
    const data = await getRandomPromise(request.getBody())
    logger.info(data)
    return new Response({ body: data })
  } catch (err) {
    logger.error(err)
    return new Response({ body: { ...err, statusCode: 400 }})
  }
}
