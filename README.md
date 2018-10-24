# Serverless-TypeScript-Boilerplate

## Project boilerplate when using Serverless / Webpack / TypeScript

Based on serverless-webpack's TypeScript example ( https://github.com/serverless-heaven/serverless-webpack/tree/master/examples/typescript ) with updated libraries and entry point specific building.

## Important:

The strange lib array in tsconfig.json is needed because of an issue in the TS
GraphQL libraries: https://github.com/apollographql/graphql-subscriptions/issues/83

Regardless if you use it or not, the build will fail without them!
The lib configuration can and should be removed as soon as the issue has been fixed.
