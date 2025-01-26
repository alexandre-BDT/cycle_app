import { gql } from "graphql-tag";

const userType = gql`
  type User {
    id: ID!
    username: String!
    todo: [Todo]
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(username: String!): User
    deleteUser(id: ID!): User
  }
`;

export default userType;