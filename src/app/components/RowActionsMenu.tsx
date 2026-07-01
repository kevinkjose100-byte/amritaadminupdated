import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";

export interface RowAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "destructive";
  hidden?: boolean;
}

interface RowActionsMenuProps {
  actions: RowAction[];
}

export function RowActionsMenu({ actions }: RowActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const visible = actions.filter(a => !a.hidden);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  if (visible.length === 0) return null;

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(v => !v); }}
        className="p-1.5 rounded-lg hover:bg-[#f2f4f6] text-[#43474e] transition-colors"
        title="Actions"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-1 w-44 bg-white rounded-[10px] border border-[#e6e8ea] shadow-[0px_4px_16px_rgba(0,0,0,0.12)] py-1 animate-[fadeIn_0.1s_ease-out]">
          {visible.map((action, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); action.onClick(); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-left transition-colors ${
                action.variant === "destructive"
                  ? "text-[#ba1a1a] hover:bg-[#ba1a1a]/8"
                  : "text-[#191c1e] hover:bg-[#f2f4f6]"
              }`}
            >
              {action.icon && <span className="flex-shrink-0 w-4 h-4 flex items-center">{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
