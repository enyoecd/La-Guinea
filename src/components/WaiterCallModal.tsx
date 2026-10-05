import React, { useState } from 'react';
import { X, Bell, CheckCircle2, MessageSquare, GlassWater, UtensilsCrossed, Receipt, HelpCircle } from 'lucide-react';

interface WaiterCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableName: string;
  onTriggerToast: (msg: string) => void;
}

export const WaiterCallModal: React.FC<WaiterCallModalProps> = ({
  isOpen,
  onClose,
  tableName,
  onTriggerToast,
}) => {
  if (!isOpen) return null;

  const [selectedReason, setSelectedReason] = useState<string>('Asistencia general en mesa');
  const [customNote, setCustomNote] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [calledSuccess, setCalledSuccess] = useState(false);

  const quickOptions = [
    { label: 'Servilletas o Cubiertos', icon: UtensilsCrossed },
    { label: 'Hielo o Limón extra', icon: GlassWater },
    { label: 'Retirar platos vacíos', icon: CheckCircle2 },
    { label: 'Solicitar la cuenta', icon: Receipt },
    { label: 'Consulta sobre alérgenos', icon: HelpCircle },
    { label: 'Asistencia general en mesa', icon: Bell },
  ];

  const handleCall = () => {
    setIsCalling(true);
    setTimeout(() => {
      setIsCalling(false);
      setCalledSuccess(true);
      onTriggerToast(`Llamada enviada a los camareros para ${tableName}`);
      setTimeout(() => {
        setCalledSuccess(false);
        onClose();
      }, 1600);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-[#18181b] border border-[#2e2e33] max-w-md w-full rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#2e2e33] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#f59e0b]/20 flex items-center justify-center">
              <Bell className="w-4 h-4 text-[#f59e0b]" />
            </div>
            <div>
              <h3 className="font-['Space_Grotesk'] text-lg text-[#f4f4f5] font-bold">
                Llamar al Camarero
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#a1a1aa]">
                Servicio digital para {tableName}
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

        {calledSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-['Space_Grotesk'] text-lg font-bold text-[#f4f4f5]">
              ¡Aviso enviado al equipo!
            </h4>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#a1a1aa] max-w-xs mx-auto">
              Un camarero se acerca a tu mesa en breves instantes.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-1.5">
              <label className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#f4f4f5] block">
                ¿En qué podemos ayudarte?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {quickOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedReason === opt.label;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => setSelectedReason(opt.label)}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2 ${
                        isSelected
                          ? 'bg-[#222226] border-[#f59e0b] text-[#f4f4f5]'
                          : 'bg-[#1b1b1d] border-[#2e2e33] text-[#a1a1aa] hover:border-[#3f3f46]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-[#f59e0b]' : 'text-[#71717a]'}`} />
                      <span className="font-['Plus_Jakarta_Sans'] text-xs font-medium leading-snug">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-['Plus_Jakarta_Sans'] text-xs font-medium text-[#a1a1aa] block">
                Mensaje adicional (Opcional)
              </label>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Ej: Si es posible traer salsa BBQ extra..."
                className="w-full bg-[#131315] border border-[#2e2e33] focus:border-[#f59e0b] rounded-xl p-2.5 font-['Plus_Jakarta_Sans'] text-xs text-[#f4f4f5] placeholder:text-[#52525b] outline-none"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={handleCall}
                disabled={isCalling}
                className="flex-1 py-2.5 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-[#18181b] font-['Plus_Jakarta_Sans'] text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <Bell className="w-4 h-4 fill-[#18181b]" />
                <span>{isCalling ? 'Avisando...' : 'Avisar a Sala'}</span>
              </button>
              <button
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl bg-[#222226] hover:bg-[#2e2e33] text-[#a1a1aa] hover:text-[#f4f4f5] border border-[#2e2e33] font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-colors"
              >
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
