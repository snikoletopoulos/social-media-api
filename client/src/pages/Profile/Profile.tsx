import { useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";

import PostModal from "components/PostModal";
import Post from "components/Post";
import { GetProfileData, GetProfileVariables } from "./Profile.types";

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
					published
					createdAt
				}
			}
		}
	}
`;

const Profile: React.FC = () => {
	const { id } = useParams();

	const { loading, error, data } = useQuery<
		GetProfileData,
		GetProfileVariables
	>(GET_PROFILE, {
		variables: {
			userId: id ? +id : 0,
		},
	});

	if (error) return <div>Error Page</div>;

	if (loading) return <div>Loading...</div>;

	if (!data) return <div>No data</div>;

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
				<div>{isMyProfile ? <PostModal /> : null}</div>
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
						isMyProfile={isMyProfile}
					/>
				))}
			</div>
		</div>
	);
};

export default Profile;
