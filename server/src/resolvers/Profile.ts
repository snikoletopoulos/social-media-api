import { Profile as IProfile, User } from "@prisma/client";

import { Context } from "../app";

export const Profile = {
	user: async (
		profile: IProfile,
		_2: any,
		{ prisma }: Context
	): Promise<User> => {
		const user = await prisma.user.findUnique({
			where: {
				id: profile.userId,
			},
		});

		if (!user) {
			throw new Error(`No user found for profile with id ${profile.id}.`);
		}

		return user;
	},

	isMyProfile: (profile: IProfile, _2: any, { user }: Context): boolean => {
		if (!user) {
			return false;
		}

		return profile.userId === user.id;
	},
};
