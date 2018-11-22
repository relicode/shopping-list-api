import { ErrorResponse, Request, Response } from '@utils/lambda-proxy'
import mapError, { DUMMY_TEAPOT } from '@utils/errors'

// Request

test('Request instanciated properly', () => {
  const request = new Request({
    headers: { key: 'value' },
    body: 'body value',
  }) as any
  expect(request.headers.key).toEqual('value')
  expect(request.body).toEqual('body value')
})

test('Request getBody works as expected', () => {
  expect(new Request({
    body: JSON.stringify({ bodyKey: 'body value' }),
  }).getBody()).toEqual({ bodyKey: 'body value' })
})

test('Request getBody throws a BODY_JSON', async () => {
  try {
    new Request({}) // tslint:disable-line
  } catch (err) {
    expect(err.messsage.toEqual(DUMMY_TEAPOT))
  }
})

// Response

test('Response instanciated properly with minimal options', () => {
  expect(new Response({ body: {} })).toEqual({
    body: '{}',
    headers: {},
    statusCode: 200,
  })
})

test('Response instanciated properly with full options', () => {
  expect(new Response({
    body: {
      key: 'value',
    },
    headers: {
      myExtraHeader: 'my extra header',
    },
    statusCode: 201,
  })).toEqual({
    body: '{"key":"value"}',
    headers: { myExtraHeader: 'my extra header' },
    statusCode: 201,
  })
})

// ErrorResponse

test('ErrorResponse instanciated properly with minimal options', () => {
  expect(new ErrorResponse(new Error())).toEqual({
    body: JSON.stringify({ message: 'Uncharted error' }),
    headers: {},
    statusCode: 500,
  })
})

test('ErrorResponse instanciated properly with more options', () => {
  expect(new ErrorResponse(DUMMY_TEAPOT)).toEqual({
    body: JSON.stringify({ message: mapError(DUMMY_TEAPOT).message }),
    headers: {},
    statusCode: mapError(DUMMY_TEAPOT).statusCode,
  })
})

test('ErrorResponse instanciated properly with full options', () => {
  expect(new ErrorResponse(DUMMY_TEAPOT, {
    body: { key: 'value' },
    headers: { myExtraHeader: 'my extra header value' },
    statusCode: 500,
  })).toEqual({
    body: JSON.stringify({ key: 'value' }),
    headers: { myExtraHeader: 'my extra header value' },
    statusCode: 500,
  })
})
