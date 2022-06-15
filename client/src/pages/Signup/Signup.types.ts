import { UserCredentials } from "types/user.types";

export interface SignupData extends UserCredentials {
	name: string;
	bio?: string;
}
