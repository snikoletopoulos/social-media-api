import { Post } from "@prisma/client";
import { Context } from "../app";

interface PostCreateArgs {
	content: string;
	title: string;
}

interface PostPayloadType {
	userErrors: {
		message: string;
	}[];
	post: Post | null;
}

export const Mutation = {
	postCreate: async (
		_: any,
		{ title, content }: PostCreateArgs,
		{ prisma }: Context
	): Promise<PostPayloadType> => {
		try {
			if (!title || !content) {
				throw new Error(
					"You must provide a title and content to create a post."
				);
			}

			const post = await prisma.post.create({
				data: {
					title,
					content,
					authorId: 1,
				},
			});

			return {
				post,
				userErrors: [],
			};
		} catch (error) {
			return {
				post: null,
				userErrors: [
					{
						message: "An error occurred while creating the post.",
					},
				],
			};
		}
	},

	postUpdate: async () => {},
};
