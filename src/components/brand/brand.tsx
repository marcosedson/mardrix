import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Brand({ 
  className, 
  subtitle = true,
  mini = false 
}: { 
  className?: string; 
  subtitle?: boolean;
  mini?: boolean;
}) {
  return (
    <div className={cn("select-none", className)}>
      <div className="flex items-center gap-3">
        <motion.div 
          whileHover={{ scale: 1.05, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
          className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-[#1E40AF] to-[#6D28D9] shadow-[0_0_20px_rgba(30,64,175,0.3)] grid place-items-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative text-lg font-bold tracking-tighter text-white">M</span>
        </motion.div>
        {!mini && (
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-foreground/90">
              MARD<span className="text-primary">RIX</span>
            </span>
            {subtitle ? (
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
                Intelligence ERP
              </span>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

