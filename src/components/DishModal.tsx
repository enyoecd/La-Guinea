import React, { useState } from 'react';
import { X, Plus, Minus, Flame, Check, Sparkles } from 'lucide-react';
import { Dish, CustomizationOption } from '../types/menu';
import { MEAT_COOK_POINTS, SIDES_OPTIONS, EXTRA_DIPS_OPTIONS } from '../data/menuData';
import { formatPrice } from '../utils/format';

interface DishModalProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToCart: (customizedItem: {
    dishId: string;
    name: string;
    price: number;
    qty: number;
    image: string;
    selectedMeatPoint?: string;
    selectedSide?: string;
    selectedDips?: string[];
    notes?: string;
  }) => void;
}

export const DishModal: React.FC<DishModalProps> = ({
  dish,
  onClose,
  onAddToCart,
}) => {
  if (!dish) return null;

  const [qty, setQty] = useState(1);
  const [selectedMeatPoint, setSelectedMeatPoint] = useState<string>(
    dish.hasCustomMeatPoint ? 'tres_cuartos' : ''
  );
  const [selectedSide, setSelectedSide] = useState<string>(
    dish.sidesOptions && dish.sidesOptions.length > 0 ? dish.sidesOptions[0].name : ''
  );
  const [selectedDips, setSelectedDips] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  // Calculate total item price
  const calculateUnitPrice = () => {
    let price = dish.price;
    // Add side cost if any
    if (dish.sidesOptions && selectedSide) {
      const sideObj = dish.sidesOptions.find((s) => s.name === selectedSide);
      if (sideObj) price += sideObj.price;
    }
    // Add dips cost
    selectedDips.forEach((dipName) => {
      const dipObj = EXTRA_DIPS_OPTIONS.find((d) => d.name === dipName);
      if (dipObj) price += dipObj.price;
    });
    return price;
  };

  const unitPrice = calculateUnitPrice();
  const totalPrice = unitPrice * qty;

  const toggleDip = (dipName: string) => {
    setSelectedDips((prev) =>
      prev.includes(dipName) ? prev.filter((d) => d !== dipName) : [...prev, dipName]
    );
  };

  const handleConfirm = () => {
    onAddToCart({
      dishId: dish.id,
      name: dish.name,
      price: unitPrice,
      qty,
      image: dish.image,
      selectedMeatPoint: dish.hasCustomMeatPoint ? selectedMeatPoint : undefined,
      selectedSide: selectedSide || undefined,
      selectedDips: selectedDips.length > 0 ? selectedDips : undefined,
      notes: notes.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="bg-[#18181b] border border-[#2e2e33] w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image & Close */}
        <div className="relative w-full h-48 sm:h-56 bg-[#131315] shrink-0">
          <img
            src={dish.image}
            alt={dish.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#131315]/80 text-[#a1a1aa] hover:text-[#f4f4f5] flex items-center justify-center border border-[#2e2e33] backdrop-blur-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          {dish.tag && (
            <div className="absolute top-3 left-3 bg-[#131315]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-['JetBrains_Mono'] text-[#f59e0b] border border-[#2e2e33]">
              {dish.tag}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 flex-1">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-[#f4f4f5]">
                {dish.name}
              </h2>
              <span className="font-['JetBrains_Mono'] text-lg font-bold text-[#f59e0b] whitespace-nowrap">
                {formatPrice(dish.price)}
              </span>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#a1a1aa] mt-1 leading-relaxed">
              {dish.description}
            </p>
          </div>

          {/* Meat Cook Point Selector (For Steaks & Burgers) */}
          {dish.hasCustomMeatPoint && (
            <div className="space-y-2 pt-2 border-t border-[#2e2e33]">
              <div className="flex items-center justify-between">
                <span className="font-['Space_Grotesk'] text-sm font-semibold text-[#f4f4f5] flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#f59e0b]" />
                  Término de la Carne
                </span>
                <span className="text-[11px] font-['JetBrains_Mono'] text-[#fabc4d]">Requerido</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {MEAT_COOK_POINTS.map((pt) => {
                  const isSelected = selectedMeatPoint === pt.id;
                  return (
                    <button
                      key={pt.id}
                      type="button"
                      onClick={() => setSelectedMeatPoint(pt.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-[#222226] border-[#f59e0b] text-[#f4f4f5] shadow-sm'
                          : 'bg-[#1b1b1d] border-[#2e2e33] text-[#a1a1aa] hover:border-[#3f3f46]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold">
                          {pt.name}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#f59e0b]" />}
                      </div>
                      <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#71717a] block mt-0.5 line-clamp-1">
                        {pt.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sides Selection */}
          {dish.sidesOptions && dish.sidesOptions.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#2e2e33]">
              <div className="flex items-center justify-between">
                <span className="font-['Space_Grotesk'] text-sm font-semibold text-[#f4f4f5]">
                  Elige tu Acompañamiento
                </span>
                <span className="text-[11px] font-['JetBrains_Mono'] text-[#a1a1aa]">1 incluido</span>
              </div>
              <div className="space-y-1.5">
                {dish.sidesOptions.map((side) => {
                  const isSelected = selectedSide === side.name;
                  return (
                    <label
                      key={side.id}
                      onClick={() => setSelectedSide(side.name)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#222226] border-[#f59e0b] text-[#f4f4f5]'
                          : 'bg-[#1b1b1d] border-[#2e2e33] text-[#a1a1aa] hover:border-[#3f3f46]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="side"
                          checked={isSelected}
                          onChange={() => setSelectedSide(side.name)}
                          className="accent-[#f59e0b]"
                        />
                        <span className="font-['Plus_Jakarta_Sans'] text-xs font-medium">
                          {side.name}
                        </span>
                      </div>
                      <span className="font-['JetBrains_Mono'] text-xs font-medium text-[#f59e0b]">
                        {side.price > 0 ? `+${formatPrice(side.price)}` : 'Gratis'}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extra Dips / Sauces */}
          {dish.extraDipsOptions && dish.extraDipsOptions.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#2e2e33]">
              <span className="font-['Space_Grotesk'] text-sm font-semibold text-[#f4f4f5] block">
                Salsas & Dips Extra (Opcional)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {dish.extraDipsOptions.map((dip) => {
                  const isChecked = selectedDips.includes(dip.name);
                  return (
                    <label
                      key={dip.id}
                      onClick={() => toggleDip(dip.name)}
                      className={`flex items-center justify-between p-2 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#222226] border-[#f59e0b] text-[#f4f4f5]'
                          : 'bg-[#1b1b1d] border-[#2e2e33] text-[#a1a1aa] hover:border-[#3f3f46]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="accent-[#f59e0b]"
                        />
                        <span className="font-['Plus_Jakarta_Sans'] text-xs">{dip.name}</span>
                      </div>
                      <span className="font-['JetBrains_Mono'] text-[11px] text-[#f59e0b]">
                        +{formatPrice(dip.price)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Kitchen notes */}
          <div className="space-y-1.5 pt-2 border-t border-[#2e2e33]">
            <label className="font-['Plus_Jakarta_Sans'] text-xs font-medium text-[#a1a1aa] block">
              Indicaciones especiales para cocina
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Sin cebolla, aderezo aparte, bien tostado..."
              className="w-full bg-[#131315] border border-[#2e2e33] focus:border-[#f59e0b] rounded-xl p-2.5 font-['Plus_Jakarta_Sans'] text-xs text-[#f4f4f5] placeholder:text-[#52525b] outline-none"
            />
          </div>
        </div>

        {/* Modal Sticky Bottom Controls */}
        <div className="p-4 bg-[#131315] border-t border-[#2e2e33] flex items-center justify-between gap-3 shrink-0">
          {/* Quantity selector */}
          <div className="flex items-center bg-[#222226] border border-[#2e2e33] rounded-full p-1">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#f4f4f5] hover:bg-[#2e2e33] active:scale-95 transition-all"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#f4f4f5] px-3">
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#f4f4f5] hover:bg-[#2e2e33] active:scale-95 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add CTA */}
          <button
            onClick={handleConfirm}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-[#18181b] font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-bold flex items-center justify-between shadow-lg active:scale-98 transition-all"
          >
            <span>Añadir a la Mesa</span>
            <span className="font-['JetBrains_Mono'] font-bold">{formatPrice(totalPrice)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
