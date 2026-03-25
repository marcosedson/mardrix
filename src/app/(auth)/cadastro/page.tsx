export default function CadastroPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-4 px-6 py-12">
      <h1 className="text-2xl font-semibold">Cadastro da empresa</h1>
      <p className="text-sm text-muted-foreground">
        Placeholder do onboarding. Depois este fluxo cria o tenant e vincula o
        usuário (owner) via Firebase custom claims.
      </p>

      <form className="mt-2 flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Nome da empresa</span>
          <input
            className="rounded-md border border-border bg-background px-3 py-2"
            type="text"
            placeholder="Minha Empresa LTDA"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">CNPJ</span>
          <input
            className="rounded-md border border-border bg-background px-3 py-2"
            type="text"
            placeholder="00.000.000/0000-00"
          />
        </label>

        <button
          type="button"
          className="mt-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Criar conta
        </button>
      </form>
    </main>
  );
}

