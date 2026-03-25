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

export default function PimacoA4249Page() {
  const [startAt, setStartAt] = useState(1);

  const etiquetas = useMemo(() => mockProdutos, []);

  function gerarPdf() {
    // Layout PIMACO A4249
    // 2 col x 7 lin, 14 etiquetas
    // etiqueta: 99.1 x 38.1mm
    // margens: topo 21.2mm, esquerda 4.7mm
    // espaçamento horizontal 2.5mm, vertical 0

    const pdf = new jsPDF({ unit: "mm", format: "a4" });

    const pageW = 210;
    const pageH = 297;

    const cols = 2;
    const rows = 7;
    const labelW = 99.1;
    const labelH = 38.1;
    const marginLeft = 4.7;
    const marginTop = 21.2;
    const gapX = 2.5;
    const gapY = 0;

    const labelsPerPage = cols * rows;
    let pointer = Math.max(1, Math.min(labelsPerPage, startAt)) - 1;

    for (let i = 0; i < etiquetas.length; i++) {
      const produto = etiquetas[i];

      const indexInPage = pointer % labelsPerPage;
      if (pointer > 0 && indexInPage === 0) pdf.addPage();

      const row = Math.floor(indexInPage / cols);
      const col = indexInPage % cols;

      const x = marginLeft + col * (labelW + gapX);
      const y = marginTop + row * (labelH + gapY);

      if (x + labelW > pageW + 0.5 || y + labelH > pageH + 0.5) {
        pointer++;
        continue;
      }

      pdf.setFontSize(8);
      pdf.text("MARDRIX", x + 2, y + 4);

      pdf.setFontSize(9);
      const nome = produto.nome.length > 32 ? `${produto.nome.slice(0, 32)}…` : produto.nome;
      pdf.text(nome, x + 2, y + 9);

      pdf.setFontSize(10);
      pdf.text(formatBRL(produto.preco_venda), x + 2, y + 14);

      const img = barcodeDataUrl(produto.codigo_barras);
      pdf.addImage(img, "PNG", x + 2, y + 16, 55, 16);

      pdf.setFontSize(8);
      pdf.text(produto.codigo_barras, x + 2, y + 36);

      pointer++;
    }

    pdf.save("etiquetas-pimaco-a4249.pdf");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">PIMACO A4249</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Layout em mm exato com geração 100% no browser.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">
            Iniciar a partir da etiqueta nº (1 a 14)
          </span>
          <input
            type="number"
            min={1}
            max={14}
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

