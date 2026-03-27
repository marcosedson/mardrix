import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Barcode,
  Truck,
  Package,
  Layers,
  Tags,
  Ruler,
  Printer,
  ShoppingCart,
  FileText,
  ShoppingBag,
  Ticket,
  Boxes,
  Activity,
  CircleDollarSign,
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  PieChart,
  ChevronDown,
} from "lucide-react";

export const navItems = [
  { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  {
    label: "Cadastros",
    Icon: Activity,
    items: [
      { href: "/clientes", label: "Clientes", Icon: Users },
      { href: "/produtos", label: "Produtos", Icon: Barcode },
      { href: "/fornecedores", label: "Fornecedores", Icon: Truck },
      { href: "/servicos", label: "Serviços", Icon: Package },
      { href: "/categorias", label: "Categorias", Icon: Layers },
      { href: "/marcas", label: "Marcas", Icon: Tags },
      { href: "/unidades", label: "Unidades de Medida", Icon: Ruler },
      { href: "/etiquetas", label: "Impressão de Etiquetas", Icon: Printer },
    ],
  },
  {
    label: "Vendas",
    Icon: ShoppingCart,
    items: [
      { href: "/vendas/orcamentos", label: "Orçamentos", Icon: FileText },
      { href: "/vendas/pedidos", label: "Pedidos", Icon: ShoppingBag },
      { href: "/vendas/venda-rapida", label: "Venda (PDV)", Icon: ShoppingCart },
      { href: "/vendas/cupons", label: "Cupons", Icon: Ticket },
      { href: "/vendas/consignados", label: "Consignados", Icon: Boxes },
      { href: "/vendas/crm", label: "CRM", Icon: Activity },
      { href: "/vendas/comissoes", label: "Comissões", Icon: CircleDollarSign },
      { href: "/vendas/devolucoes", label: "Devoluções", Icon: ArrowUpCircle },
      { href: "/vendas/lista-precos", label: "Lista de Preços", Icon: Tags },
    ],
  },
  {
    label: "Financeiro",
    Icon: Wallet,
    items: [
      {
        label: "Pagamentos",
        Icon: ArrowUpCircle,
        items: [
          { href: "/financeiro/pagamentos/contas-pagar", label: "Contas a Pagar", Icon: CircleDollarSign },
          { href: "/financeiro/pagamentos/contas-receber", label: "Contas a Receber", Icon: CircleDollarSign },
        ],
      },
      {
        label: "Recebimentos",
        Icon: ArrowDownCircle,
        items: [
          { href: "/financeiro/recebimentos/contas-pagar", label: "Contas a Pagar", Icon: CircleDollarSign },
          { href: "/financeiro/recebimentos/contas-receber", label: "Contas a Receber", Icon: CircleDollarSign },
        ],
      },
    ],
  },
  { href: "/relatorios", label: "Relatórios", Icon: PieChart },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <div className="font-bold text-2xl text-white">MARDRIX</div>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {navItems.map((item, index) => (
                <SidebarItem
                  key={index}
                  item={item}
                  pathname={pathname}
                />
              ))}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
}

function SidebarItem({ item, pathname }: { item: any; pathname: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasItems = item.items && item.items.length > 0;
  
  const isActive = item.href 
    ? pathname === item.href || pathname?.startsWith(`${item.href}/`)
    : item.items?.some((sub: any) => 
        sub.href ? (pathname === sub.href || pathname?.startsWith(`${sub.href}/`)) : 
        sub.items?.some((ss: any) => pathname === ss.href || pathname?.startsWith(`${ss.href}/`))
      );

  useEffect(() => {
      if (isActive) setIsOpen(true);
  }, [isActive]);

  const Icon = item.Icon;

  if (!hasItems) {
    return (
      <li>
        <Link
          href={item.href}
          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
            isActive && "bg-graydark dark:bg-meta-4"
          }`}
        >
          <Icon size={18} />
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        className={`group relative flex w-full items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
          isActive && "bg-graydark dark:bg-meta-4"
        }`}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        <Icon size={18} />
        {item.label}
        <ChevronDown
          size={16}
          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current duration-200 ${
            isOpen && "rotate-180"
          }`}
        />
      </button>

      {/* <!-- Dropdown Menu Start --> */}
      <div
        className={`translate transform overflow-hidden duration-300 ease-in-out ${
          !isOpen && "hidden"
        }`}
      >
        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
          {item.items.map((subItem: any, index: number) => (
             <SidebarItem key={index} item={subItem} pathname={pathname} />
          ))}
        </ul>
      </div>
      {/* <!-- Dropdown Menu End --> */}
    </li>
  );
}
