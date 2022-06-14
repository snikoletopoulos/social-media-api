import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { UserCredentials } from "types/user.types";

import { Form } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import { ResponsePayload } from "types/response.types";

const SIGNIN = gql`
	mutation Signin($credentials: CredentialsInput!) {
		signin(credentials: $credentials) {
			userErrors {
				message
			}
			token
		}
	}
`;

const Signin: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [handleSignin, { data }] = useMutation<
		{ signin: ResponsePayload<{ token: string }> },
		{ credentials: UserCredentials }
	>(SIGNIN);

	useEffect(() => {
		if (!data) return;

		if (data.signin.userErrors.length) {
			setError(data.signin.userErrors[0].message);
		}

		if (data.signin.token) {
			localStorage.setItem("token", data.signin.token);
		}
	}, [data]);

	const handleClick = () => {
		handleSignin({
			variables: {
				credentials: {
					email,
					password,
				},
			},
		});
	};

	const [error, setError] = useState<string | null>(null);

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
