import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Shared app shell: header + main content container */}
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="m-0">
        <div className="min-h-screen">
          {/* Top navigation stays visible while the page scrolls. */}
          <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <Link to="/" className="text-lg font-semibold uppercase tracking-[0.35em] text-amber-300">
                RemoteHub
              </Link>
              <nav className="flex items-center gap-2 sm:gap-4">
                <Link
                  to="/"
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  Home
                </Link>
                <Link
                  to="/job-card"
                  className="rounded-full bg-amber-400/90 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-300"
                >
                  Explore Jobs
                </Link>
              </nav>
            </div>
          </header>

          <main className="mx-auto flex max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
            {children}
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center rounded-[2rem] border border-white/10 bg-slate-900/70 p-10 text-center shadow-2xl shadow-black/20 backdrop-blur-xl">
      <p className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
        {message}
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-white">{message}</h1>
      <p className="mt-3 text-lg text-slate-300">{details}</p>
      <Link to="/" className="mt-6 rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-300">
        Back home
      </Link>
      {stack && (
        <pre className="mt-6 w-full overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-left text-sm text-slate-300">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
