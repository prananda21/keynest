export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6">
      <p className="mb-3 text-sm font-medium uppercase tracking-wide text-neutral-500">
        Keynest
      </p>

      <h1 className="max-w-3xl text-5xl font-semibold tracking-tight">
        Vault-like secret management for modern applications.
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-neutral-600">
        Store, organize, rotate, and audit API keys, service credentials, and
        environment secrets across organizations, projects, and environments.
      </p>

      <div className="mt-8 flex gap-3">
        <a
          href="/docs"
          className="rounded-md bg-neutral-950 px-4 py-2 text-sm font-medium text-white"
        >
          Open Documentation
        </a>

        <a
          href="/docs/background"
          className="rounded-md border px-4 py-2 text-sm font-medium"
        >
          Learn Background
        </a>

        <a
          href="https://github.com/prananda21/keynest"
          target="_blank"
          rel="noreferrer"
          aria-label="Open Keynest repository on GitHub"
          className="inline-flex size-10 items-center justify-center rounded-md border text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-5"
            fill="currentColor"
          >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.1.79-.25.79-.56v-2.18c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18A11 11 0 0 1 12 6.03c.98 0 1.95.13 2.87.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.19c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
          </svg>
        </a>
      </div>
    </main>
  );
}
