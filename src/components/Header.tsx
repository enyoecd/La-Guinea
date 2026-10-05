import React from 'react';
import { Search, Bell, ShoppingBag, QrCode } from 'lucide-react';
import { TableInfo } from '../types/menu';
import { CATEGORIES } from '../data/menuData';

interface HeaderProps {
  currentTable: TableInfo;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenTableModal: () => void;
  onOpenWaiterModal: () => void;
  language: 'ES' | 'EN';
  onToggleLanguage: () => void;
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTable,
  searchQuery,
  onSearchChange,
  cartItemCount,
  onOpenCart,
  onOpenTableModal,
  onOpenWaiterModal,
  language,
  onToggleLanguage,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#131315]/95 backdrop-blur-xl border-b border-[#2e2e33]/80 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
      {/* Top Main Row */}
      <div className="h-16 sm:h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Zone 1: Brand Wordmark & Identity with Logo */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <img
            src="/logo.jpg"
            alt="La Guinea Restaurante & Grill"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-[#f59e0b] shadow-[0_2px_14px_rgba(245,158,11,0.35)] shrink-0"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/favicon.svg';
            }}
          />
          <div className="flex flex-col">
            <span className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold tracking-tight text-[#f4f4f5] leading-tight flex items-center gap-1.5">
              La Guinea
            </span>
            <span className="font-['JetBrains_Mono'] text-[9px] sm:text-[10px] text-[#fabc4d] tracking-widest uppercase font-medium">
              Restaurante & Grill
            </span>
          </div>
        </div>

        {/* Zone 2: Table Switcher & Desktop Search */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-xl justify-end md:justify-center">
          {/* Table Selector Pill Button */}
          <button
            onClick={onOpenTableModal}
            className="flex items-center gap-1.5 sm:gap-2 bg-[#1b1b1d] hover:bg-[#222226] border border-[#2e2e33] px-2.5 sm:px-3 py-1.5 rounded-full transition-all text-left group"
            title="Cambiar mesa o ver código QR"
          >
            <span className="material-symbols-outlined text-[#f59e0b] text-[16px] sm:text-[18px] group-hover:scale-110 transition-transform">
              table_restaurant
            </span>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="font-['JetBrains_Mono'] text-xs text-[#f4f4f5] font-semibold whitespace-nowrap">
                {currentTable.name}
              </span>
              <span className="hidden sm:inline font-['Plus_Jakarta_Sans'] text-[11px] text-[#a1a1aa] whitespace-nowrap">
                • {currentTable.area}
              </span>
            </div>
            <QrCode className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#a1a1aa] ml-0.5 group-hover:text-[#f59e0b] transition-colors" />
          </button>

          {/* Search Input (Desktop) */}
          <div className="hidden md:flex flex-1 items-center bg-[#201f21] border border-[#2e2e33] rounded-full px-3.5 py-1.5 focus-within:border-[#f59e0b] transition-colors">
            <Search className="w-4 h-4 text-[#a1a1aa] mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar plato, corte o ingrediente..."
              className="w-full bg-transparent border-none outline-none font-['Plus_Jakarta_Sans'] text-xs text-[#f4f4f5] placeholder:text-[#71717a]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-[#a1a1aa] hover:text-[#f4f4f5] text-xs px-1"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Zone 3: Actions (Language, Waiter Call, Comanda Cart) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Toggle */}
          <button
            onClick={onToggleLanguage}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#201f21] hover:bg-[#2a2a2c] border border-[#2e2e33] text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors font-['JetBrains_Mono'] text-xs"
            title="Cambiar idioma"
          >
            <span>{language}</span>
          </button>

          {/* Call Waiter Button */}
          <button
            onClick={onOpenWaiterModal}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-[#222226] hover:bg-[#2a2a2c] border border-[#2e2e33] text-[#f4f4f5] font-['Plus_Jakarta_Sans'] text-xs font-medium transition-all flex items-center gap-1.5"
            title="Llamar al camarero"
          >
            <Bell className="w-4 h-4 text-[#fabc4d] animate-pulse" />
            <span className="hidden md:inline">Camarero</span>
          </button>

          {/* Cart / Comanda Trigger Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-[#18181b] font-['Plus_Jakarta_Sans'] text-xs font-bold transition-all shadow-[0_2px_12px_rgba(245,158,11,0.3)] active:scale-95"
            aria-label="Ver comanda"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            <span className="hidden sm:inline font-semibold">Comanda</span>
            <span className="inline-flex items-center justify-center min-w-[18px] sm:min-w-[20px] h-4 sm:h-5 px-1 sm:px-1.5 rounded-full bg-[#18181b] text-[#f59e0b] font-['JetBrains_Mono'] text-[10px] sm:text-[11px] font-bold">
              {cartItemCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Row (Under top bar on mobile) */}
      <div className="md:hidden px-4 pb-2 pt-0.5">
        <div className="flex items-center bg-[#201f21] border border-[#2e2e33] rounded-full px-3 py-1.5 focus-within:border-[#f59e0b]">
          <Search className="w-3.5 h-3.5 text-[#a1a1aa] mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar plato, ingrediente..."
            className="w-full bg-transparent border-none outline-none font-['Plus_Jakarta_Sans'] text-xs text-[#f4f4f5] placeholder:text-[#71717a]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="text-[#a1a1aa] hover:text-[#f4f4f5] text-xs px-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Category Navigation Bar (Always visible directly underneath the search bar) */}
      <div className="w-full bg-[#18181b] border-t border-[#2e2e33]/70 py-2 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-95 ${
                    isActive
                      ? 'bg-[#f59e0b] text-[#18181b] shadow-[0_2px_10px_rgba(245,158,11,0.35)]'
                      : 'bg-[#222226] text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#2a2a2c] border border-[#2e2e33]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {cat.iconName}
                  </span>
                  <span className="whitespace-nowrap">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
