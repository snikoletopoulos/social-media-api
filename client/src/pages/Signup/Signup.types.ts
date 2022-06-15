import { UserCredentials } from "types/user.types";

export interface SignupData {
	name: string;
	bio?: string;
	credentials: UserCredentials;
}
