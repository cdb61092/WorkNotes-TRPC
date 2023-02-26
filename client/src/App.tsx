import React from 'react';
import ReactDOM from 'react-dom/client';
import { Login } from './components/Login';
import { useAuth } from './context/auth';
import { Home } from './pages/Home';
import { Providers } from './context/providers';
import './index.scss';

export const App = () => {
	const { user } = useAuth();
	return user ? <Home /> : <Login />;
};

const rootNode = document.getElementById('app');
const root = ReactDOM.createRoot(rootNode!);
root.render(<Providers />);
