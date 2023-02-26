import {
	useContext,
	createContext,
	useState,
	ReactNode,
	useEffect,
	useRef,
} from 'react';
import { trpc } from '../utils/trpc';
import React from 'react';

interface AuthContextInterface {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface User {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
}

const AuthContext = createContext({} as AuthContextInterface);
AuthContext.displayName = 'AuthContext';

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const attempted = useRef(false);

	const token = localStorage.getItem('token');

	const loginWithToken = trpc.loginWithToken.useMutation({
		onSuccess({ user }) {
			setUser(user);
		},
		onError(error) {
			console.error(error);
		},
	});

	if (!attempted.current && token && !user) {
		loginWithToken.mutate();
		attempted.current = true;
	}

	// if (token && !user) {
	// 	console.log('inside loginwithtoken attempt');
	// 	const login = trpc.loginWithToken.useMutation({
	// 		onSuccess({ user }) {
	// 			console.log(user);
	// 			setUser(user);
	// 		},
	// 		onError(error) {
	// 			console.log(error);
	// 		},
	// 		onSettled() {
	// 			console.log('settled');
	// 		},
	// 	});

	// 	login.mutate();
	// }

	// async () => {
	// 	const test = trpc.loginWithToken.useMutation({
	// 		onSuccess({ user }) {
	// 			console.log(user);
	// 			setUser(user);
	// 		},
	// 		onError(error) {
	// 			console.log(error);
	// 		},
	// 	});
	// 	console.log(test);
	// };

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
