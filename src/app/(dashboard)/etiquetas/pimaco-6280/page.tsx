"use client";

import { useMemo, useState } from "react";
import jsPDF from "jspdf";
import JsBarcode from "jsbarcode";

type Produto = {
  id: string;
  nome: string;
  codigo_barras: string;
  preco_venda: number;
};

const mockProdutos: Produto[] = [
  { id: "1", nome: "Produto Exemplo A", codigo_barras: "7891234567895", preco_venda: 19.9 },
  { id: "2", nome: "Produto Exemplo B", codigo_barras: "7891234567888", preco_venda: 29.9 },
];

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function barcodeDataUrl(code: string) {
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, code, { format: "EAN13", displayValue: false, margin: 0 });
  return canvas.toDataURL("image/png");
}

export default function Pimaco6280Page() {
  const [startAt, setStartAt] = useState(1);

  const etiquetas = useMemo(() => {
    // 1 cópia por produto (placeholder). Depois isso vira “saldo atual” ou input.
    return mockProdutos;
  }, []);

  function gerarPdf() {
    // Layout PIMACO 6280
    // A4: 210 x 297mm
    // 3 col x 10 lin, 30 etiquetas
    // etiqueta: 99.1 x 33.9mm
    // margens: topo 13mm, esquerda 4.7mm
    // espaçamento horizontal 2.5mm, vertical 0

    const pdf = new jsPDF({ unit: "mm", format: "a4" });

    const pageW = 210;
    const pageH = 297;

    const cols = 3;
    const rows = 10;
    const labelW = 99.1;
    const labelH = 33.9;
    const marginLeft = 4.7;
    const marginTop = 13;
    const gapX = 2.5;
    const gapY = 0;

    const labelsPerPage = cols * rows;

    // startAt é 1..30
    let pointer = Math.max(1, Math.min(labelsPerPage, startAt)) - 1;

    for (let i = 0; i < etiquetas.length; i++) {
      const produto = etiquetas[i];

      const indexInPage = pointer % labelsPerPage;

      if (pointer > 0 && indexInPage === 0) pdf.addPage();

      const row = Math.floor(indexInPage / cols);
      const col = indexInPage % cols;

      const x = marginLeft + col * (labelW + gapX);
      const y = marginTop + row * (labelH + gapY);

      // Guard rail (não desenhar fora)
      if (x + labelW > pageW + 0.5 || y + labelH > pageH + 0.5) {
        pointer++;
        continue;
      }

      // Conteúdo (simples e legível)
      pdf.setFontSize(8);
      pdf.text("MARDRIX", x + 2, y + 4);

      pdf.setFontSize(9);
      const nome = produto.nome.length > 32 ? `${produto.nome.slice(0, 32)}…` : produto.nome;
      pdf.text(nome, x + 2, y + 9);

      pdf.setFontSize(10);
      pdf.text(formatBRL(produto.preco_venda), x + 2, y + 14);

      const img = barcodeDataUrl(produto.codigo_barras);
      pdf.addImage(img, "PNG", x + 2, y + 16, 50, 14);

      pdf.setFontSize(8);
      pdf.text(produto.codigo_barras, x + 2, y + 32);

      pointer++;
    }

    pdf.save("etiquetas-pimaco-6280.pdf");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">PIMACO 6280</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Layout em mm exato com geração 100% no browser.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">
            Iniciar a partir da etiqueta nº (1 a 30)
          </span>
          <input
            type="number"
            min={1}
            max={30}
            value={startAt}
            onChange={(e) => setStartAt(Number(e.target.value))}
            className="w-40 rounded-md border border-border bg-background px-3 py-2"
          />
        </label>

        <button
          type="button"
          onClick={gerarPdf}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Gerar PDF
        </button>
      </div>

      <div className="text-sm text-muted-foreground">
        Observação: nesta fase usamos produtos mockados. Depois isso vem do
        backend via filtros.
      </div>
    </div>
  );
}
