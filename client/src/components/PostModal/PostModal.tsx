import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

import { AddPostVariables, UpdatePostVariables } from "./PostModal.types";
import { ResponsePayload } from "types/response.types";

const ADD_POST = gql`
	mutation AddPost($title: String!, $content: String!) {
		postCreate(post: { title: $title, content: $content }) {
			userErrors {
				message
			}
			post {
				title
			}
		}
	}
`;

const UPDATE_POST = gql`
	mutation UpdatePost($postId: ID!, $title: String!, $content: String!) {
		postUpdate(postId: $postId, post: { title: $title, content: $content }) {
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
	postId?: number;
	post?: {
		title: string;
		content: string;
	};
}

const PostModal: React.FC<Props> = props => {
	const [show, setShow] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [addPost, { data: addPostData }] = useMutation<
		{ postCreate: ResponsePayload<{ post: { title: string } }> },
		AddPostVariables
	>(ADD_POST);
	const [updatePost, { data: updatePostData }] = useMutation<
		{ postCreate: ResponsePayload<{ post: { title: string } }> },
		UpdatePostVariables
	>(UPDATE_POST);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		if (!addPostData && !updatePostData) return;

		if (addPostData?.postCreate?.userErrors.length) {
			setError(addPostData.postCreate.userErrors[0].message);
		}

		if (updatePostData?.postCreate?.userErrors.length) {
			setError(updatePostData.postCreate.userErrors[0].message);
		}
	}, [addPostData, updatePostData]);

	const [content, setContent] = useState(props.post?.content ?? "");
	const [title, setTitle] = useState(props.post?.title ?? "");

	const handleSubmit = () => {
		if (!title || !content) return;

		if (props.postId) {
			updatePost({
				variables: {
					postId: props.postId,
					title,
					content,
				},
			});
		} else {
			addPost({
				variables: {
					title,
					content,
				},
			});
		}
		handleClose();
	};

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				{props.postId ? "Update" : "Add"} Post
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Add Post</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								placeholder=""
								value={title}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
									setTitle(event.target.value)
								}
							/>
						</Form.Group>

						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1"
						>
							<Form.Label>Content</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								value={content}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
									setContent(event.target.value)
								}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					{error && <p>{error}</p>}
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSubmit}>
						{props.postId ? "Update" : "Add"}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default PostModal;
