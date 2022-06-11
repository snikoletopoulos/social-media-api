import { Post as IPost, User } from "@prisma/client";
import { userLoader } from "data-loaders/userLoader";

import { Context } from "../app";

export const Post = {
	user: async (post: IPost, _: any, { prisma }: Context): Promise<User> => {
		const user = await userLoader.load(post.authorId);

		if (!user) {
			throw new Error(`No user found for post with id ${post.id}.`);
		}

		return user;
	},
};
