import { useQuery } from "@tanstack/react-query";

export type EtiquetasHistoricoResponse = {
  dias: number;
  source: "mock" | string;
  items: Array<{ produto_id: string; gerado_em: string }>;
};

export function useEtiquetasHistorico(dias: number) {
  return useQuery({
    queryKey: ["etiquetas-historico", dias],
    queryFn: async () => {
      // chama o BFF do próprio Next
      const res = await fetch(`/api/etiquetas/historico?dias=${dias}`);
      if (!res.ok) {
        throw {
          message: await res.text(),
          status: res.status,
        };
      }
      return (await res.json()) as EtiquetasHistoricoResponse;
    },
    staleTime: 30_000,
  });
}
