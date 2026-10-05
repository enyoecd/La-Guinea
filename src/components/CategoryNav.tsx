import React from 'react';
import { CATEGORIES, CategoryInfo } from '../data/menuData';

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="sticky top-20 z-40 w-full bg-[#18181b]/95 backdrop-blur-md border-b border-[#2e2e33] py-2.5 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
          {CATEGORIES.map((cat: CategoryInfo) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-95 ${
                  isActive
                    ? 'bg-[#f59e0b] text-[#18181b] shadow-[0_2px_10px_rgba(245,158,11,0.3)]'
                    : 'bg-[#222226] text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#2a2a2c] border border-[#2e2e33]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {cat.iconName}
                </span>
                <span className="whitespace-nowrap">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
