import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element not found");
}

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
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
