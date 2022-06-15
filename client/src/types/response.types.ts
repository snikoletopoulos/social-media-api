import { IError } from "./error.types";

export type ResponsePayload<T> = T & {
	userErrors: IError[];
};
