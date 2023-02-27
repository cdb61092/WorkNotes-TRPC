import React from 'react';
import ReactDOM from 'react-dom/client';
import { Login } from './components/Login';
import { useAuth } from './context/auth';
import { Layout } from './pages/Layout';
import { Providers } from './context/providers';
import './index.scss';
import {
	BrowserRouter,
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
import { Home } from './pages/Home';
import { NoteEditor } from './pages/NoteEditor';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/notes',
				element: <NoteEditor />,
			},
		],
	},
]);

export const App = () => {
	const { user } = useAuth();
	return user ? <RouterProvider router={router} /> : <Login />;
};

const rootNode = document.getElementById('app');
const root = ReactDOM.createRoot(rootNode!);
root.render(<Providers />);
