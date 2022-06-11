import { Post, User, Profile } from "@prisma/client";
import { Context } from "../app";

export const Query = {
	me: (_: any, _2: any, { user }: Context): User => {
		if (!user) {
			throw new Error("You must be logged in to get your profile.");
		}

		return user;
	},

	posts: (_: any, _2: any, { prisma }: Context): Promise<Post[]> =>
		prisma.post.findMany({
			orderBy: [
				{
					createdAt: "desc",
				},
			],
		}),

	profile: async (
		_: any,
		{ userId }: { userId?: string },
		{ prisma, user }: Context
	): Promise<Profile> => {
		const userToFind = userId ? +userId : user?.id;

		if (!userToFind) {
			throw new Error(
				"You must provide a userId or be logged in to get your profile."
			);
		}

		const profile = await prisma.profile.findUnique({
			where: {
				userId: userToFind,
			},
		});

		if (!profile) {
			throw new Error(`No profile found for user with id ${userToFind}.`);
		}

		return profile;
	},
};
