import React, { useState } from 'react';
import { Plus, Flame, SlidersHorizontal, ImageOff } from 'lucide-react';
import { Dish } from '../types/menu';
import { formatPrice } from '../utils/format';

interface DishCardProps {
  dish: Dish;
  onQuickAdd: (dish: Dish) => void;
  onOpenDetails: (dish: Dish) => void;
}

export const DishCard: React.FC<DishCardProps> = ({
  dish,
  onQuickAdd,
  onOpenDetails,
}) => {
  const [imgError, setImgError] = useState(false);

  // Tag style helper
  const getTagBadge = () => {
    if (!dish.tag) return null;
    let badgeColor = 'text-[#fabc4d]';
    if (dish.tagType === 'spicy') badgeColor = 'text-[#ef4444]';
    if (dish.tagType === 'primary') badgeColor = 'text-[#f59e0b]';

    return (
      <div className={`flex items-center gap-1 font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider font-semibold ${badgeColor}`}>
        {dish.spicyLevel && dish.spicyLevel > 0 ? (
          <Flame className="w-3 h-3 fill-current" />
        ) : null}
        <span>{dish.tag}</span>
      </div>
    );
  };

  const isLarge = dish.category === 'grill' || dish.id === 'volcano-daniels' || dish.id === 'superbowl-stadium-box';

  return (
    <div
      onClick={() => onOpenDetails(dish)}
      className="group bg-[#18181b] hover:bg-[#1f1f23] border border-[#2e2e33] hover:border-[#f59e0b]/50 p-3 sm:p-3.5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
    >
      <div>
        {/* If large card, show top landscape image; if standard, show horizontal preview or 4:3 image */}
        {isLarge ? (
          <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden bg-[#131315] mb-3">
            {!imgError ? (
              <img
                src={dish.image}
                alt={dish.name}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#201f21] text-[#71717a]">
                <ImageOff className="w-8 h-8 mb-1" />
                <span className="text-xs">Foto de cocina</span>
              </div>
            )}
            {dish.tag && (
              <div className="absolute top-2.5 left-2.5 bg-[#131315]/85 backdrop-blur-md px-2 py-0.5 rounded-lg border border-[#2e2e33]">
                {getTagBadge()}
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-3 mb-2">
            <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden bg-[#131315] relative">
              {!imgError ? (
                <img
                  src={dish.image}
                  alt={dish.name}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#201f21] text-[#71717a]">
                  <ImageOff className="w-6 h-6" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              {dish.tag && <div className="mb-0.5">{getTagBadge()}</div>}
              <h3 className="font-['Space_Grotesk'] text-sm sm:text-base font-bold text-[#f4f4f5] leading-snug group-hover:text-[#f59e0b] transition-colors truncate">
                {dish.name}
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#a1a1aa] line-clamp-2 mt-1 leading-relaxed">
                {dish.description}
              </p>
            </div>
          </div>
        )}

        {isLarge && (
          <div>
            <h3 className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#f4f4f5] leading-snug group-hover:text-[#f59e0b] transition-colors">
              {dish.name}
            </h3>
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#a1a1aa] line-clamp-2 mt-1 leading-relaxed">
              {dish.description}
            </p>
          </div>
        )}
      </div>

      {/* Card Footer: Price & Add Actions */}
      <div className="flex items-center justify-between pt-3 mt-1 border-t border-[#2e2e33]/50">
        <div className="flex flex-col">
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#71717a] uppercase tracking-wider">
            Precio mesa
          </span>
          <span className="font-['JetBrains_Mono'] text-sm sm:text-base font-bold text-[#f59e0b] tabular-nums">
            {formatPrice(dish.price)}
          </span>
        </div>

        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          {(dish.hasCustomMeatPoint || (dish.sidesOptions && dish.sidesOptions.length > 0)) && (
            <button
              onClick={() => onOpenDetails(dish)}
              className="px-2.5 py-1.5 rounded-lg bg-[#222226] hover:bg-[#2a2a2c] text-[#a1a1aa] hover:text-[#f4f4f5] border border-[#2e2e33] transition-colors font-['Plus_Jakarta_Sans'] text-xs flex items-center gap-1"
              title="Personalizar acompañamiento o término"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span className="hidden sm:inline">Ajustar</span>
            </button>
          )}

          <button
            onClick={() => onQuickAdd(dish)}
            className="w-8 h-8 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-[#18181b] flex items-center justify-center transition-transform active:scale-90 shadow-md"
            title="Añadir directo a la comanda"
            aria-label={`Añadir ${dish.name}`}
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
