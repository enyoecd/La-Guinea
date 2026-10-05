import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils/format';

interface MobileFloatingBarProps {
  itemCount: number;
  totalPrice: number;
  tableName: string;
  onOpenCart: () => void;
}

export const MobileFloatingBar: React.FC<MobileFloatingBarProps> = ({
  itemCount,
  totalPrice,
  tableName,
  onOpenCart,
}) => {
  if (itemCount === 0) return null;

  return (
    <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 bg-[#18181b]/95 backdrop-blur-xl border border-[#2e2e33] p-2.5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.85)] flex items-center justify-between">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={onOpenCart}
      >
        <div className="w-10 h-10 rounded-xl bg-[#f59e0b] text-[#18181b] flex items-center justify-center font-['JetBrains_Mono'] font-bold text-sm shadow-md">
          {itemCount}
        </div>
        <div>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#a1a1aa] uppercase tracking-wider block">
            {tableName} • Comanda
          </span>
          <div className="font-['JetBrains_Mono'] text-sm sm:text-base text-[#f59e0b] font-bold leading-tight">
            {formatPrice(totalPrice)}
          </div>
        </div>
      </div>

      <button
        onClick={onOpenCart}
        className="px-4 py-2.5 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-[#18181b] font-['Plus_Jakarta_Sans'] text-xs font-bold flex items-center gap-1.5 active:scale-95 shadow-md"
      >
        <span>Comandar</span>
        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
};
