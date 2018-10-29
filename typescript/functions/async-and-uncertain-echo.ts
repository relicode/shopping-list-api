import { Handler } from 'aws-lambda'

import { Request, Response } from '../utils/lambda-proxy'


const getRandomPromise = (body: object) => (
  new Promise((resolve, reject) => {
    if (new Date().getTime() % 2 === 0) {
      return resolve({ body: { ...body, message: 'GREAT SUCCESS' } })
    }
    return reject({ body: { ...body, message: 'EPIC FAILURE' } })
  })
)

export const asyncAndUncertainEcho: Handler = async (event: any): Promise<Response> => {
  try {
    const request = new Request(event)
    const data = await getRandomPromise(request.getBody())
    return new Response(data)
  } catch (err) {
    return new Response({ ...err, statusCode: 400 })
  }
}
