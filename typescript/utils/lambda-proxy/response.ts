interface IResponseOptions {
    statusCode?: number
    headers?: object
    body?: object
  }

export default class Response {
    public readonly statusCode: number
    public readonly headers: object = {}
    public readonly body: string

    constructor(options?: IResponseOptions) {
      this.body = options.body ? JSON.stringify(options.body) : JSON.stringify({})
      this.statusCode = options.statusCode ? options.statusCode : 200
      this.headers = options.headers ? options.headers : {}
    }
  }
