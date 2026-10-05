import React from 'react';
import { X, CheckCircle2, Flame, Utensils, Clock, Sparkles } from 'lucide-react';
import { ActiveOrder } from '../types/menu';
import { formatPrice } from '../utils/format';

interface ActiveOrderStatusModalProps {
  order: ActiveOrder | null;
  onClose: () => void;
}

export const ActiveOrderStatusModal: React.FC<ActiveOrderStatusModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  const steps = [
    {
      title: 'Comanda recibida',
      desc: 'Impresa en comandera central de cocina',
      icon: CheckCircle2,
      done: true,
    },
    {
      title: 'En brasas & horno de leña',
      desc: 'Cocción a fuego lento con madera de roble',
      icon: Flame,
      done: order.statusProgress >= 40,
      active: order.statusProgress < 80 && order.statusProgress >= 40,
    },
    {
      title: 'Emplatado & Control de autor',
      desc: 'Guarniciones calientes y salsas artesanales',
      icon: Utensils,
      done: order.statusProgress >= 80,
      active: order.statusProgress >= 80 && order.statusProgress < 100,
    },
    {
      title: 'En camino a tu mesa',
      desc: `Servicio directo a ${order.table}`,
      icon: Sparkles,
      done: order.statusProgress >= 100,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-[#18181b] border border-[#2e2e33] max-w-md w-full rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#2e2e33] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#f59e0b]/20 flex items-center justify-center">
              <Flame className="w-4 h-4 text-[#f59e0b]" />
            </div>
            <div>
              <h3 className="font-['Space_Grotesk'] text-lg text-[#f4f4f5] font-bold">
                Estado de tu Pedido
              </h3>
              <p className="font-['JetBrains_Mono'] text-xs text-[#fabc4d]">
                Comanda {order.orderNumber} • {order.table}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#222226] flex items-center justify-center text-[#a1a1aa] hover:text-[#f4f4f5]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Estimate Card */}
        <div className="bg-[#131315] border border-[#2e2e33] p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] flex items-center justify-center">
              <Clock className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#a1a1aa] block">
                Tiempo de espera estimado
              </span>
              <span className="font-['Space_Grotesk'] text-lg font-bold text-[#f4f4f5]">
                12 - 16 min
              </span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-['JetBrains_Mono'] text-[11px] border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Cocina en marcha
          </span>
        </div>

        {/* Progress Timeline */}
        <div className="space-y-4 py-2">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="flex items-start gap-3 relative">
                {idx < steps.length - 1 && (
                  <div
                    className={`absolute left-4 top-8 bottom-0 w-0.5 -ml-px ${
                      step.done ? 'bg-[#f59e0b]' : 'bg-[#2e2e33]'
                    }`}
                  />
                )}
                <div
                  className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border z-10 ${
                    step.done
                      ? 'bg-[#f59e0b] border-[#f59e0b] text-[#18181b]'
                      : step.active
                      ? 'bg-[#222226] border-[#f59e0b] text-[#f59e0b] animate-pulse'
                      : 'bg-[#1b1b1d] border-[#2e2e33] text-[#71717a]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <h4 className="font-['Space_Grotesk'] text-xs sm:text-sm font-bold text-[#f4f4f5]">
                    {step.title}
                  </h4>
                  <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#a1a1aa]">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dishes in this order */}
        <div className="bg-[#131315] border border-[#2e2e33] p-3 rounded-xl space-y-1.5">
          <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#f4f4f5] block">
            Platos marchando ({order.items.length}):
          </span>
          <div className="space-y-1 text-xs">
            {order.items.map((it) => (
              <div key={it.cartId} className="flex justify-between text-[#a1a1aa]">
                <span className="truncate pr-2">
                  {it.qty}x {it.name} {it.selectedMeatPoint ? `(${it.selectedMeatPoint})` : ''}
                </span>
                <span className="font-['JetBrains_Mono'] text-[#f4f4f5] shrink-0">
                  {formatPrice(it.price * it.qty)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#2e2e33] flex justify-between font-bold text-xs text-[#f4f4f5]">
            <span>Total Comanda</span>
            <span className="font-['JetBrains_Mono'] text-[#f59e0b]">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#222226] hover:bg-[#2e2e33] text-[#f4f4f5] font-['Plus_Jakarta_Sans'] text-xs font-semibold border border-[#2e2e33] transition-colors"
        >
          Entendido, seguir viendo el menú
        </button>
      </div>
    </div>
  );
};
