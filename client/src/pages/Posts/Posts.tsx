import { gql, useQuery } from "@apollo/client";

import { GetPostsData } from "./Posts.types";
import Post from "components/Post";

const GET_POSTS = gql`
	query {
		posts {
			id
			title
			content
			createdAt
			published
			user {
				name
			}
		}
	}
`;

const Posts: React.FC = () => {
	const { loading, error, data } = useQuery<GetPostsData>(GET_POSTS);

	if (error) return <div>Error Page</div>;

	if (loading) return <div>Loading...</div>;

	const { posts } = data ?? { posts: [] };

	return (
		<div>
			{posts.map(post => (
				<Post
					key={post.id}
					id={post.id}
					title={post.title}
					content={post.content}
					date={post.createdAt}
					user={post.user}
					published={post.published}
					isMyProfile={false}
				/>
			))}
		</div>
	);
};

export default Posts;
