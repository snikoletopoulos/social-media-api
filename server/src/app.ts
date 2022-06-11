import { ApolloServer } from "apollo-server";
import { PrismaClient, User } from "@prisma/client";

import { typeDefs } from "./schema";
import * as resolvers from "./resolvers";
import { getUserIdFromToken } from "./helpers/getUserIdFromToken";

export const prisma = new PrismaClient();

export interface Context {
	prisma: PrismaClient;
	user: User | null;
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }): Promise<Context> => {
		const { authorization } = req.headers;

		const userId = authorization
			? getUserIdFromToken(authorization)
			: undefined;

		let user: User | null = null;
		if (userId) {
			try {
				user = await prisma.user.findUnique({
					where: {
						id: userId,
					},
				});
			} catch (error) {
				console.log(error);
			}
		}

		return {
			prisma,
			user,
		};
	},
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
