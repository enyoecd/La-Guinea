import React from 'react';
import { X, Check } from 'lucide-react';

export interface FilterOptions {
  veggieOnly: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  noSpicy: boolean;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onResetFilters: () => void;
  matchCount: number;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onResetFilters,
  matchCount,
}) => {
  if (!isOpen) return null;

  const toggle = (key: keyof FilterOptions) => {
    onFilterChange({
      ...filters,
      [key]: !filters[key],
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-[#18181b] border border-[#2e2e33] max-w-md w-full rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#2e2e33] pb-3">
          <div>
            <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl text-[#f4f4f5] font-bold">
              Filtros & Alérgenos
            </h3>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#a1a1aa]">
              {matchCount} platos disponibles según tu preferencia
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#222226] flex items-center justify-center text-[#a1a1aa] hover:text-[#f4f4f5]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5">
          <label
            onClick={() => toggle('veggieOnly')}
            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
              filters.veggieOnly
                ? 'bg-[#222226] border-[#f59e0b] text-[#f4f4f5]'
                : 'bg-[#1b1b1d] border-[#2e2e33] text-[#a1a1aa] hover:border-[#3f3f46]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#34d399] text-[20px]">
                eco
              </span>
              <div>
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold block text-[#f4f4f5]">
                  Solo platos 0% Carne / Veggie World
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#71717a]">
                  Recetas plant-based y vegetarianas
                </span>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                filters.veggieOnly
                  ? 'bg-[#f59e0b] border-[#f59e0b] text-[#18181b]'
                  : 'border-[#3f3f46]'
              }`}
            >
              {filters.veggieOnly && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </label>

          <label
            onClick={() => toggle('glutenFree')}
            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
              filters.glutenFree
                ? 'bg-[#222226] border-[#f59e0b] text-[#f4f4f5]'
                : 'bg-[#1b1b1d] border-[#2e2e33] text-[#a1a1aa] hover:border-[#3f3f46]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#fbbf24] text-[20px]">
                grain
              </span>
              <div>
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold block text-[#f4f4f5]">
                  Sin Gluten / Apto Celíacos
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#71717a]">
                  Platos libres de trigo y derivados
                </span>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                filters.glutenFree
                  ? 'bg-[#f59e0b] border-[#f59e0b] text-[#18181b]'
                  : 'border-[#3f3f46]'
              }`}
            >
              {filters.glutenFree && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </label>

          <label
            onClick={() => toggle('dairyFree')}
            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
              filters.dairyFree
                ? 'bg-[#222226] border-[#f59e0b] text-[#f4f4f5]'
                : 'bg-[#1b1b1d] border-[#2e2e33] text-[#a1a1aa] hover:border-[#3f3f46]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#60a5fa] text-[20px]">
                water_drop
              </span>
              <div>
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold block text-[#f4f4f5]">
                  Sin Lácteos / Sin Queso fundido
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#71717a]">
                  Libre de sour cream, queso y leche
                </span>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                filters.dairyFree
                  ? 'bg-[#f59e0b] border-[#f59e0b] text-[#18181b]'
                  : 'border-[#3f3f46]'
              }`}
            >
              {filters.dairyFree && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </label>

          <label
            onClick={() => toggle('noSpicy')}
            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
              filters.noSpicy
                ? 'bg-[#222226] border-[#f59e0b] text-[#f4f4f5]'
                : 'bg-[#1b1b1d] border-[#2e2e33] text-[#a1a1aa] hover:border-[#3f3f46]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#ef4444] text-[20px]">
                do_not_disturb_on
              </span>
              <div>
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold block text-[#f4f4f5]">
                  Sin Picante (0 Jalapeños)
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#71717a]">
                  Sabores suaves para todo paladar
                </span>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                filters.noSpicy
                  ? 'bg-[#f59e0b] border-[#f59e0b] text-[#18181b]'
                  : 'border-[#3f3f46]'
              }`}
            >
              {filters.noSpicy && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </label>
        </div>

        <div className="pt-2 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-[#18181b] font-['Plus_Jakarta_Sans'] text-xs font-bold transition-all shadow-md active:scale-95"
          >
            Ver {matchCount} Platos
          </button>
          <button
            onClick={onResetFilters}
            className="py-2.5 px-4 rounded-xl bg-[#222226] hover:bg-[#2e2e33] text-[#a1a1aa] hover:text-[#f4f4f5] border border-[#2e2e33] font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-colors"
          >
            Restablecer
          </button>
        </div>
      </div>
    </div>
  );
};
