import { Post as IPost, User } from "@prisma/client";

import { Context } from "../app";

export const Post = {
	user: async (post: IPost, _: any, { prisma }: Context): Promise<User> => {
		const user = await prisma.user.findUnique({
			where: {
				id: post.authorId,
			},
		});

		if (!user) {
			throw new Error(`No user found for post with id ${post.id}.`);
		}

		return user;
	},
};
