export type Produto = {
  id: string;
  tenant_id?: string;
  categoria_id?: string | null;
  fornecedor_id?: string | null;
  nome: string;
  codigo?: string | null;
  codigo_barras?: string | null;
  unidade?: string | null;
  preco_venda: number;
  estoque_atual?: number | null;
  estoque_minimo?: number | null;
  ativo?: boolean;
};

