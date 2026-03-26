import type { Produto } from "@/types/produto";

export type EtiquetasModelo = "pimaco-6280" | "pimaco-a4249";

export type EtiquetasFiltros = {
  modelo: EtiquetasModelo;
  categoriaId?: string | "all";
  fornecedorId?: string | "all";
  apenasAtivos?: boolean;
  estoqueMaiorQueZero?: boolean;
  estoqueAbaixoMinimo?: boolean;
  precoMin?: number | null;
  precoMax?: number | null;
  // novo: se preenchido, inclui somente produtos que NÃO tiveram etiqueta gerada nos últimos N dias
  semEtiquetaUltimosDias?: number | null;
  copiasPadrao: "1" | "saldo";
};

export function aplicarFiltros(
  produtos: Produto[],
  filtros: EtiquetasFiltros,
  opts?: {
    // Map produto_id -> lastGeneratedAt ISO
    ultimoGeradoPorProduto?: Record<string, string>;
    now?: Date;
  }
): Produto[] {
  const now = opts?.now ?? new Date();
  const ultimo = opts?.ultimoGeradoPorProduto ?? {};

  return produtos.filter((p) => {
    if (filtros.apenasAtivos && p.ativo === false) return false;

    if (filtros.categoriaId && filtros.categoriaId !== "all") {
      if (p.categoria_id !== filtros.categoriaId) return false;
    }

    if (filtros.fornecedorId && filtros.fornecedorId !== "all") {
      if (p.fornecedor_id !== filtros.fornecedorId) return false;
    }

    const estoque = Number(p.estoque_atual ?? 0);
    const minimo = Number(p.estoque_minimo ?? 0);

    if (filtros.estoqueMaiorQueZero && !(estoque > 0)) return false;
    if (filtros.estoqueAbaixoMinimo && !(estoque < minimo)) return false;

    const preco = Number(p.preco_venda ?? 0);
    if (filtros.precoMin != null && preco < filtros.precoMin) return false;
    if (filtros.precoMax != null && preco > filtros.precoMax) return false;

    if (filtros.semEtiquetaUltimosDias != null) {
      const dias = Math.max(0, Math.floor(filtros.semEtiquetaUltimosDias));
      if (dias > 0) {
        const lastIso = ultimo[p.id];
        if (lastIso) {
          const last = new Date(lastIso);
          const diffMs = now.getTime() - last.getTime();
          const diffDays = diffMs / (24 * 60 * 60 * 1000);
          // Se gerou dentro da janela, filtra fora.
          if (diffDays < dias) return false;
        }
      }
    }

    return true;
  });
}

export function copiasDefault(produto: Produto, modo: "1" | "saldo"): number {
  if (modo === "saldo") {
    const estoque = Math.floor(Number(produto.estoque_atual ?? 0));
    return Math.max(0, estoque);
  }
  return 1;
}
