export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-4 px-6 py-12">
      <h1 className="text-2xl font-semibold">Entrar</h1>
      <p className="text-sm text-muted-foreground">
        Nesta fase, a autenticação Firebase será conectada depois. Esta página é
        o placeholder do fluxo.
      </p>

      <form className="mt-2 flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">E-mail</span>
          <input
            className="rounded-md border border-border bg-background px-3 py-2"
            type="email"
            placeholder="voce@empresa.com"
            autoComplete="email"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Senha</span>
          <input
            className="rounded-md border border-border bg-background px-3 py-2"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </label>

        <button
          type="button"
          className="mt-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

