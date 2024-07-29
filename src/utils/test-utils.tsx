import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // disable retries to make tests fail fast
    },
  },
});

const QueryWrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: QueryWrapper, ...options });

// re-export everything from @testing-library/react
export * from "@testing-library/react";

// override render method
export { customRender as render };
