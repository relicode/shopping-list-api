interface HttpErrorData {
  /** The message in the response body */
  message: string,
  /** The statusCode in the response */
  statusCode: number,
}

/** Error literals used for retrieving the proper data from errorMap */
export type ErrorName = 'BODY_JSON' | 'DUMMY_TEAPOT' | 'ITEM_NOT_FOUND' | 'SHOPPING_LIST_NOT_FOUND'

export const BODY_JSON: ErrorName = 'BODY_JSON'
export const ITEM_NOT_FOUND: ErrorName = 'ITEM_NOT_FOUND'
export const DUMMY_TEAPOT: ErrorName = 'DUMMY_TEAPOT'
export const SHOPPING_LIST_NOT_FOUND: ErrorName = 'SHOPPING_LIST_NOT_FOUND'


const defaultError = { message: 'Uncharted error', statusCode: 500 }

const generateError = (message: string, statusCode: number): HttpErrorData => (
  { message, statusCode }
)

const errorMap = {
  [BODY_JSON]: generateError('Invalid body JSON.', 400),
  [DUMMY_TEAPOT]: generateError('Dummy teapot error', 418),
  [ITEM_NOT_FOUND]: generateError('Item not found.', 404),
  [SHOPPING_LIST_NOT_FOUND]: generateError('Shopping list not found.', 404),
}

/**
 * Function for retrieving proper errorData from the errorMap, defaults to defaultError if not found.
 *
 * @param key - A ErrorName literal
 * @returns A mapped error with a message and statusCode properties
 */
export default (key: ErrorName): HttpErrorData => {
  return errorMap[key] ? errorMap[key] : defaultError
}
