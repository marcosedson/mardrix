export function indexUltimoGeradoPorProduto(
  h: Array<{ produto_id: string; gerado_em: string }>
) {
  const out: Record<string, string> = {};

  for (const row of h) {
    const prev = out[row.produto_id];
    if (!prev) {
      out[row.produto_id] = row.gerado_em;
      continue;
    }

    if (new Date(row.gerado_em).getTime() > new Date(prev).getTime()) {
      out[row.produto_id] = row.gerado_em;
    }
  }

  return out;
}
