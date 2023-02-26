import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { trpc } from '../utils/trpc';
import '../index.scss';
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from '../context/auth';
import { App } from '../App';

export const Providers = () => {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: 'http://localhost:8080/trpc',
					headers() {
						return {
							authorization: localStorage.getItem('token') || '',
						};
					},
				}),
			],
		})
	);
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<MantineProvider withGlobalStyles withNormalizeCSS>
						<App />
					</MantineProvider>
				</AuthProvider>
			</QueryClientProvider>
		</trpc.Provider>
	);
};
