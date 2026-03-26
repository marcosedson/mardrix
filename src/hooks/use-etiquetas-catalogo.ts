import { useQuery } from "@tanstack/react-query";

export type EtiquetasCatalogoResponse = {
  source: "mock" | string;
  categorias: Array<{ id: string; nome: string }>;
  fornecedores: Array<{ id: string; nome: string }>;
  produtos: Array<{
    id: string;
    nome: string;
    sku?: string;
    codigo_barras?: string;
    preco_venda: number;
    categoria_id?: string;
    fornecedor_id?: string;
    estoque_atual?: number;
    estoque_minimo?: number;
    ativo?: boolean;
  }>;
};

export function useEtiquetasCatalogo() {
  return useQuery({
    queryKey: ["etiquetas-catalogo"],
    queryFn: async () => {
      const res = await fetch(`/api/etiquetas/catalogo`);
      if (!res.ok) {
        throw {
          message: await res.text(),
          status: res.status,
        };
      }
      return (await res.json()) as EtiquetasCatalogoResponse;
    },
    staleTime: 60_000,
  });
}

