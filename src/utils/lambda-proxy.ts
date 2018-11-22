import mapError, { BODY_JSON, ErrorName } from '@utils/errors'

import Logger from '@utils/logger'

const { error } = new Logger('utils/lambda-proxy')

export class Request {
  public readonly body?: string
  /**
   * Instanciates a sanitized Request object from AWS lambda's event object
   * when using API gateway's lambda-proxy event.
   *
   * @param event {object} - API gateway's lambda-proxy event
   */
  constructor(event: object) {
    for (const i of Object.entries(event)) {
      this[i[0]] = i[1]
    }
  }
  /**
   * Returns instances sanitized (JSON parsed) body.
   *
   * @returns {object} - JSON parsed body
   */
  public getBody = () => {
    try {
      return typeof this.body === 'string' ? JSON.parse(this.body) : {}
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new Error(BODY_JSON)
      } else {
        throw err
      }
    }
  }
}

interface ResponseOptions {
  /** The body of the response object */
  body?: object

  /** Headers of the response object */
  headers?: object

  /** Statuscode of the response object */
  statusCode?: number
}

export class Response {
  public readonly statusCode: number
  public readonly headers: object = {}
  public readonly body: string

  /**
   * @param options - body, statusCode and headers of the Response instance
   */
  constructor(options?: ResponseOptions) {
    try {
      this.body = JSON.stringify(options.body)
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new Error(BODY_JSON)
      } else {
        throw err
      }
    }
    this.statusCode = options.statusCode ? options.statusCode : 200
    this.headers = options.headers ? options.headers : {}
  }
}

/**
 * A sanitized ErrorResponse to return to API gateway
 *
 * @param err - Either a ErrorName string or a JavaScript Error instance.
 * The response's message will be derived from this.
 *
 * @param options - body, statusCode and headers of the Response instance
 */
export class ErrorResponse extends Response {
  constructor(err: ErrorName | Error, options?: ResponseOptions) {
    error(err)
    const errorMessage = (err instanceof Error ? err.message : err) as ErrorName
    super({
      body: (options && options.body) ? options.body : { message: mapError(errorMessage).message },
      statusCode: (options && options.statusCode) ? options.statusCode : mapError(errorMessage).statusCode,
      ...options,
    })
  }
}
