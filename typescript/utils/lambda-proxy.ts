export class Request {
  public readonly body?: string
  constructor(event: object) {
    for (const i of Object.entries(event)) {
      this[i[0]] = i[1]
    }
  }
  public getBody() {
    return typeof this.body === 'string' ? JSON.parse(this.body) : {}
  }
}

interface IResponseOptions {
    statusCode?: number
    headers?: object
    body?: object
  }

export class Response {
  public readonly statusCode: number
  public readonly headers: object = {}
  public readonly body: string

  constructor(options?: IResponseOptions) {
    this.body = options.body ? JSON.stringify(options.body) : JSON.stringify({})
    this.statusCode = options.statusCode ? options.statusCode : 200
    this.headers = options.headers ? options.headers : {}
  }
}

