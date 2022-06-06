import { Context } from "../app";

export const Query = {
	posts: (_: any, _2: any, { prisma }: Context) => {
		return prisma.post.findMany({
			orderBy: [
				{
					createdAt: "desc",
				},
			],
		});
	},
};
