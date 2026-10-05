import React, { useState } from 'react';
import { X, CreditCard, Banknote, Users, CheckCircle2, Receipt } from 'lucide-react';
import { formatPrice } from '../utils/format';

interface BillModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableName: string;
  totalAmount: number;
  onConfirmBillRequest: (method: string, splitDetails?: string) => void;
}

export const BillModal: React.FC<BillModalProps> = ({
  isOpen,
  onClose,
  tableName,
  totalAmount,
  onConfirmBillRequest,
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'split'>('card');
  const [splitGuests, setSplitGuests] = useState<number>(2);
  const [requested, setRequested] = useState(false);

  const amountPerPerson = Math.ceil(totalAmount / splitGuests);

  const handleConfirm = () => {
    let methodLabel = 'Datáfono / Tarjeta';
    let details = '';
    if (paymentMethod === 'cash') {
      methodLabel = 'Efectivo';
    } else if (paymentMethod === 'split') {
      methodLabel = `Dividir en ${splitGuests} personas (${formatPrice(amountPerPerson)} c/u)`;
      details = `División entre ${splitGuests} comensales`;
    }

    setRequested(true);
    setTimeout(() => {
      onConfirmBillRequest(methodLabel, details);
      setRequested(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-[#18181b] border border-[#2e2e33] max-w-md w-full rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#2e2e33] pb-3">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-[#f59e0b]" />
            <div>
              <h3 className="font-['Space_Grotesk'] text-lg text-[#f4f4f5] font-bold">
                Pedir Cuenta a Mesa
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#a1a1aa]">
                {tableName} • Total: <span className="font-['JetBrains_Mono'] text-[#f59e0b] font-bold">{formatPrice(totalAmount)}</span>
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

        {requested ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-['Space_Grotesk'] text-lg font-bold text-[#f4f4f5]">
              ¡Cuenta Solicitada!
            </h4>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#a1a1aa] max-w-xs mx-auto">
              Un camarero se acerca a tu mesa con el ticket y el terminal de pago.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <label className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#f4f4f5] block">
                Método de pago preferido
              </label>

              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-[#222226] border-[#f59e0b] text-[#f4f4f5]'
                      : 'bg-[#1b1b1d] border-[#2e2e33] text-[#a1a1aa] hover:border-[#3f3f46]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4 text-[#f59e0b]" />
                    <div className="text-left">
                      <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold block">
                        Tarjeta de Crédito / Débito
                      </span>
                      <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#71717a]">
                        Traemos el datáfono inalámbrico a tu mesa
                      </span>
                    </div>
                  </div>
                  {paymentMethod === 'card' && <CheckCircle2 className="w-4 h-4 text-[#f59e0b]" />}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    paymentMethod === 'cash'
                      ? 'bg-[#222226] border-[#f59e0b] text-[#f4f4f5]'
                      : 'bg-[#1b1b1d] border-[#2e2e33] text-[#a1a1aa] hover:border-[#3f3f46]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Banknote className="w-4 h-4 text-[#34d399]" />
                    <div className="text-left">
                      <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold block">
                        Pago en Efectivo
                      </span>
                      <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#71717a]">
                        Se traerá cambio exacto si lo necesitas
                      </span>
                    </div>
                  </div>
                  {paymentMethod === 'cash' && <CheckCircle2 className="w-4 h-4 text-[#f59e0b]" />}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('split')}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    paymentMethod === 'split'
                      ? 'bg-[#222226] border-[#f59e0b] text-[#f4f4f5]'
                      : 'bg-[#1b1b1d] border-[#2e2e33] text-[#a1a1aa] hover:border-[#3f3f46]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-[#60a5fa]" />
                    <div className="text-left">
                      <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold block">
                        Dividir la Cuenta en Partes Iguales
                      </span>
                      <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#71717a]">
                        Cobro individual por tarjeta o efectivo
                      </span>
                    </div>
                  </div>
                  {paymentMethod === 'split' && <CheckCircle2 className="w-4 h-4 text-[#f59e0b]" />}
                </button>
              </div>
            </div>

            {/* Split calculator if split mode */}
            {paymentMethod === 'split' && (
              <div className="bg-[#131315] border border-[#2e2e33] p-3 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#a1a1aa]">
                    Número de personas:
                  </span>
                  <div className="flex items-center gap-2">
                    {[2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        onClick={() => setSplitGuests(num)}
                        className={`w-7 h-7 rounded-lg font-['JetBrains_Mono'] text-xs font-bold transition-all ${
                          splitGuests === num
                            ? 'bg-[#f59e0b] text-[#18181b]'
                            : 'bg-[#222226] text-[#a1a1aa] hover:text-[#f4f4f5]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#2e2e33] font-['Plus_Jakarta_Sans'] text-xs">
                  <span className="text-[#a1a1aa]">Total por persona:</span>
                  <span className="font-['JetBrains_Mono'] text-base font-bold text-[#f59e0b]">
                    {formatPrice(amountPerPerson)}
                  </span>
                </div>
              </div>
            )}

            <div className="pt-2 flex gap-3">
              <button
                onClick={handleConfirm}
                className="flex-1 py-2.5 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-[#18181b] font-['Plus_Jakarta_Sans'] text-xs font-bold transition-all shadow-md active:scale-95"
              >
                Solicitar Cuenta a Mesa
              </button>
              <button
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl bg-[#222226] hover:bg-[#2e2e33] text-[#a1a1aa] hover:text-[#f4f4f5] border border-[#2e2e33] font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-colors"
              >
                Cerrar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
