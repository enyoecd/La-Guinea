import React from 'react';
import { X, QrCode, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { AVAILABLE_TABLES } from '../data/menuData';
import { TableInfo } from '../types/menu';

interface TableSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTable: TableInfo;
  onSelectTable: (table: TableInfo) => void;
}

export const TableSelectorModal: React.FC<TableSelectorModalProps> = ({
  isOpen,
  onClose,
  currentTable,
  onSelectTable,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-[#18181b] border border-[#2e2e33] max-w-md w-full rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#2e2e33] pb-3">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#f59e0b]" />
            <div>
              <h3 className="font-['Space_Grotesk'] text-lg text-[#f4f4f5] font-bold leading-tight">
                Mesa & Código QR
              </h3>
              <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#a1a1aa]">
                Terminal de Pedido en Mesa
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#222226] flex items-center justify-center text-[#a1a1aa] hover:text-[#f4f4f5]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* QR Code Graphic Badge */}
        <div className="bg-[#131315] border border-[#2e2e33] p-4 rounded-xl flex items-center gap-4">
          <div className="w-20 h-20 bg-white p-1.5 rounded-lg shrink-0 flex items-center justify-center shadow-inner">
            {/* SVG Stylized QR matrix representation */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-black fill-current">
              <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" />
              <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" />
              <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" />
              <rect x="40" y="10" width="10" height="20" />
              <rect x="55" y="5" width="10" height="15" />
              <rect x="35" y="45" width="30" height="10" />
              <rect x="75" y="40" width="15" height="15" />
              <rect x="40" y="70" width="15" height="25" />
              <rect x="65" y="75" width="25" height="15" />
              <rect x="15" y="45" width="10" height="15" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#f59e0b] uppercase font-semibold">
              QR Activo
            </span>
            <h4 className="font-['Space_Grotesk'] text-base font-bold text-[#f4f4f5]">
              {currentTable.name}
            </h4>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#a1a1aa] flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[#f59e0b]" />
              {currentTable.area}
            </p>
            <span className="inline-block mt-1 font-['JetBrains_Mono'] text-[10px] text-emerald-400">
              ● Sesión vinculada con comanda
            </span>
          </div>
        </div>

        {/* Change table list */}
        <div className="space-y-2">
          <label className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#f4f4f5] block">
            Cambiar de Mesa (Simular escaneo de otro QR)
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {AVAILABLE_TABLES.map((t) => {
              const isSelected = currentTable.id === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    onSelectTable({ id: t.id, name: t.name, area: t.area });
                    onClose();
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-[#222226] border-[#f59e0b] text-[#f4f4f5]'
                      : 'bg-[#1b1b1d] border-[#2e2e33] text-[#a1a1aa] hover:border-[#3f3f46]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#f4f4f5]">
                      {t.name}
                    </span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#f59e0b]" />}
                  </div>
                  <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#71717a] block mt-0.5 truncate">
                    {t.area}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#222226] hover:bg-[#2e2e33] text-[#f4f4f5] font-['Plus_Jakarta_Sans'] text-xs font-semibold border border-[#2e2e33] transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
