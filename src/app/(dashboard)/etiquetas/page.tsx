import Link from "next/link";

export default function EtiquetasPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Etiquetas</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Diferencial competitivo: geração em lote no browser (jsPDF + JsBarcode).
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="text-sm font-medium">Modelos</div>
        <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
          <li>PIMACO 6280 (30 por folha)</li>
          <li>PIMACO A4249 (14 por folha)</li>
        </ul>

        <div className="mt-4 flex gap-3">
          <Link
            href="/etiquetas/pimaco-6280"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Abrir PIMACO 6280
          </Link>
          <Link
            href="/etiquetas/pimaco-a4249"
            className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
          >
            Abrir PIMACO A4249
          </Link>
        </div>
      </div>
    </div>
  );
}

