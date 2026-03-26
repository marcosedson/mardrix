import Link from "next/link";

export default function EtiquetasPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Etiquetas</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Diferencial: geração em lote com filtros — um clique gera todas as
          etiquetas (sem seleção manual obrigatória).
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-sm font-medium">Gerador em lote</div>
        <p className="mt-2 text-sm text-muted-foreground">
          Aplique filtros (categoria, fornecedor, estoque, preço) e gere o PDF.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/etiquetas/lote"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Abrir gerador em lote
          </Link>

          <Link
            href="/etiquetas/pimaco-6280"
            className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
          >
            PIMACO 6280 (legado)
          </Link>
          <Link
            href="/etiquetas/pimaco-a4249"
            className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
          >
            PIMACO A4249 (legado)
          </Link>
        </div>
      </div>
    </div>
  );
}
