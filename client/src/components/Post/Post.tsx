import styles from "./Post.module.css";

interface Props {
	title: string;
	content: string;
	date: number;
	user: string;
	published: boolean;
	id: string;
	isMyProfile: boolean;
}

const Post: React.FC<Props> = ({
	title,
	content,
	date,
	user,
	published,
	id,
	isMyProfile,
}) => {
	const formatedDate = new Date(Number(date));
	return (
		<div
			className="Post"
			style={published === false ? { backgroundColor: "hotpink" } : {}}
		>
			{isMyProfile && published === false && (
				<p className={styles["Post__publish"]} onClick={() => {}}>
					publish
				</p>
			)}
			{isMyProfile && published === true && (
				<p className={styles["Post__publish"]} onClick={() => {}}>
					unpublish
				</p>
			)}
			<div className={styles["Post__header-container"]}>
				<h2>{title}</h2>
				<h4>
					Created At {`${formatedDate}`.split(" ").splice(0, 3).join(" ")} by{" "}
					{user}
				</h4>
			</div>
			<p>{content}</p>
		</div>
	);
};

export default Post;
