import type { EtiquetasModelo } from "@/lib/etiquetas/filtros";

export type EtiquetasPreviewPage = {
  pageIndex: number;
  slots: boolean[]; // length = labelsPerPage
};

export function labelsPerPage(modelo: EtiquetasModelo) {
  return modelo === "pimaco-a4249" ? 14 : 30;
}

export function previewPages(params: {
  modelo: EtiquetasModelo;
  startAt: number; // 1..N
  totalEtiquetas: number;
}): EtiquetasPreviewPage[] {
  const perPage = labelsPerPage(params.modelo);
  const start = Math.max(1, params.startAt);

  let remaining = Math.max(0, Math.floor(params.totalEtiquetas));

  // página 0: respeita startAt
  const pages: EtiquetasPreviewPage[] = [];
  let pageIndex = 0;
  let startOffset = Math.min(perPage, start) - 1; // 0..perPage-1

  while (remaining > 0) {
    const slots = Array.from({ length: perPage }, () => false);

    const fillOnThisPage = Math.min(perPage - startOffset, remaining);
    for (let i = 0; i < fillOnThisPage; i++) {
      slots[startOffset + i] = true;
    }

    pages.push({ pageIndex, slots });

    remaining -= fillOnThisPage;
    pageIndex++;
    startOffset = 0; // nas próximas páginas começa do 1º slot
  }

  // Se não tem etiquetas, ainda assim mostra 1 página vazia pra UX
  if (pages.length === 0) {
    pages.push({ pageIndex: 0, slots: Array.from({ length: perPage }, () => false) });
  }

  return pages;
}

