"use client";

import { ResourcePage } from "@/components/crud/resource-page";
import { produtoSchema } from "@/lib/crud/schemas";
import { cn } from "@/lib/utils";

type Produto = {
  id: string;
  nome: string;
  sku?: string;
  codigo_barras?: string;
  preco_venda: number;
  custo_compra: number;
  unidade_medida: string;
  ativo: boolean;
  estoque_atual: number;
  estoque_minimo: number;
  created_at?: string;
  updated_at?: string;
};

export default function ProdutosPage() {
  return (
    <ResourcePage<Produto, typeof produtoSchema>
      title="Produtos"
      resource="produtos"
      schema={produtoSchema}
      defaultValues={{
        nome: "",
        descricao: "",
        sku: "",
        codigo_barras: "",
        ncm: "",
        cfop_padrao: "",
        cor: "",
        tamanho: "",
        colecao: "",
        tecido: "",
        genero: "Unissex",
        custo_compra: 0,
        preco_venda: 0,
        margem_lucro: 0,
        unidade_medida: "UN",
        categoria_id: "",
        marca_id: "",
        ativo: true,
        estoque_atual: 0,
        estoque_minimo: 0,
        estoque_maximo: 0,
        peso_bruto: 0,
        peso_liquido: 0,
        origem_fiscal: "Nacional",
      }}
      fields={[
        { name: "nome", label: "Nome do Produto", placeholder: "Ex.: Camiseta Algodão" },
        { kind: "textarea", name: "descricao", label: "Descrição", placeholder: "Detalhes do produto" },
        { name: "sku", label: "SKU / Código Interno", placeholder: "PROD-001" },
        { name: "codigo_barras", label: "Código de Barras (EAN)", placeholder: "789..." },
        
        // Seção Vestuário
        { name: "cor", label: "Cor / Estampa", placeholder: "Ex.: Azul Marinho" },
        { 
          kind: "select", 
          name: "tamanho", 
          label: "Tamanho / Grade", 
          options: [
            { label: "PP", value: "PP" },
            { label: "P", value: "P" },
            { label: "M", value: "M" },
            { label: "G", value: "G" },
            { label: "GG", value: "GG" },
            { label: "XG", value: "XG" },
            { label: "34", value: "34" },
            { label: "36", value: "36" },
            { label: "38", value: "38" },
            { label: "40", value: "40" },
            { label: "42", value: "42" },
            { label: "44", value: "44" },
            { label: "46", value: "46" },
            { label: "U (Único)", value: "U" },
          ] 
        },
        { name: "colecao", label: "Coleção", placeholder: "Ex.: Verão 2026" },
        { name: "tecido", label: "Tecido / Material", placeholder: "Ex.: 100% Algodão" },
        {
          kind: "select",
          name: "genero",
          label: "Gênero",
          options: [
            { label: "Masculino", value: "Masculino" },
            { label: "Feminino", value: "Feminino" },
            { label: "Unissex", value: "Unissex" },
            { label: "Infantil", value: "Infantil" },
          ],
        },

        { name: "ncm", label: "NCM", placeholder: "0000.00.00" },
        { name: "cfop_padrao", label: "CFOP Padrão", placeholder: "5102" },
        
        { name: "custo_compra", label: "Custo de Compra (R$)", type: "number" },
        { name: "preco_venda", label: "Preço de Venda (R$)", type: "number" },
        { name: "margem_lucro", label: "Margem de Lucro (%)", type: "number" },
        
        {
          kind: "select",
          name: "unidade_medida",
          label: "Unidade de Medida",
          options: [
            { label: "Peça (PC)", value: "PC" },
            { label: "Unidade (UN)", value: "UN" },
            { label: "Par (PR)", value: "PR" },
            { label: "Kit (KT)", value: "KT" },
            { label: "Kilograma (KG)", value: "KG" },
            { label: "Metro (M)", value: "M" },
          ],
        },
        
        {
          kind: "select",
          name: "origem_fiscal",
          label: "Origem Fiscal",
          options: [
            { label: "Nacional", value: "Nacional" },
            { label: "Estrangeira Importada", value: "Estrangeira Importada" },
            { label: "Estrangeira Mercado Interno", value: "Estrangeira Mercado Interno" },
          ],
        },

        { kind: "checkbox", name: "ativo", label: "Produto Ativo" },
        
        { name: "estoque_atual", label: "Estoque Atual", type: "number" },
        { name: "estoque_minimo", label: "Estoque Mínimo", type: "number" },
        { name: "estoque_maximo", label: "Estoque Máximo", type: "number" },

        { name: "peso_bruto", label: "Peso Bruto (kg)", type: "number" },
        { name: "peso_liquido", label: "Peso Líquido (kg)", type: "number" },
      ]}
      columns={[
        { key: "nome", header: "Nome" },
        { key: "sku", header: "SKU" },
        {
          key: "preco_venda",
          header: "Preço",
          render: (p) =>
            Number(p.preco_venda ?? 0).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }),
        },
        { 
          key: "estoque_atual", 
          header: "Estoque",
          render: (p) => (
            <span className={cn(
              "font-medium",
              p.estoque_atual <= p.estoque_minimo ? "text-red-500" : "text-foreground"
            )}>
              {p.estoque_atual} {p.unidade_medida}
            </span>
          )
        },
        {
          key: "ativo",
          header: "Status",
          render: (p) => (
            <span className={cn(
              "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
              p.ativo ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
            )}>
              {p.ativo ? "Ativo" : "Inativo"}
            </span>
          ),
        },
      ]}
    />
  );
}
