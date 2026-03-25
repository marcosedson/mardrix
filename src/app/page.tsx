import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Mardrix — ERP para Empresas de Itumbiara, GO
        </h1>
        <p className="text-sm text-muted-foreground">
          Fase 1: auth, cadastros, estoque, vendas, compras, financeiro,
          relatórios e etiquetas PIMACO.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/login"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Entrar
        </Link>
        <Link
          href="/cadastro"
          className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
        >
          Cadastrar empresa
        </Link>
        <Link
          href="/dashboard"
          className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
        >
          Ir para o app
        </Link>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-sm font-medium">Healthchecks</div>
        <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
          <li>
            Web/BFF:{" "}
            <a className="underline" href="/api/health">
              /api/health
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}
