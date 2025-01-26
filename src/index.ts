import { ApolloServer } from "@apollo/server"
import { PrismaClient } from "@prisma/client";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import cors from "cors"
import express from "express"

const app = express();
const port = 4000;

interface PrismaContext {
  prisma: PrismaClient;
}

const server = async () => {
  const prisma = new PrismaClient();

  const server = new ApolloServer<PrismaContext>({
    typeDefs,
    resolvers
  });
  await server.start();

  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => ({
        prisma,
      }),
    })
  );

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/graphql`);
  });
}

try {
  server();
} catch (err) {
  console.log(err);
}