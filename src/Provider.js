import * as React from "react";
import { useState, useContext, createContext } from "react";
import { useAsync } from "./useAsync";

const Context = createContext({});

export function Provider({ children, client }) {
	const [token, setToken] = useState(false);

	return (
		<Context.Provider value={{ client, token, setToken }}>
			{children}
		</Context.Provider>
	);
}

export function useToken(req) {
	const { token, setToken } = useContext(Context);
	return { token, setToken };
}

export function useFetch(req) {
	const { token, client } = useContext(Context);
	return useAsync(client(req, token));
}
