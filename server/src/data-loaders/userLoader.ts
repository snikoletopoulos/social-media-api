import * as Dataloader from "dataloader";
import { User } from "@prisma/client";

import { prisma } from "../app";

const BatchUsers: Dataloader.BatchLoadFn<number, User> = async keys => {
	const users = await prisma.user.findMany({
		where: {
			id: {
				in: [...keys],
			},
		},
	});

	const userMap: { [key: string]: User } = {};

	users.forEach(user => (userMap[user.id] = user));

	return keys.map(id => userMap[id]);
};

export const userLoader = new Dataloader(BatchUsers);
