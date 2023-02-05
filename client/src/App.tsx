import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { trpc } from './utils/trpc';
import { Hello } from "./components/Hello";
import "./index.scss";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:8080/trpc',
          headers() {
            return {
              authorization: `Bearer ${localStorage.getItem('token')}` || '',
            };
          },
        }),
      ],
    }),
  );

  return   (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Hello></Hello>

  <div className="mt-10 text-3xl mx-auto max-w-6xl">
  <div>Name: client</div>
  <div>Framework: react</div>
  <div>Language: TypeScript</div>
  <div>CSS: Tailwind</div>
</div>
</QueryClientProvider>
</trpc.Provider>
)
}

ReactDOM.render(<App />, document.getElementById("app"));
