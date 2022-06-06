import { Post } from "@prisma/client";
import { Context } from "../app";

interface PostContent {
	post: {
		content?: string;
		title?: string;
	};
}

interface PostArgs extends PostContent {
	postId: string;
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
		{ post: { title, content } }: PostContent,
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
			if (!(error instanceof Error)) {
				return {
					post: null,
					userErrors: [
						{
							message: "An error occurred while creating the post.",
						},
					],
				};
			}

			return {
				post: null,
				userErrors: [
					{
						message: error.message,
					},
				],
			};
		}
	},

	postUpdate: async (_: any, {post, postId}: PostArgs ) => {
		if ((!post.content && !post.title) || !postId) {
			throw new Error("You must provide a postId and title or content to update a post.");
		}

		
	},
};
