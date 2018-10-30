import * as AWS from 'aws-sdk'


const { DynamoDB } = AWS

export default class DynamoClient {
  private readonly docClient: AWS.DynamoDB.DocumentClient = new DynamoDB.DocumentClient()

  constructor(public readonly tableName: AWS.DynamoDB.TableName = '') {}

  public async put(item: AWS.DynamoDB.PutItemInputAttributeMap, tableName: AWS.DynamoDB.TableName = this.tableName) {
    return await this.action('put', {
      Item: item,
      TableName: tableName,
      ReturnValues: 'NONE',
    })
  }

  private async action(actionType: 'put', params: AWS.DynamoDB.PutItemInput) {
    try {
      return await this.docClient[actionType](params).promise()
    } catch (e) {
      console.log('Error at dynamo-client.ts: ' + e.message) // tslint:disable-line
      throw e
    }
  }
}
