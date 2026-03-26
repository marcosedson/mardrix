import { useMutation } from "@tanstack/react-query";

export type EventoGeracaoEtiqueta = {
  produto_id: string;
  modelo: string;
  copias: number;
  gerado_em: string;
};

export function useRegistrarEtiquetasEvento() {
  return useMutation({
    mutationFn: async (eventos: EventoGeracaoEtiqueta[]) => {
      const res = await fetch("/api/etiquetas/eventos", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ eventos }),
      });

      if (!res.ok) {
        throw {
          message: await res.text(),
          status: res.status,
        };
      }

      return (await res.json()) as { ok: boolean; received: number; source?: string };
    },
  });
}
