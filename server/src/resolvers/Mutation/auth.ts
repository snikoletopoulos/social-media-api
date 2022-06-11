import validator from "validator";
import * as bcrypt from "bcrypt";
import * as JWT from "jsonwebtoken";

import { IError } from "../../types/errors";
import { Context } from "../../app";

interface Credentials {
	email: string;
	password: string;
}

interface SignupArgs {
	credentials: Credentials;
	name: string;
	bio?: string;
}

interface UserPayload {
	userErrors: IError[];
	token: string | null;
}

export const authResolvers = {
	signup: async (
		_: any,
		{ name, credentials: { email, password }, bio }: SignupArgs,
		{ prisma }: Context
	): Promise<UserPayload> => {
		try {
			const emailIsValid = validator.isEmail(email);
			const passwordIsValid = validator.isLength(password, { min: 5 });

			if (!emailIsValid) {
				throw new Error("Email is invalid.");
			}

			if (!passwordIsValid) {
				throw new Error("Password must be at least 5 characters.");
			}

			if (!name || !bio) {
				throw new Error("Invalid name or bio.");
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			const user = await prisma.user.create({
				data: {
					name,
					email,
					password: hashedPassword,
				},
			});

			const profile = await prisma.profile.create({
				data: {
					name,
					bio,
					userId: user.id,
				},
			});

			if (!process.env.JWT_SECRET) {
				throw new Error("JWT_SECRET is not defined.");
			}

			const token = JWT.sign(
				{
					userId: user.id,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: 36000000,
				}
			);

			return {
				token,
				userErrors: [],
			};
		} catch (error) {
			if (error instanceof Error) {
				return {
					token: null,
					userErrors: [
						{
							message: error.message,
						},
					],
				};
			}

			return {
				token: null,
				userErrors: [
					{
						message: "An error occurred while creating the user.",
					},
				],
			};
		}
	},

	signin: async (
		_: any,
		{ credentials: { email, password } }: { credentials: Credentials },
		{ prisma }: Context
	): Promise<UserPayload> => {
		try {
			const user = await prisma.user.findUnique({
				where: {
					email,
				},
			});

			if (!user) {
				throw new Error("Invalid credentials.");
			}

			const isPasswordCorrect = await bcrypt.compare(password, user.password);

			if (!isPasswordCorrect) {
				throw new Error("Invalid credentials.");
			}

			if (!process.env.JWT_SECRET) {
				throw new Error("JWT_SECRET is not defined.");
			}

			const token = JWT.sign(
				{
					userId: user.id,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: 36000000,
				}
			);

			return {
				token,
				userErrors: [],
			};
		} catch (error) {
			if (error instanceof Error) {
				return {
					token: null,
					userErrors: [
						{
							message: error.message,
						},
					],
				};
			}

			return {
				token: null,
				userErrors: [
					{
						message: "An error occurred while signing in.",
					},
				],
			};
		}
	},
};
