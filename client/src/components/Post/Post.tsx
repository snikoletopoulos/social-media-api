import styles from "./Post.module.css";
import { gql, useMutation } from "@apollo/client";
import { ResponsePayload } from "types/response.types";

import { PostDeleteVariables, PublusityVariables } from "./Post.types";

import PostModal from "components/PostModal";

const PUBLISH_POST = gql`
	mutation PublishPost($postId: ID!) {
		postPublish(postId: $postId) {
			userErrors {
				message
			}
			post {
				title
			}
		}
	}
`;

const UNPUBLISH_POST = gql`
	mutation UnpublishPost($postId: ID!) {
		postUnpublish(postId: $postId) {
			userErrors {
				message
			}
			post {
				title
			}
		}
	}
`;

const DELETE_POST = gql`
	mutation DeletePost($postId: ID!) {
		postDelete(postId: $postId) {
			userErrors {
				message
			}
			post {
				title
			}
		}
	}
`;

interface Props {
	id: number;
	title: string;
	content: string;
	date: number;
	user: {
		name: string;
	};
	published: boolean;
	isMyProfile: boolean;
}

const Post: React.FC<Props> = props => {
	const { title, content, date, user, published, isMyProfile } = props;
	const [publishPost] = useMutation<
		ResponsePayload<{ title: string }>,
		PublusityVariables
	>(PUBLISH_POST);
	const [unpublishPost] = useMutation<
		ResponsePayload<{ title: string }>,
		PublusityVariables
	>(UNPUBLISH_POST);
	const [deletePost] = useMutation<
		ResponsePayload<{ title: string }>,
		PostDeleteVariables
	>(DELETE_POST, { variables: { postId: props.id } });

	const formatedDate = new Date(+date);

	const togglePublished = () => {
		if (published) {
			unpublishPost({
				variables: {
					postId: props.id,
				},
			});
		} else {
			publishPost({
				variables: {
					postId: props.id,
				},
			});
		}
	};

	return (
		<div
			className={styles.Post}
			style={published === false ? { backgroundColor: "hotpink" } : {}}
		>
			{isMyProfile && (
				<div className={styles["Post__actions"]}>
					<p onClick={togglePublished}>{published ? "unpublish" : "publish"}</p>
					<p onClick={() => deletePost()}>delete</p>
				</div>
			)}
			<div className={styles["Post__header-container"]}>
				<h2>{title}</h2>
				<PostModal
					postId={props.id}
					post={{ title: props.title, content: props.content }}
				/>
				<h4>
					Created At {formatedDate.toString().split(" ").splice(0, 3).join(" ")}{" "}
					by {user.name}
				</h4>
			</div>
			<p>{content}</p>
		</div>
	);
};

export default Post;
