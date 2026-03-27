import { z } from "zod";

export const clienteSchema = z.object({
  id: z.string().optional(),
  tipo_pessoa: z.enum(["PF", "PJ"]).default("PF"),
  nome: z.string().min(2, "Informe o nome ou razão social"),
  nome_fantasia: z.string().optional().or(z.literal("")),
  documento: z.string().min(11, "Documento inválido").max(14, "Documento inválido"), // CPF ou CNPJ
  inscricao_estadual: z.string().optional().or(z.literal("")),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  telefone: z.string().optional().or(z.literal("")),
  celular: z.string().optional().or(z.literal("")),
  cep: z.string().optional().or(z.literal("")),
  logradouro: z.string().optional().or(z.literal("")),
  numero: z.string().optional().or(z.literal("")),
  complemento: z.string().optional().or(z.literal("")),
  bairro: z.string().optional().or(z.literal("")),
  cidade: z.string().optional().or(z.literal("")),
  estado: z.string().length(2, "UF deve ter 2 caracteres").optional().or(z.literal("")),
  observacoes: z.string().optional().or(z.literal("")),
  ativo: z.boolean().default(true),
});
export type ClienteInput = z.infer<typeof clienteSchema>;

export const fornecedorSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(2, "Informe o nome"),
  cnpj: z.string().optional().or(z.literal("")),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  telefone: z.string().optional().or(z.literal("")),
});
export type FornecedorInput = z.infer<typeof fornecedorSchema>;

export const produtoSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(2, "Informe o nome"),
  descricao: z.string().optional().or(z.literal("")),
  sku: z.string().optional().or(z.literal("")),
  codigo_barras: z.string().optional().or(z.literal("")),
  ncm: z.string().optional().or(z.literal("")),
  cfop_padrao: z.string().optional().or(z.literal("")),
  
  // Vestuário
  cor: z.string().optional().or(z.literal("")),
  tamanho: z.string().optional().or(z.literal("")), // P, M, G, GG, 38, 40 etc
  colecao: z.string().optional().or(z.literal("")),
  tecido: z.string().optional().or(z.literal("")),
  genero: z.enum(["Masculino", "Feminino", "Unissex", "Infantil"]).default("Unissex"),
  
  custo_compra: z.coerce.number().min(0, "Custo inválido").default(0),
  preco_venda: z.coerce.number().min(0, "Preço inválido").default(0),
  margem_lucro: z.coerce.number().optional(), // Percentual
  
  unidade_medida: z.string().default("UN"),
  categoria_id: z.string().optional(),
  marca_id: z.string().optional(),
  
  ativo: z.coerce.boolean().default(true),
  estoque_atual: z.coerce.number().min(0).default(0),
  estoque_minimo: z.coerce.number().min(0).default(0),
  estoque_maximo: z.coerce.number().min(0).optional(),
  
  peso_bruto: z.coerce.number().optional(),
  peso_liquido: z.coerce.number().optional(),
  
  origem_fiscal: z.enum(["Nacional", "Estrangeira Importada", "Estrangeira Mercado Interno"]).default("Nacional"),
});
export type ProdutoInput = z.infer<typeof produtoSchema>;

export const vendaSchema = z.object({
  id: z.string().optional(),
  cliente_nome: z.string().min(2, "Informe o cliente"),
  total: z.coerce.number().min(0),
});
export type VendaInput = z.infer<typeof vendaSchema>;

export const compraSchema = z.object({
  id: z.string().optional(),
  fornecedor_nome: z.string().min(2, "Informe o fornecedor"),
  total: z.coerce.number().min(0),
});
export type CompraInput = z.infer<typeof compraSchema>;

export const movimentoEstoqueSchema = z.object({
  id: z.string().optional(),
  produto_nome: z.string().min(2, "Informe o produto"),
  tipo: z.enum(["entrada", "saida", "ajuste"]),
  quantidade: z.coerce.number().int().min(1),
});
export type MovimentoEstoqueInput = z.infer<typeof movimentoEstoqueSchema>;

export const lancamentoFinanceiroSchema = z.object({
  id: z.string().optional(),
  descricao: z.string().min(2, "Informe a descrição"),
  tipo: z.enum(["pagar", "receber"]),
  valor: z.coerce.number().min(0),
});
export type LancamentoFinanceiroInput = z.infer<typeof lancamentoFinanceiroSchema>;

export const relatorioSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(2, "Informe o nome"),
  formato: z.enum(["pdf", "xlsx"]),
});
export type RelatorioInput = z.infer<typeof relatorioSchema>;

// Novos Schemas
export const servicoSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(2, "Informe o nome"),
  descricao: z.string().optional().or(z.literal("")),
  preco_venda: z.coerce.number().min(0, "Preço inválido").default(0),
  codigo_servico: z.string().optional().or(z.literal("")),
  aliquota_iss: z.coerce.number().min(0).max(100).default(0),
  ativo: z.coerce.boolean().default(true),
});
export type ServicoInput = z.infer<typeof servicoSchema>;

export const categoriaSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(2, "Informe o nome"),
  descricao: z.string().optional().or(z.literal("")),
  ativo: z.coerce.boolean().default(true),
});
export type CategoriaInput = z.infer<typeof categoriaSchema>;

export const marcaSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(2, "Informe o nome"),
  site: z.string().optional().or(z.literal("")),
  ativo: z.coerce.boolean().default(true),
});
export type MarcaInput = z.infer<typeof marcaSchema>;

export const unidadeMedidaSchema = z.object({
  id: z.string().optional(),
  sigla: z.string().min(1, "Informe a sigla").max(5),
  nome: z.string().min(2, "Informe o nome"),
  casas_decimais: z.coerce.number().int().min(0).max(4).default(2),
});
export type UnidadeMedidaInput = z.infer<typeof unidadeMedidaSchema>;

export const orcamentoSchema = z.object({
  id: z.string().optional(),
  cliente_nome: z.string().min(2, "Informe o cliente"),
  data: z.string().default(() => new Date().toISOString().split("T")[0]),
  validade: z.string().optional(),
  valor_total: z.coerce.number().min(0).default(0),
  status: z.enum(["Aberto", "Aprovado", "Cancelado", "Vencido"]).default("Aberto"),
  observacoes: z.string().optional().or(z.literal("")),
});
export type OrcamentoInput = z.infer<typeof orcamentoSchema>;

export const pedidoSchema = z.object({
  id: z.string().optional(),
  cliente_nome: z.string().min(2, "Informe o cliente"),
  data: z.string().default(() => new Date().toISOString().split("T")[0]),
  valor_total: z.coerce.number().min(0).default(0),
  status: z.enum(["Pendente", "Em Separação", "Enviado", "Entregue", "Cancelado"]).default("Pendente"),
  pagamento_status: z.enum(["Pendente", "Parcial", "Pago", "Extornado"]).default("Pendente"),
});
export type PedidoInput = z.infer<typeof pedidoSchema>;

export const crmSchema = z.object({
  id: z.string().optional(),
  cliente_nome: z.string().min(2, "Informe o cliente"),
  tipo_interacao: z.enum(["Contato", "Reunião", "Proposta", "Pós-venda"]).default("Contato"),
  data: z.string().default(() => new Date().toISOString().split("T")[0]),
  descricao: z.string().min(5, "Descreva a interação"),
  status_lead: z.enum(["Frio", "Morno", "Quente", "Cliente"]).default("Morno"),
});
export type CrmInput = z.infer<typeof crmSchema>;

export const financeiroSchema = z.object({
  id: z.string().optional(),
  descricao: z.string().min(3, "Informe uma descrição detalhada"),
  entidade_nome: z.string().min(2, "Informe o nome do Cliente/Fornecedor"),
  valor: z.coerce.number().min(0.01, "Valor inválido"),
  vencimento: z.string().min(10, "Data inválida"),
  pagamento_data: z.string().optional().or(z.literal("")),
  status: z.enum(["pendente", "pago", "atrasado", "cancelado"]).default("pendente"),
  categoria_financeira: z.string().optional().or(z.literal("")),
  metodo_pagamento: z.string().optional().or(z.literal("")),
  observacoes: z.string().optional().or(z.literal("")),
});
export type FinanceiroInput = z.infer<typeof financeiroSchema>;

// Novos Schemas (Vestuário e Vendas)
export const cupomSchema = z.object({
  id: z.string().optional(),
  codigo: z.string().min(3, "Mínimo 3 caracteres").toUpperCase(),
  tipo: z.enum(["Percentual", "Fixo"]).default("Percentual"),
  valor: z.coerce.number().min(0.01, "Valor inválido"),
  validade_inicio: z.string().optional(),
  validade_fim: z.string().optional(),
  uso_maximo: z.coerce.number().int().optional(),
  uso_atual: z.coerce.number().int().default(0),
  ativo: z.coerce.boolean().default(true),
});
export type CupomInput = z.infer<typeof cupomSchema>;

export const consignadoSchema = z.object({
  id: z.string().optional(),
  cliente_nome: z.string().min(2, "Informe o cliente"),
  data_saida: z.string().default(() => new Date().toISOString().split("T")[0]),
  data_acerto: z.string().optional(),
  valor_total: z.coerce.number().min(0).default(0),
  status: z.enum(["Aberto", "Acertado Parcial", "Finalizado", "Cancelado"]).default("Aberto"),
  observacoes: z.string().optional().or(z.literal("")),
});
export type ConsignadoInput = z.infer<typeof consignadoSchema>;

export const comissaoSchema = z.object({
  id: z.string().optional(),
  vendedor_nome: z.string().min(2, "Informe o vendedor"),
  venda_id: z.string().optional(),
  valor_venda: z.coerce.number().min(0),
  percentual: z.coerce.number().min(0).max(100),
  valor_comissao: z.coerce.number().min(0),
  data_venda: z.string().default(() => new Date().toISOString().split("T")[0]),
  status: z.enum(["Pendente", "Pago", "Cancelado"]).default("Pendente"),
});
export type ComissaoInput = z.infer<typeof comissaoSchema>;

export const devolucaoSchema = z.object({
  id: z.string().optional(),
  venda_id: z.string().optional(),
  cliente_nome: z.string().min(2, "Informe o cliente"),
  data: z.string().default(() => new Date().toISOString().split("T")[0]),
  motivo: z.string().min(5, "Informe o motivo"),
  valor_estorno: z.coerce.number().min(0),
  status: z.enum(["Pendente", "Aprovada", "Rejeitada"]).default("Pendente"),
});
export type DevolucaoInput = z.infer<typeof devolucaoSchema>;

export const listaPrecoSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(2, "Informe o nome"),
  percentual_ajuste: z.coerce.number().default(0),
  tipo_ajuste: z.enum(["Acréscimo", "Desconto"]).default("Acréscimo"),
  base_calculo: z.enum(["Custo", "Venda"]).default("Venda"),
  ativo: z.coerce.boolean().default(true),
});
export type ListaPrecoInput = z.infer<typeof listaPrecoSchema>;

export const vendaRapidaSchema = z.object({
  id: z.string().optional(),
  vendedor_nome: z.string().optional(),
  cliente_nome: z.string().default("Cliente Consumidor"),
  valor_bruto: z.coerce.number().min(0),
  desconto: z.coerce.number().min(0).default(0),
  valor_total: z.coerce.number().min(0),
  forma_pagamento: z.string().default("Dinheiro"),
  data: z.string().default(() => new Date().toISOString().split("T")[0]),
});
export type VendaRapidaInput = z.infer<typeof vendaRapidaSchema>;

