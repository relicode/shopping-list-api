import * as AWS from 'aws-sdk'


AWS.config.apiVersions = {
  dynamodb: '2012-08-10',
  ec2: 'lastest',
  redshift: 'latest',
}

AWS.config.update({ region: process.env.REGION })

export default AWS
