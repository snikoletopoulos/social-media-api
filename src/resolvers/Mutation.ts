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

	postUpdate: async (
		_: any,
		{ postId, post }: PostArgs,
		{ prisma }: Context
	): Promise<PostPayloadType> => {
		try {
			if ((!post.content && !post.title) || !postId) {
				throw new Error(
					"You must provide a postId and title or content to update a post."
				);
			}

			const existingPost = await prisma.post.findUnique({
				where: {
					id: +postId,
				},
			});

			if (!existingPost) {
				throw new Error("The post you are trying to update does not exist.");
			}

			const updatedPostData = {
				title: post.title || existingPost.title,
				content: post.content || existingPost.content,
			};

			return {
				post: await prisma.post.update({
					where: {
						id: +postId,
					},
					data: {
						...updatedPostData,
					},
				}),
				userErrors: [],
			};
		} catch (error) {
			if (error instanceof Error) {
				return {
					post: null,
					userErrors: [
						{
							message: error.message,
						},
					],
				};
			}

			return {
				post: null,
				userErrors: [
					{
						message: "An error occurred while updating the post.",
					},
				],
			};
		}
	},

	postDelete: async (
		_: any,
		{ postId }: { postId: string },
		{ prisma }: Context
	): Promise<PostPayloadType> => {
		try {
			if (!postId) {
				throw new Error("You must provide a postId to delete a post.");
			}

			const post = await prisma.post.findUnique({
				where: {
					id: +postId,
				},
			});

			if (!post) {
				throw new Error("The post you are trying to delete does not exist.");
			}

			await prisma.post.delete({
				where: {
					id: +postId,
				},
			});

			return {
				post,
				userErrors: [],
			};
		} catch (error) {
			if (error instanceof Error) {
				return {
					post: null,
					userErrors: [
						{
							message: error.message,
						},
					],
				};
			}

			return {
				post: null,
				userErrors: [
					{
						message: "An error occurred while updating the post.",
					},
				],
			};
		}
	},
};
