const { buildSchema } = require('graphql');

module.exports = buildSchema(`


type User {
  _id: ID!
  email: String!
  password: String!
  photo: String
}
type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}
input ResetPasswordInput {
  password: String!
  password1: String!
  password2: String!
  
}

type RootQuery {
    
    login(email: String!, password: String!): AuthData!
}
type RootMutation {
    createUser(email: String!, password: String!):User!
    resetPassword(resetPasswordInput: ResetPasswordInput): User!
    fileUpload(photo: String! ): User
    forgotPassword(email: String!): User
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);