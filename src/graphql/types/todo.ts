import { gql } from "graphql-tag";

const userType = gql`
  type ClapCount {
    userId: ID!
    clapCount: Int!
  }

  type Todo {
    id: ID!
    title: String!
    description: String
    createdAt: String!
    clap: [Clap]
    clapCounts: [ClapCount]
    totalClaps: Int!
  }

  type Query {
    todo(id: ID!): Todo
    todos: [Todo]
  }

  type Mutation {
    createTodo(
      title: String!
      description: String!
      userId: ID!
    ): Todo
    updateTodo(
      id: ID!
      title: String!
      description: String!
    ): Todo
    deleteTodo(
      id: ID!
    ): Todo
  }
`;

export default userType;