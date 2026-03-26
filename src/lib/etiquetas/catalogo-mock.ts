import type { Produto } from "@/types/produto";

export type Categoria = { id: string; nome: string };
export type Fornecedor = { id: string; nome: string };

export const mockCategorias: Categoria[] = [
  { id: "cat-1", nome: "Camisetas" },
  { id: "cat-2", nome: "Eletrônicos" },
];

export const mockFornecedores: Fornecedor[] = [
  { id: "for-1", nome: "Fornecedor A" },
  { id: "for-2", nome: "Fornecedor B" },
];

export const mockProdutos: Produto[] = [
  {
    id: "1",
    nome: "Camiseta Básica Preta",
    codigo: "CAM-001",
    codigo_barras: "7891234567895",
    categoria_id: "cat-1",
    fornecedor_id: "for-1",
    preco_venda: 39.9,
    estoque_atual: 12,
    estoque_minimo: 5,
    ativo: true,
  },
  {
    id: "2",
    nome: "Camiseta Básica Branca",
    codigo: "CAM-002",
    codigo_barras: "7891234567888",
    categoria_id: "cat-1",
    fornecedor_id: "for-1",
    preco_venda: 39.9,
    estoque_atual: 0,
    estoque_minimo: 5,
    ativo: true,
  },
  {
    id: "3",
    nome: "Fone Bluetooth X",
    codigo: "ELE-010",
    codigo_barras: "7891234567871",
    categoria_id: "cat-2",
    fornecedor_id: "for-2",
    preco_venda: 129.9,
    estoque_atual: 2,
    estoque_minimo: 5,
    ativo: true,
  },
  {
    id: "4",
    nome: "Carregador USB-C 20W",
    codigo: "ELE-020",
    codigo_barras: "7891234567864",
    categoria_id: "cat-2",
    fornecedor_id: "for-2",
    preco_venda: 59.9,
    estoque_atual: 30,
    estoque_minimo: 10,
    ativo: true,
  },
];

