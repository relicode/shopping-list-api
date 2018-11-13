import * as AWS from 'aws-sdk'

import Logger from '@utils/logger'


const { DynamoDB } = AWS
const { error } = new Logger('services/dynamo-client')

export default {
  docClient: new DynamoDB.DocumentClient(),

  async get(params: AWS.DynamoDB.GetItemInput) {
    try {
      return await this.docClient.get(params).promise()
    } catch (e) {
      error(e)
      throw e
    }
  },

  async put(params: AWS.DynamoDB.PutItemInput) {
    try {
      return await this.docClient.put(params).promise()
    } catch (e) {
      error(e)
      throw e
    }
  }
}
