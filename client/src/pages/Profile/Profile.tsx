import { useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";

import AddPostModal from "components/AddPostModal/AddPostModal";
import Post from "components/Post";

const GET_PROFILE = gql`
	query GetProfile($userId: ID!) {
		profile(userId: $userId) {
			bio
			isMyProfile
			user {
				id
				name
				posts {
					id
					title
					content
					createdAt
				}
			}
		}
	}
`;

const Profile: React.FC = () => {
	const { id } = useParams();

	const { loading, error, data } = useQuery(GET_PROFILE, {
		variables: {
			userId: id,
		},
	});

	if (error) return <div>Error Page</div>;

	if (loading) return <div>Loading...</div>;

	const { bio, user, isMyProfile } = data.profile;

	return (
		<div>
			<div
				style={{
					marginBottom: "2rem",
					display: "flex ",
					justifyContent: "space-between",
				}}
			>
				<div>
					<h1>{user.name}</h1>
					<p>{bio}</p>
				</div>
				<div>{isMyProfile ? <AddPostModal /> : null}</div>
			</div>
			<div>
				{user.posts.map(post => (
					<Post
						key={post.id}
						id={post.id}
						title={post.title}
						content={post.content}
						date={post.createdAt}
						user={user}
						published={post.published}
						isMyProfile={false}
					/>
				))}
			</div>
		</div>
	);
};

export default Profile;
