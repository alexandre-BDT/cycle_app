import { gql } from "graphql-tag";

const clapType = gql`
  type Clap {
    todoId: ID!
    userId: ID!
    createdAt: String!
    user: User!
    }

  type Query {
    claps(todoId: ID!): [Clap]
    clapsByUser(userId: ID!): [Clap]
  }

  type Mutation {
    clapTodo(todoId: ID!, userId: ID!): Clap
    unclap(todoId: ID!, userId: ID!): Clap
  }
`;

export default clapType;