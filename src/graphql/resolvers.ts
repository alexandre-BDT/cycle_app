import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./resolvers/user";
import todoResolvers from "./resolvers/todo";
import clapResolvers from "./resolvers/clap";

const resolvers = mergeResolvers([userResolver, todoResolvers, clapResolvers]);

export default resolvers;