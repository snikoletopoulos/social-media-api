export interface AddPostVariables {
	title: string;
	content: string;
}

export interface UpdatePostVariables {
	postId: number;
	title?: string;
	content?: string;
}
