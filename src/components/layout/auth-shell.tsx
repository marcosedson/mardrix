import type { ReactNode } from "react";

import { Brand } from "@/components/brand/brand";
import { cn } from "@/lib/utils";

export function AuthShell({
  title,
  description,
  children,
  footer,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("relative flex min-h-screen overflow-hidden bg-background", className)}>
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-[#1E40AF]/15 blur-[120px] animate-pulse" />
        <div className="absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full bg-[#6D28D9]/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="hero-grid absolute inset-0 opacity-10" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-stretch px-6 py-12 md:py-20">
        <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left: pitch */}
          <section className="hidden flex-col justify-between rounded-[2.5rem] border border-border/40 bg-card/20 p-12 shadow-2xl shadow-black/10 backdrop-blur-3xl lg:flex overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF]/10 to-[#6D28D9]/10 opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10 space-y-10">
              <Brand className="scale-125 origin-left" />
              <div className="space-y-4 pt-4">
                <h1 className="text-4xl font-black tracking-tight text-foreground leading-tight">
                  A próxima geração da <span className="bg-gradient-to-r from-[#1E40AF] to-[#6D28D9] bg-clip-text text-transparent">gestão empresarial</span> está aqui.
                </h1>
                {description ? (
                  <p className="text-lg text-muted-foreground/80 leading-relaxed max-w-md">{description}</p>
                ) : null}
              </div>

              <div className="grid gap-4 pt-4">
                {[
                  { title: "Velocidade Extrema", desc: "Arquitetura otimizada para respostas instantâneas." },
                  { title: "Inteligência Nativa", desc: "Insights automáticos sobre seu fluxo de caixa." },
                  { title: "Design Imersivo", desc: "Uma interface que trabalha para você, não contra você." }
                ].map((feature, i) => (
                  <div key={i} className="glass group/item relative overflow-hidden rounded-2xl p-5 border-border/20 hover:border-[#1E40AF]/40 dark:hover:border-[#6D28D9]/40 transition-all hover:translate-x-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF]/5 to-[#6D28D9]/5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="text-sm font-bold text-foreground mb-1 flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#1E40AF] to-[#6D28D9]" />
                        {feature.title}
                      </div>
                      <div className="text-xs text-muted-foreground/70">{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-4 text-xs font-medium text-muted-foreground/40 uppercase tracking-widest">
              <span>{new Date().getFullYear()} © Mardrix Intelligence</span>
              <div className="h-px flex-1 bg-border/10" />
              <div className="flex gap-4">
                <span className="hover:text-primary cursor-pointer transition-colors">Termos</span>
                <span className="hover:text-primary cursor-pointer transition-colors">Privacidade</span>
              </div>
            </div>
          </section>

          {/* Right: form */}
          <section className="flex items-center justify-center">
            <div className="w-full max-w-md space-y-8">
              <div className="flex flex-col items-center text-center lg:hidden">
                <Brand className="scale-125 mb-8" />
                <h2 className="text-2xl font-bold tracking-tight mb-2">{title}</h2>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                {children}
              </div>

              {footer ? (
                <div className="text-center animate-in fade-in duration-1000 delay-300">
                  {footer}
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

