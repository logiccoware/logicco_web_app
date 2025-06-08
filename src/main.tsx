import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import reportWebVitals from "./reportWebVitals.ts";
import { AuthProvider, useAuth } from "@/features/auth/context/AuthProvider";
import { SnackbarProvider } from "notistack";
import { IntlProvider } from "react-intl";
import { locales } from "@/lib/localization/locales";
import { PageLoading } from "@/components/ui/PageLoading";
import { CookiesProvider } from "react-cookie";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    auth: null!,
    queryClient,
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  defaultPendingComponent: PageLoading,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider context={{ auth }} router={router} />;
}

function App() {
  return (
    <IntlProvider defaultLocale="en" locale="en" messages={locales["en"]}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <SnackbarProvider>
                <InnerApp />
              </SnackbarProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </CookiesProvider>
    </IntlProvider>
  );
}

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
