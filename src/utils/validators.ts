import * as Joi from 'joi'


export const validateSchema = (objectToValidate: object, schema: Joi.Schema) => {
  return Joi.validate(objectToValidate, schema, { abortEarly: false }, (err, value) => {
    if (!err) {
      return value
    }
    throw new Error(err.details.map((d) => d.message).join('\n'))
  })
}
