export default class Request {
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
