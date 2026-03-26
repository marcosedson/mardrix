import jsPDF from "jspdf";
import JsBarcode from "jsbarcode";
import type { Produto } from "@/types/produto";
import type { EtiquetasModelo } from "@/lib/etiquetas/filtros";

export type EtiquetaItem = {
  produto: Produto;
  copias: number;
};

export type EtiquetaConfig = {
  mostrarNomeEmpresa?: boolean;
  nomeEmpresa?: string;
  mostrarSku?: boolean;
};

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function barcodeDataUrl(code: string) {
  const canvas = document.createElement("canvas");
  // tenta EAN13; se falhar, cai pra CODE128
  try {
    JsBarcode(canvas, code, { format: "EAN13", displayValue: false, margin: 0 });
  } catch {
    JsBarcode(canvas, code, { format: "CODE128", displayValue: false, margin: 0 });
  }
  return canvas.toDataURL("image/png");
}

function getLayout(modelo: EtiquetasModelo) {
  if (modelo === "pimaco-a4249") {
    return {
      cols: 2,
      rows: 7,
      labelW: 99.1,
      labelH: 38.1,
      marginLeft: 4.7,
      marginTop: 21.2,
      gapX: 2.5,
      gapY: 0,
      labelsPerPage: 14,
    };
  }

  return {
    cols: 3,
    rows: 10,
    labelW: 99.1,
    labelH: 33.9,
    marginLeft: 4.7,
    marginTop: 13,
    gapX: 2.5,
    gapY: 0,
    labelsPerPage: 30,
  };
}

export function gerarEtiquetasPdf(params: {
  modelo: EtiquetasModelo;
  startAt: number; // 1..N
  itens: EtiquetaItem[];
  config?: EtiquetaConfig;
}) {
  const { modelo, itens, config } = params;
  const startAt = Math.max(1, params.startAt);

  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = 210;
  const pageH = 297;

  const layout = getLayout(modelo);
  let pointer = Math.min(layout.labelsPerPage, startAt) - 1;

  // expande itens em cópias
  const expanded: Produto[] = [];
  for (const it of itens) {
    const n = Math.max(0, Math.floor(it.copias));
    for (let i = 0; i < n; i++) expanded.push(it.produto);
  }

  for (let i = 0; i < expanded.length; i++) {
    const produto = expanded[i];

    const indexInPage = pointer % layout.labelsPerPage;
    if (pointer > 0 && indexInPage === 0) pdf.addPage();

    const row = Math.floor(indexInPage / layout.cols);
    const col = indexInPage % layout.cols;

    const x = layout.marginLeft + col * (layout.labelW + layout.gapX);
    const y = layout.marginTop + row * (layout.labelH + layout.gapY);

    // Guard rail
    if (x + layout.labelW > pageW + 0.5 || y + layout.labelH > pageH + 0.5) {
      pointer++;
      continue;
    }

    // Conteúdo configurável
    let cursorY = y + 4;

    pdf.setFontSize(8);
    if (config?.mostrarNomeEmpresa && config?.nomeEmpresa) {
      pdf.text(config.nomeEmpresa, x + 2, cursorY);
      cursorY += 4;
    } else {
      pdf.text("MARDRIX", x + 2, cursorY);
      cursorY += 4;
    }

    pdf.setFontSize(9);
    const nome = produto.nome.length > 32 ? `${produto.nome.slice(0, 32)}…` : produto.nome;
    pdf.text(nome, x + 2, cursorY);
    cursorY += 5;

    pdf.setFontSize(10);
    pdf.text(formatBRL(Number(produto.preco_venda ?? 0)), x + 2, cursorY);
    cursorY += 2;

    const codigo = (produto.codigo_barras || produto.codigo || "").trim();
    if (codigo) {
      const img = barcodeDataUrl(codigo);
      const barcodeW = modelo === "pimaco-a4249" ? 55 : 50;
      const barcodeH = modelo === "pimaco-a4249" ? 16 : 14;
      pdf.addImage(img, "PNG", x + 2, y + layout.labelH - (barcodeH + 8), barcodeW, barcodeH);

      pdf.setFontSize(8);
      pdf.text(codigo, x + 2, y + layout.labelH - 2);
    }

    if (config?.mostrarSku && produto.codigo) {
      pdf.setFontSize(8);
      pdf.text(String(produto.codigo), x + layout.labelW - 2, y + layout.labelH - 2, {
        align: "right",
      });
    }

    pointer++;
  }

  const filename = modelo === "pimaco-a4249" ? "etiquetas-pimaco-a4249.pdf" : "etiquetas-pimaco-6280.pdf";
  pdf.save(filename);
}

