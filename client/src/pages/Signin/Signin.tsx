import { useState, useEffect } from "react";

import { Form } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";

const Signin: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleClick = () => {};

	const [error, setError] = useState(null);

	return (
		<div>
			<Form>
				<Form.Group className="mb-3">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="text"
						placeholder=""
						value={email}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							setEmail(event.target.value)
						}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder=""
						value={password}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							setPassword(event.target.value)
						}
					/>
				</Form.Group>

				{error && <p>{error}</p>}
				<Button onClick={handleClick}>Signin</Button>
			</Form>
		</div>
	);
};

export default Signin;
