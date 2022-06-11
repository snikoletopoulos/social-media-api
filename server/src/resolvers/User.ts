import { User as IUser, Post } from "@prisma/client";
import { Context } from "../app";

export const User = {
	posts: async (
		user: IUser,
		_: any,
		{ prisma, user: requestUser }: Context
	): Promise<Post[]> => {
		const isOwnProfile = user.id === requestUser?.id;

		return await prisma.post.findMany({
			where: {
				authorId: user.id,
				...(isOwnProfile ? {} : { isPublished: true }),
			},
			orderBy: [
				{
					createdAt: "desc",
				},
			],
		});
	},
};
