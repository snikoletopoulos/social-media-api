import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { SignupData } from "./Signup.types";
import { ResponsePayload } from "types/response.types";

import Button from "@restart/ui/esm/Button";
import { Form } from "react-bootstrap";

const SIGNUP = gql`
	mutation Signup(
		$name: String!
		$email: String!
		$password: String!
		$bio: String
	) {
		userSignup(
			name: $name
			credetials: { email: $email, password: $password }
			bio: $bio
		) {
			userErrors {
				message
			}
			user {
				token
			}
		}
	}
`;

const Signup: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [bio, setBio] = useState("");

	const [handleSignup, { data, error: mutationError }] = useMutation<
		ResponsePayload<{
			user: {
				token: string;
			};
		}>,
		SignupData
	>(SIGNUP);

	console.log(data);

	const handleClick = () => {
		handleSignup({
			variables: {
				name,
				bio,
				credentials: {
					email,
					password,
				},
			},
		});
	};

	const [error, setError] = useState(null);

	return (
		<div>
			<Form>
				<Form.Group className="mb-3">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder=""
						value={name}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							setName(event.target.value)
						}
					/>
				</Form.Group>
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
				<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
					<Form.Label>Bio</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						value={bio}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							setBio(event.target.value)
						}
					/>
				</Form.Group>
				{error && <p>{error}</p>}
				<Button onClick={handleClick}>Signup</Button>
			</Form>
		</div>
	);
};

export default Signup;
