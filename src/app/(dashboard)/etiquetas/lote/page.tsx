"use client";

import { useMemo, useState } from "react";
import { useEtiquetasCatalogo } from "@/hooks/use-etiquetas-catalogo";
import {
  aplicarFiltros,
  copiasDefault,
  type EtiquetasFiltros,
} from "@/lib/etiquetas/filtros";
import { gerarEtiquetasPdf } from "@/lib/etiquetas/pdf";
import { indexUltimoGeradoPorProduto } from "@/lib/etiquetas/historico";
import { labelsPerPage as labelsPerPageOf, previewPages } from "@/lib/etiquetas/preview";
import { useEtiquetasHistorico } from "@/hooks/use-etiquetas-historico";
import { useRegistrarEtiquetasEvento } from "@/hooks/use-registrar-etiquetas-evento";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function parseNumberOrNull(v: string): number | null {
  const n = Number(v);
  if (!Number.isFinite(n)) return null;
  return n;
}

export default function EtiquetasLotePage() {
  const catalogoQuery = useEtiquetasCatalogo();
  const categorias = catalogoQuery.data?.categorias ?? [];
  const fornecedores = catalogoQuery.data?.fornecedores ?? [];
  const produtos = useMemo(() => catalogoQuery.data?.produtos ?? [], [catalogoQuery.data]);

  const [startAt, setStartAt] = useState(1);

  const [filtros, setFiltros] = useState<EtiquetasFiltros>({
    modelo: "pimaco-6280",
    categoriaId: "all",
    fornecedorId: "all",
    apenasAtivos: true,
    estoqueMaiorQueZero: false,
    estoqueAbaixoMinimo: false,
    precoMin: null,
    precoMax: null,
    semEtiquetaUltimosDias: null,
    copiasPadrao: "1",
  });

  const historicoDias = filtros.semEtiquetaUltimosDias ?? 7;
  const historicoQuery = useEtiquetasHistorico(
    Math.max(1, Math.floor(Number(historicoDias) || 7))
  );

  const ultimoGeradoPorProduto = useMemo(() => {
    return indexUltimoGeradoPorProduto(historicoQuery.data?.items ?? []);
  }, [historicoQuery.data]);

  const produtosFiltrados = useMemo(
    () => aplicarFiltros(produtos, filtros, { ultimoGeradoPorProduto }),
    [produtos, filtros, ultimoGeradoPorProduto]
  );

  // Quantidade por produto (editable). Default nunca força seleção manual.
  const [copiasPorId, setCopiasPorId] = useState<Record<string, number>>({});

  // Seleção manual múltipla (opcional). Regra: se houver seleção, gerar somente selecionados.
  const [selecionados, setSelecionados] = useState<Record<string, boolean>>({});

  const hasSelecaoAtiva = useMemo(
    () => Object.values(selecionados).some(Boolean),
    [selecionados]
  );

  const linhas = useMemo(() => {
    return produtosFiltrados
      .filter((p) => (hasSelecaoAtiva ? !!selecionados[p.id] : true))
      .map((p) => {
        const fallback = copiasDefault(p, filtros.copiasPadrao);
        const copias = copiasPorId[p.id] ?? fallback;
        return { produto: p, copias };
      });
  }, [produtosFiltrados, copiasPorId, filtros.copiasPadrao, hasSelecaoAtiva, selecionados]);

  const totalEtiquetas = useMemo(
    () => linhas.reduce((acc, l) => acc + Math.max(0, Math.floor(l.copias)), 0),
    [linhas]
  );

  const perPage = labelsPerPageOf(filtros.modelo);
  const previews = useMemo(
    () => previewPages({ modelo: filtros.modelo, startAt, totalEtiquetas }),
    [filtros.modelo, startAt, totalEtiquetas]
  );

  function setFiltro<K extends keyof EtiquetasFiltros>(key: K, value: EtiquetasFiltros[K]) {
    setFiltros((prev) => ({ ...prev, [key]: value }));
  }

  function aplicarPadraoCopias() {
    // aplica o default atual a todos os produtos filtrados
    const next: Record<string, number> = { ...copiasPorId };
    for (const p of produtosFiltrados) {
      next[p.id] = copiasDefault(p, filtros.copiasPadrao);
    }
    setCopiasPorId(next);
  }

  const registrarEvento = useRegistrarEtiquetasEvento();

  async function gerarPdf() {
    const itens = linhas
      .map((l) => ({ produto: l.produto, copias: Math.max(0, Math.floor(l.copias)) }))
      .filter((it) => it.copias > 0);

    // Gera PDF no browser
    gerarEtiquetasPdf({
      modelo: filtros.modelo,
      startAt,
      itens,
      config: {
        mostrarNomeEmpresa: false,
        mostrarSku: true,
      },
    });

    // Registra evento (placeholder BFF). Não bloqueia geração do PDF.
    const nowIso = new Date().toISOString();
    registrarEvento.mutate(
      itens.map((it) => ({
        produto_id: it.produto.id,
        modelo: filtros.modelo,
        copias: it.copias,
        gerado_em: nowIso,
      }))
    );
  }

  function toggleSelecionarTodos(checked: boolean) {
    const next: Record<string, boolean> = { ...selecionados };
    for (const p of produtosFiltrados) next[p.id] = checked;
    setSelecionados(next);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Etiquetas — geração em lote</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Selecione filtros e gere. Não exigimos seleção manual produto a produto.
        </p>
        {catalogoQuery.isLoading ? (
          <p className="mt-2 text-xs text-muted-foreground">Carregando catálogo…</p>
        ) : catalogoQuery.isError ? (
          <p className="mt-2 text-xs text-destructive">
            Não foi possível carregar o catálogo de produtos.
          </p>
        ) : null}
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Modelo</Label>
            <Select
              value={filtros.modelo}
              onValueChange={(v) => setFiltro("modelo", v as EtiquetasFiltros["modelo"])}
              disabled={catalogoQuery.isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pimaco-6280">PIMACO 6280 (30 por folha)</SelectItem>
                <SelectItem value="pimaco-a4249">PIMACO A4249 (14 por folha)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select
              value={String(filtros.categoriaId ?? "all")}
              onValueChange={(v) => setFiltro("categoriaId", v)}
              disabled={catalogoQuery.isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categorias.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Fornecedor</Label>
            <Select
              value={String(filtros.fornecedorId ?? "all")}
              onValueChange={(v) => setFiltro("fornecedorId", v)}
              disabled={catalogoQuery.isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {fornecedores.map((f) => (
                  <SelectItem key={f.id} value={f.id}>
                    {f.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={!!filtros.estoqueMaiorQueZero}
              onCheckedChange={(v) => setFiltro("estoqueMaiorQueZero", Boolean(v))}
              id="estoque-maior"
            />
            <Label htmlFor="estoque-maior">Somente estoque &gt; 0</Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={!!filtros.estoqueAbaixoMinimo}
              onCheckedChange={(v) => setFiltro("estoqueAbaixoMinimo", Boolean(v))}
              id="abaixo-min"
            />
            <Label htmlFor="abaixo-min">Estoque abaixo do mínimo</Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={!!filtros.apenasAtivos}
              onCheckedChange={(v) => setFiltro("apenasAtivos", Boolean(v))}
              id="apenas-ativos"
            />
            <Label htmlFor="apenas-ativos">Apenas ativos</Label>
          </div>

          <div className="space-y-2">
            <Label>Preço mínimo</Label>
            <Input
              inputMode="decimal"
              placeholder="0"
              value={filtros.precoMin ?? ""}
              onChange={(e) => setFiltro("precoMin", parseNumberOrNull(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label>Preço máximo</Label>
            <Input
              inputMode="decimal"
              placeholder="9999"
              value={filtros.precoMax ?? ""}
              onChange={(e) => setFiltro("precoMax", parseNumberOrNull(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label>Cópias padrão</Label>
            <Select
              value={filtros.copiasPadrao}
              onValueChange={(v) => setFiltro("copiasPadrao", v as EtiquetasFiltros["copiasPadrao"])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 por produto</SelectItem>
                <SelectItem value="saldo">igual ao saldo atual</SelectItem>
              </SelectContent>
            </Select>
            <Button type="button" variant="secondary" onClick={aplicarPadraoCopias}>
              Aplicar padrão aos resultados
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Iniciar na etiqueta nº</Label>
            <Input
              type="number"
              min={1}
              max={filtros.modelo === "pimaco-a4249" ? 14 : 30}
              value={startAt}
              onChange={(e) => setStartAt(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label>Sem etiqueta nos últimos (dias)</Label>
            <Input
              type="number"
              min={1}
              placeholder="Ex.: 7"
              value={filtros.semEtiquetaUltimosDias ?? ""}
              onChange={(e) =>
                setFiltro(
                  "semEtiquetaUltimosDias",
                  e.target.value ? Number(e.target.value) : null
                )
              }
            />
            <div className="text-xs text-muted-foreground">
              Fonte do histórico: {historicoQuery.data?.source ?? "carregando…"}
            </div>
          </div>

          <div className="flex items-end">
            <Button type="button" onClick={gerarPdf} disabled={totalEtiquetas === 0}>
              Gerar PDF ({totalEtiquetas} etiquetas)
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-md border border-border bg-background p-3">
            <div className="text-sm font-medium">Preview da(s) folha(s)</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Cinza = vazio. Dourado = etiqueta que será impressa.
            </div>

            <div className="mt-3 space-y-4">
              {previews.map((p) => (
                <div key={p.pageIndex} className="space-y-2">
                  <div className="text-xs text-muted-foreground">
                    Página {p.pageIndex + 1}
                  </div>
                  <div
                    className={
                      "grid gap-1 " +
                      (filtros.modelo === "pimaco-a4249"
                        ? "grid-cols-2"
                        : "grid-cols-3")
                    }
                  >
                    {p.slots.map((filled, idx) => (
                      <div
                        key={idx}
                        className={
                          "h-10 rounded-sm border " +
                          (filled
                            ? "border-primary/40 bg-primary/20"
                            : "border-border bg-muted/30")
                        }
                        title={`Etiqueta ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 text-xs text-muted-foreground">
              {totalEtiquetas} etiquetas • {previews.length} página(s) • {perPage} por folha
            </div>
          </div>

          <div className="rounded-md border border-border bg-background p-3">
            <div className="text-sm font-medium">Seleção manual (opcional)</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Se você marcar algum item, o PDF será gerado apenas com os
              selecionados. Se não marcar nada, gera para todos do filtro.
            </div>

            <div className="mt-3 flex items-center gap-2">
              <Checkbox
                id="sel-todos"
                checked={
                  produtosFiltrados.length > 0 &&
                  produtosFiltrados.every((p) => selecionados[p.id])
                }
                onCheckedChange={(v) => toggleSelecionarTodos(Boolean(v))}
              />
              <label
                htmlFor="sel-todos"
                className="text-sm text-foreground"
              >
                Selecionar todos desta lista
              </label>
            </div>

            <div className="mt-3 text-xs text-muted-foreground">
              Selecionados: {Object.values(selecionados).filter(Boolean).length}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border p-4">
          <div className="text-sm font-medium">Produtos no filtro</div>
          <div className="text-xs text-muted-foreground">
            Ajuste a quantidade por produto se quiser. Deixar em branco usa o padrão.
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Código barras</TableHead>
              <TableHead className="text-right">Estoque</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="w-40 text-right">Cópias</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {produtosFiltrados.map((produto) => {
              const fallback = copiasDefault(produto, filtros.copiasPadrao);
              const copias = copiasPorId[produto.id] ?? fallback;

              const hiddenBySelecao = hasSelecaoAtiva && !selecionados[produto.id];

              return (
                <TableRow
                  key={produto.id}
                  className={hiddenBySelecao ? "opacity-50" : undefined}
                >
                  <TableCell>
                    <Checkbox
                      checked={!!selecionados[produto.id]}
                      onCheckedChange={(v) =>
                        setSelecionados((prev) => ({
                          ...prev,
                          [produto.id]: Boolean(v),
                        }))
                      }
                      aria-label={`Selecionar ${produto.nome}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{produto.nome}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {produto.codigo_barras || "—"}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {Number(produto.estoque_atual ?? 0)}
                  </TableCell>
                  <TableCell className="text-right">
                    {Number(produto.preco_venda).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Input
                      className="text-right"
                      type="number"
                      min={0}
                      value={String(copias)}
                      onChange={(e) =>
                        setCopiasPorId((prev) => ({
                          ...prev,
                          [produto.id]: Number(e.target.value),
                        }))
                      }
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          onClick={aplicarPadraoCopias}
          variant="secondary"
          disabled={catalogoQuery.isLoading || produtosFiltrados.length === 0}
        >
          Aplicar padrão de cópias
        </Button>

        <Button
          onClick={gerarPdf}
          disabled={
            catalogoQuery.isLoading ||
            catalogoQuery.isError ||
            totalEtiquetas <= 0 ||
            startAt < 1
          }
        >
          Gerar PDF
        </Button>

        <span className="text-sm text-muted-foreground">
          Fonte catálogo: {catalogoQuery.data?.source ?? "-"} • Fonte histórico: {historicoQuery.data?.source ?? "-"}
        </span>
      </div>

      <div className="text-xs text-muted-foreground">
        Obs.: nesta fase usamos dados mockados. Depois, o BFF vai buscar os
        produtos do backend e aplicar os mesmos filtros no cliente.
      </div>
    </div>
  );
}

