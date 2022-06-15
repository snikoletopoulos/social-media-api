import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

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

const AddPostModal: React.FC = () => {
	const [show, setShow] = useState(false);
	const [addPost] = useMutation(ADD_POST);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");

	const handleAddPost = () => {
		addPost({
			variables: {
				title,
				content,
			},
		});
		handleClose();
	};

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Add Post
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
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleAddPost}>
						Add
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddPostModal;
