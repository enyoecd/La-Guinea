import React, { useState } from 'react';
import { Send, Receipt, Trash2, Plus, Minus, X, AlertCircle } from 'lucide-react';
import { OrderItem } from '../types/menu';
import { formatPrice } from '../utils/format';

interface OrderDrawerProps {
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  items: OrderItem[];
  tableInfo: { name: string; area: string };
  onModifyQty: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onSendToKitchen: (generalNotes: string, tipPercentage: number) => void;
  onRequestBill: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpenMobile,
  onCloseMobile,
  items,
  tableInfo,
  onModifyQty,
  onRemoveItem,
  onSendToKitchen,
  onRequestBill,
}) => {
  const [kitchenNotes, setKitchenNotes] = useState('');
  const [tipPercent, setTipPercent] = useState<number>(10);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tipAmount = Math.round(subtotal * (tipPercent / 100));
  const total = subtotal + tipAmount;

  const content = (
    <div className="bg-[#18181b] border border-[#2e2e33] p-4 sm:p-5 rounded-2xl shadow-xl flex flex-col h-full max-h-[85vh] lg:max-h-none overflow-hidden">
      {/* Title Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#2e2e33]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#f59e0b] text-[22px]">
            room_service
          </span>
          <div>
            <h2 className="font-['Space_Grotesk'] text-base font-bold text-[#f4f4f5] leading-none">
              Tu Comanda
            </h2>
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#a1a1aa]">
              {tableInfo.name} • {tableInfo.area}
            </span>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden w-7 h-7 rounded-full bg-[#222226] flex items-center justify-center text-[#a1a1aa]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Items list */}
      <div className="flex-1 overflow-y-auto space-y-2 py-3 pr-1 my-1">
        {items.length === 0 ? (
          <div className="text-center py-10 px-4 text-[#71717a] space-y-2">
            <span className="material-symbols-outlined text-[36px] text-[#3f3f46]">
              restaurant_menu
            </span>
            <p className="font-['Plus_Jakarta_Sans'] text-xs">
              Tu comanda está vacía. Selecciona platos y bebidas de la carta para empezar.
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.cartId}
              className="bg-[#1b1b1d] border border-[#2e2e33] p-2.5 rounded-xl text-xs space-y-1.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-['Plus_Jakarta_Sans'] font-semibold text-[#f4f4f5] truncate">
                    {item.name}
                  </p>
                  <span className="font-['JetBrains_Mono'] text-[#f59e0b] font-medium">
                    {formatPrice(item.price)}
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1.5 shrink-0 bg-[#222226] border border-[#2e2e33] px-2 py-0.5 rounded-full">
                  <button
                    onClick={() => onModifyQty(item.cartId, -1)}
                    className="text-[#f59e0b] hover:text-[#fbbf24] px-1 font-bold text-sm"
                    title="Disminuir"
                  >
                    -
                  </button>
                  <span className="font-['JetBrains_Mono'] font-bold text-[#f4f4f5] min-w-[12px] text-center">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => onModifyQty(item.cartId, 1)}
                    className="text-[#f59e0b] hover:text-[#fbbf24] px-1 font-bold text-sm"
                    title="Aumentar"
                  >
                    +
                  </button>
                  <button
                    onClick={() => onRemoveItem(item.cartId)}
                    className="text-[#ef4444] hover:text-[#f87171] ml-1 pl-1 border-l border-[#2e2e33]"
                    title="Quitar"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Modifiers tags if customized */}
              {(item.selectedMeatPoint || item.selectedSide || item.selectedDips?.length || item.notes) && (
                <div className="text-[10px] text-[#a1a1aa] bg-[#141416] p-1.5 rounded-lg space-y-0.5">
                  {item.selectedMeatPoint && (
                    <div>
                      <span className="text-[#f59e0b]">Término:</span> {item.selectedMeatPoint}
                    </div>
                  )}
                  {item.selectedSide && (
                    <div>
                      <span className="text-[#f59e0b]">Guarnición:</span> {item.selectedSide}
                    </div>
                  )}
                  {item.selectedDips && item.selectedDips.length > 0 && (
                    <div>
                      <span className="text-[#f59e0b]">Salsas:</span> {item.selectedDips.join(', ')}
                    </div>
                  )}
                  {item.notes && (
                    <div className="italic text-[#d4d4d8]">
                      "{item.notes}"
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Kitchen notes field */}
      <div className="pt-2 border-t border-[#2e2e33] space-y-1">
        <label className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#a1a1aa]">
          Notas generales para la cocina
        </label>
        <input
          type="text"
          value={kitchenNotes}
          onChange={(e) => setKitchenNotes(e.target.value)}
          placeholder="Ej: Servir todo junto, sin cubiertos de plástico..."
          className="w-full bg-[#1b1b1d] border border-[#2e2e33] focus:border-[#f59e0b] rounded-lg p-2 font-['Plus_Jakarta_Sans'] text-xs text-[#f4f4f5] placeholder:text-[#52525b] outline-none"
        />
      </div>

      {/* Service tip selector */}
      <div className="pt-2 space-y-1">
        <div className="flex items-center justify-between text-[11px] text-[#a1a1aa]">
          <span>Propina sugerida</span>
          <div className="flex gap-1">
            {[0, 10, 15].map((p) => (
              <button
                key={p}
                onClick={() => setTipPercent(p)}
                className={`px-2 py-0.5 rounded text-[10px] font-['JetBrains_Mono'] ${
                  tipPercent === p
                    ? 'bg-[#f59e0b] text-[#18181b] font-bold'
                    : 'bg-[#222226] text-[#a1a1aa] hover:text-[#f4f4f5]'
                }`}
              >
                {p}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subtotal, Tip and Total calculation */}
      <div className="pt-2 border-t border-[#2e2e33] space-y-1 text-xs">
        <div className="flex items-center justify-between text-[#a1a1aa]">
          <span>Subtotal Platos</span>
          <span className="font-['JetBrains_Mono'] text-[#f4f4f5]">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-[#a1a1aa]">
          <span>Servicio ({tipPercent}%)</span>
          <span className="font-['JetBrains_Mono'] text-[#f4f4f5]">{formatPrice(tipAmount)}</span>
        </div>
        <div className="flex items-center justify-between pt-1 font-bold text-sm text-[#f4f4f5] border-t border-[#2e2e33]/50">
          <span>Total Comanda</span>
          <span className="font-['JetBrains_Mono'] text-lg text-[#f59e0b] font-bold">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="pt-3 space-y-2">
        <button
          onClick={() => onSendToKitchen(kitchenNotes, tipPercent)}
          disabled={items.length === 0}
          className="w-full py-2.5 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] disabled:opacity-40 disabled:pointer-events-none text-[#18181b] font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2 active:scale-98 shadow-md"
        >
          <Send className="w-4 h-4 stroke-[2.5]" />
          <span>Enviar a Cocina</span>
        </button>

        <button
          onClick={onRequestBill}
          className="w-full py-2 rounded-lg bg-[#222226] hover:bg-[#2e2e33] text-[#a1a1aa] hover:text-[#f4f4f5] border border-[#2e2e33] font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Receipt className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span>Pedir Cuenta a Mesa</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Column */}
      <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
        <div className="sticky top-36">{content}</div>
      </aside>

      {/* Mobile Drawer Slide-over */}
      {isOpenMobile && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center p-0"
          onClick={onCloseMobile}
        >
          <div
            className="w-full max-h-[85vh] overflow-hidden rounded-t-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </div>
        </div>
      )}
    </>
  );
};
