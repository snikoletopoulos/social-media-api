import * as JWT from "jsonwebtoken";

export const getUserIdFromToken = (token: string) => {
	if (!process.env.JWT_SECRET) {
		throw new Error("JWT_SECRET is not defined.");
	}

	try {
		const jwt = JWT.verify(token, process.env.JWT_SECRET);

		if (typeof jwt === "string" || !("userId" in jwt)) {
			throw new Error("Invalid token.");
		}

		return jwt.userId;
	} catch (error) {
		console.log(error);
		return;
	}
};
