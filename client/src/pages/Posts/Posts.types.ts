export interface GetPostsData {
	posts: {
		id: number;
		title: string;
		content: string;
		createdAt: number;
		published: boolean;
		user: {
			name: string;
		};
	}[];
}
