import { useEffect, useState } from "react";
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
		signup(
			name: $name
			credentials: { email: $email, password: $password }
			bio: $bio
		) {
			userErrors {
				message
			}
			token
		}
	}
`;

const Signup: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [bio, setBio] = useState("");

	const [handleSignup, { data }] = useMutation<
		{ signup: ResponsePayload<{ token: string }> },
		SignupData
	>(SIGNUP);

	const handleClick = () => {
		handleSignup({
			variables: {
				name,
				bio,
				email,
				password,
			},
		});
	};

	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!data) return;

		if (data.signup.userErrors.length) {
			setError(data.signup.userErrors[0].message);
		}

		if (data.signup.token) {
			localStorage.setItem("token", data.signup.token);
			setError(null);
		}
	}, [data]);

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
