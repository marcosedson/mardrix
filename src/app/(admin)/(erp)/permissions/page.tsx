import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

const permissionMatrix = [
  { module: "Dashboard", admin: true, financeiro: true, vendas: true },
  { module: "Produtos", admin: true, financeiro: false, vendas: true },
  { module: "Financeiro", admin: true, financeiro: true, vendas: false },
  { module: "Usuarios", admin: true, financeiro: false, vendas: false },
];

export default function PermissionsPage() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Permissoes" />
      <ComponentCard title="Perfis base">
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="min-w-full">
            <thead className="border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Modulo</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Admin</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Financeiro</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Vendas</th>
              </tr>
            </thead>
            <tbody>
              {permissionMatrix.map((row) => (
                <tr key={row.module} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{row.module}</td>
                  <td className="px-4 py-3 text-sm">{row.admin ? "Sim" : "Nao"}</td>
                  <td className="px-4 py-3 text-sm">{row.financeiro ? "Sim" : "Nao"}</td>
                  <td className="px-4 py-3 text-sm">{row.vendas ? "Sim" : "Nao"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentCard>
    </div>
  );
}

