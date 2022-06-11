import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddPostModal: React.FC = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");

	const handleClick = () => {};

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
					<Button variant="primary" onClick={handleClick}>
						Add
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddPostModal;
