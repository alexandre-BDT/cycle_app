import { mergeTypeDefs } from "@graphql-tools/merge";
import userType from "./types/user";
import todoType from "./types/todo";
import clapType from "./types/clap";

const typeDefs = mergeTypeDefs([userType, todoType, clapType]);

export default typeDefs;