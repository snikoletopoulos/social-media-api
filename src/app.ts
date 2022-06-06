import { ApolloServer } from "apollo-server";
import { PrismaClient } from "@prisma/client";

import { typeDefs } from "./schema";
import { Query, Mutation } from "./resolvers";

const prisma = new PrismaClient();

export interface Context {
	prisma: PrismaClient;
}

const server = new ApolloServer({
	typeDefs,
	resolvers: {
		Query,
		Mutation,
	},
	context: {
		prisma,
	} as Context,
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
