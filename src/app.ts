import { ApolloServer } from "apollo-server";
import { PrismaClient, User } from "@prisma/client";

import { typeDefs } from "./schema";
import { Query, Mutation } from "./resolvers";
import { getUserIdFromToken } from "./helpers/getUserIdFromToken";

const prisma = new PrismaClient();

export interface Context {
	prisma: PrismaClient;
	user: User | null;
}

const server = new ApolloServer({
	typeDefs,
	resolvers: {
		Query,
		Mutation,
	},
	context: async ({ req, res }): Promise<Context> => {
		const { authorization } = req.headers;

		const userId = authorization
			? getUserIdFromToken(authorization)
			: undefined;

		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		return {
			prisma,
			user,
		};
	},
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
