import * as Joi from 'joi'


export const validateSchema = (item: object, schema: Joi.Schema) => {
  const result = Joi.validate(item, schema, { abortEarly: false })
  if (result.error !== null) {
    const errorMessage = result.error.details.map((d) => d.message).join('\n')
    throw new Error(errorMessage)
  }
  return item
}
