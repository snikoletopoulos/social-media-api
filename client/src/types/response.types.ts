import { IError } from "./error.types";

export interface ResponsePayload<T> extends T {
	userErrors: IError[];
}
