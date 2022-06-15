import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element not found");
}

const httpLink = createHttpLink({
	uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("token");

	return {
		headers: {
			...headers,
			authorization: token,
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</BrowserRouter>
	</React.StrictMode>
);
