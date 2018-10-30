/* tslint:disable:no-console */

export default class Logger {
  constructor(public readonly prefix: string) {}
  public error(message: string) {
    console.error(`${this.prefix} - error: ${this.sanitizeMessage(message)}`)
  }
  public info(message: string) {
    console.info(`${this.prefix} - info: ${this.sanitizeMessage(message)}`)
  }
  public log(message: string) {
    console.log(`${this.prefix} - log: ${this.sanitizeMessage(message)}`)
  }
  public warn(message: string) {
    console.warn(`${this.prefix} - warn: ${this.sanitizeMessage(message)}`)
  }
  protected sanitizeMessage(message: string | object) {
    return typeof message === 'string' ? message : JSON.stringify(message, null, 2)
  }
}
