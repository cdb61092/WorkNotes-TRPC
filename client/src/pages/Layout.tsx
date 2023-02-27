import React from 'react';
import { Navbar } from '../components/Navbar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
	return (
		<div style={{ display: 'flex' }}>
			<Navbar />
			<div
				style={{
					height: '100vh',
					width: '100%',
					overflow: 'hidden',
				}}
			>
				<Outlet />
			</div>
		</div>
	);
};
