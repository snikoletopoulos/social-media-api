import styles from "./Post.module.css";

interface Props {
	id: number;
	title: string;
	content: string;
	date: number;
	user: string;
	published: boolean;
	isMyProfile: boolean;
}

const Post: React.FC<Props> = props => {
	const { title, content, date, user, published, isMyProfile } = props;

	const formatedDate = new Date(+date);

	return (
		<div
			className={styles.Post}
			style={published === false ? { backgroundColor: "hotpink" } : {}}
		>
			{isMyProfile && (
				<p className={styles["Post__publish"]} onClick={() => {}}>
					{published ? "publish" : "unpublish"}
				</p>
			)}
			<div className={styles["Post__header-container"]}>
				<h2>{title}</h2>
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
