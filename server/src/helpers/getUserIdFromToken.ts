import JWT from "jsonwebtoken";

export const getUserIdFromToken = (token: string) => {
	if (!process.env.JWT_SECRET) {
		throw new Error("JWT_SECRET is not defined.");
	}

	try {
		return +JWT.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		return;
	}
};
