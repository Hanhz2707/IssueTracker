"use client";

// This component needs to be created to wrap the ReactQueryClientProvider
// and use react context to share this queryClient to the component tree in layout
// ONLY IN CLIENT COMPONENT

import React, { PropsWithChildren } from "react";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";

// Caching data from backend
const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
