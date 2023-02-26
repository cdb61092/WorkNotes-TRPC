import {
	TextInput,
	PasswordInput,
	Checkbox,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Group,
	Button,
} from '@mantine/core';
import { trpc } from '../utils/trpc';
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/auth';

export function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { setUser, user } = useAuth();
	const token = localStorage.getItem('token');
	// const attempted = useRef(false);

	const loginWithToken = trpc.loginWithToken.useMutation({
		onSuccess({ user }) {
			console.log('in onsuccess');
			console.log(user);
			setUser(user);
		},
		onError(error) {
			console.log(error);
		},
	});

	// if (!attempted.current) {
	// 	console.log('before login.mutate()');
	// 	loginWithToken.mutate();
	// 	attempted.current = true;
	// }

	const login = trpc.login.useMutation({
		onSuccess({ token, user }) {
			console.log(`token: ${token}`);
			localStorage.setItem('token', token);
			setUser(user);
		},
	});
	const handleLogin = async () => {
		login.mutate({ email, password });
	};
	return (
		<Container size={420} my={40}>
			<Title
				align="center"
				sx={(theme) => ({
					fontFamily: `Greycliff CF, ${theme.fontFamily}`,
					fontWeight: 900,
				})}
			>
				Welcome back!
			</Title>
			<Text color="dimmed" size="sm" align="center" mt={5}>
				Do not have an account yet?{' '}
				<Anchor<'a'>
					href="#"
					size="sm"
					onClick={(event) => event.preventDefault()}
				>
					Create account
				</Anchor>
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<TextInput
					label="Email"
					placeholder="your@email.dev"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<PasswordInput
					label="Password"
					placeholder="Your password"
					required
					mt="md"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Group position="apart" mt="lg">
					<Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
					<Anchor<'a'>
						onClick={(event) => event.preventDefault()}
						href="#"
						size="sm"
					>
						Forgot password?
					</Anchor>
				</Group>
				<Button fullWidth mt="xl" onClick={handleLogin}>
					Sign in
				</Button>
			</Paper>
		</Container>
	);
}
