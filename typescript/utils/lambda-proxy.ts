export class Request {
  readonly body?: string
  constructor(event: object) {
    for (let i of Object.entries(event)) {
      this[i[0]] = i[1]
    }
  }
  getBody() {
    return typeof this.body === 'string' ? JSON.parse(this.body) : {}
  }
}

interface ResponseOptions {
    statusCode?: number
    headers?: object
    body?: object
  }

export class Response {
    readonly statusCode: number
    readonly headers: object = {}
    readonly body: string
  
    constructor(options?: ResponseOptions) {
      this.body = options.body ? JSON.stringify(options.body) : JSON.stringify({})
      this.statusCode = options.statusCode ? options.statusCode : 200
      this.headers = options.headers ? options.headers : {}
    }
  }
  