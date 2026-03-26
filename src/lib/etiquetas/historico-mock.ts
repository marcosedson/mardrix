export type EtiquetaHistoricoItem = {
  produto_id: string;
  gerado_em: string; // ISO
};

// Mock: simula histórico de geração para permitir o filtro “últimos X dias” na Fase 1.
export const mockHistoricoEtiquetas: EtiquetaHistoricoItem[] = [
  { produto_id: "1", gerado_em: "2026-03-23T00:00:00.000Z" },
  { produto_id: "3", gerado_em: "2026-03-15T00:00:00.000Z" }
];
