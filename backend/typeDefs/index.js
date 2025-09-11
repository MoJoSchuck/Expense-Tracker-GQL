import { mergeTypeDefs } from "@graphql-tools/merge";

// typeDefs
import transactionTypeDef from "./transaction.typeDef.js";
import userTypeDef from "./user.typeDef.js";

// Merging all typeDefs
const mergedTypeDefs = mergeTypeDefs([transactionTypeDef, userTypeDef]);

export default mergedTypeDefs;
