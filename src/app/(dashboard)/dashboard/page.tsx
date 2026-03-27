"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  AlertCircle, 
  Calendar, 
  Users, 
  ArrowUpRight, 
  DollarSign, 
  Package,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { 
    title: "Faturamento (Mês)", 
    value: "R$ 42.500,00", 
    change: "+12.5%", 
    icon: DollarSign, 
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  { 
    title: "Baixo Estoque", 
    value: "14 itens", 
    change: "-2 desde ontem", 
    icon: AlertCircle, 
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  { 
    title: "Contas a Vencer", 
    value: "R$ 2.450,00", 
    change: "3 hoje", 
    icon: Calendar, 
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  { 
    title: "Novos Clientes", 
    value: "28", 
    change: "+4 esta semana", 
    icon: Users, 
    color: "text-[#6D28D9]",
    bg: "bg-[#6D28D9]/10"
  },
];

const activityStats = [
  { label: "Vendas", value: 85, color: "bg-[#1E40AF]" },
  { label: "Leads", value: 62, color: "bg-[#6D28D9]" },
  { label: "Suporte", value: 45, color: "bg-blue-400" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[#1E40AF] dark:text-[#6D28D9]">
          <Activity className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Visão Geral</span>
        </div>
        <h1 className="text-4xl font-black tracking-tight text-foreground">
          Bem-vindo ao <span className="bg-gradient-to-r from-[#1E40AF] to-[#6D28D9] bg-clip-text text-transparent">Mardrix</span>
        </h1>
        <p className="max-w-2xl text-muted-foreground leading-relaxed">
          Sua central de inteligência está pronta. Aqui está um resumo do que aconteceu na sua empresa hoje.
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={item}>
            <Card className="glow-card group overflow-hidden border-border/40 bg-card/50 transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-lg p-2 ${stat.bg}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black tracking-tight">{stat.value}</div>
                <div className="mt-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-tight">
                  <span className={stat.change.startsWith("+") ? "text-emerald-500" : "text-amber-500"}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground/50">vs. período anterior</span>
                </div>
              </CardContent>
              {/* Subtle gradient bar at the bottom */}
              <div className={`h-1 w-full opacity-30 ${stat.bg.replace('/10', '')}`} />
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-border/40 bg-card/30 backdrop-blur-sm overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/10 pb-4">
            <div>
              <CardTitle className="text-lg font-bold">Desempenho de Vendas</CardTitle>
              <p className="text-xs text-muted-foreground">Volume de transações nos últimos 30 dias</p>
            </div>
            <button className="flex items-center gap-1 text-xs font-bold text-[#1E40AF] dark:text-[#6D28D9] hover:underline">
              Ver Relatório <ArrowUpRight className="h-3 w-3" />
            </button>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="w-full px-6 space-y-8 relative z-10">
              {activityStats.map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <span className="text-muted-foreground">{stat.label}</span>
                    <span className="text-foreground">{stat.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-accent/30 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className={`h-full ${stat.color} shadow-[0_0_10px_rgba(var(--primary),0.3)]`}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-4 text-center">
                 <p className="text-[10px] font-bold bg-gradient-to-r from-[#1E40AF] to-[#6D28D9] bg-clip-text text-transparent uppercase tracking-[0.2em] animate-pulse">
                   Processando dados em tempo real...
                 </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-border/40 bg-card/30 backdrop-blur-sm">
          <CardHeader className="border-b border-border/10 pb-4">
            <CardTitle className="text-lg font-bold">Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {[
                { user: "Marcos M.", action: "Gerou etiqueta lote #442", time: "Há 12 min" },
                { user: "Sistema", action: "Backup automático concluído", time: "Há 1 h" },
                { user: "Julia S.", action: "Cadastrou novo fornecedor: Tech-X", time: "Há 3 h" },
                { user: "Roberto L.", action: "Venda aprovada R$ 1.250,00", time: "Há 5 h" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-default">
                  <div className="h-8 w-8 rounded-full bg-[#1E40AF]/10 dark:bg-[#6D28D9]/10 grid place-items-center text-[10px] font-bold text-[#1E40AF] dark:text-[#6D28D9] ring-1 ring-[#1E40AF]/20 dark:ring-[#6D28D9]/20 group-hover:bg-gradient-to-br group-hover:from-[#1E40AF] group-hover:to-[#6D28D9] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(30,64,175,0.5)] transition-all">
                    {activity.user.split(' ')[0][0]}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-sm font-bold text-foreground/80 leading-none">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                  <div className="text-[10px] font-medium text-muted-foreground/40 whitespace-nowrap">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
