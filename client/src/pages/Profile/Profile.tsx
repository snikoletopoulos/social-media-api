import { useParams } from "react-router";

import AddPostModal from "components/AddPostModal/AddPostModal";
import Post from "components/Post/Post";

const Profile: React.FC = () => {
	const { id } = useParams();

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
					<h1>Profile Name</h1>
					<p>Profile Bio</p>
				</div>
				<div>{"profile" ? <AddPostModal /> : null}</div>
			</div>
			<div></div>
		</div>
	);
};

export default Profile;
