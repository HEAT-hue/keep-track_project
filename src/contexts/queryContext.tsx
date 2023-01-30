// jshint esversion:6

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';


interface QueryProviderProps {
    children: React.ReactNode
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,        // Data becomes stale immediately
            cacheTime: 6 * (60 * 1000)    // 6 mins of cache data
        }
    }
})

function QueryProvider({ children }: QueryProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

export { queryClient, QueryProvider };