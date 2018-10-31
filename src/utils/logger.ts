export default class Logger {
  constructor(public readonly prefix: string) {}

  public error = (...message: Array<string | object>): void => {
    this.formMessage(message, 'error')
  }

  public info = (...message: Array<string | object>): void => {
    this.formMessage(message, 'info')
  }

  public log = (...message: Array<string | object>): void => {
    this.formMessage(message, 'log')
  }

  public warn = (...message: Array<string | object>): void => {
    this.formMessage(message, 'warn')
  }

  private formMessage(message: Array<string | object>, type: 'error' | 'info' | 'log' | 'warn') {
    console[type](`${this.prefix} - ${type}: ${this.sanitizeMessage(message)}`) // tslint:disable-line:no-console
  }

  private sanitizeMessage(message: Array<string | object>): string {
    return message.map((m) => (
      typeof m === 'string' ? m : JSON.stringify(m, null, 2)
    )).join('\n')
  }
}
