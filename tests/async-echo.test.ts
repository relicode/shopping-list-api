import { handler } from '@functions/async-echo'


test('Status code 200 given', async () => {
  const response = await handler({})
  expect(response.statusCode).toBe(200)
})

test('Status code 418 given', async () => {
  const response = await handler({
    body: JSON.stringify({ fail: true }),
  })
  expect(response.statusCode).toBe(418)
})

test('Status code 400 given for invalid JSON in body', async () => {
  const response = await handler({
    body: '{"not: JSON}', // Invalid JSON
  })
  expect(response.statusCode).toBe(400)
})
