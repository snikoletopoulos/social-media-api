import { User as IUser, Post } from "@prisma/client";
import { Context } from "../app";

export const User = {
	posts: (
		user: IUser,
		_: any,
		{ prisma, user: requestUser }: Context
	): Promise<Post[]> => {
		const isOwnProfile = user.id === requestUser?.id;

		return prisma.post.findMany({
			where: {
				authorId: user.id,
				...(isOwnProfile ? {} : { published: true }),
			},
			orderBy: [
				{
					createdAt: "desc",
				},
			],
		});
	},
};
