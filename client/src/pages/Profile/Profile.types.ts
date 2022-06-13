export interface GetProfileData {
	profile: {
		bio: string;
		isMyProfile: boolean;
		user: {
			id: number;
			name: string;
			posts: {
				id: number;
				title: string;
				content: string;
				published: boolean;
				createdAt: number;
			}[];
		};
	};
}

export interface GetProfileVariables {
	userId: number;
}
