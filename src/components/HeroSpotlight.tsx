import React from 'react';
import { Utensils, Filter, Flame, Plus, Clock } from 'lucide-react';
import { formatPrice } from '../utils/format';

interface HeroSpotlightProps {
  onOpenFilter: () => void;
  onAddFeatured: () => void;
  activeFilterCount: number;
}

export const HeroSpotlight: React.FC<HeroSpotlightProps> = ({
  onOpenFilter,
  onAddFeatured,
  activeFilterCount,
}) => {
  return (
    <section className="relative w-full bg-[#0e0e10] border-b border-[#2e2e33]/80 overflow-hidden pt-4 pb-8 sm:py-10">
      {/* Background ambient warm ember glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f59e0b]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-80 h-80 bg-[#b45309]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Main Hero Story */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181b] border border-[#2e2e33] text-[#f59e0b] shadow-sm">
              <Flame className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
              <span className="font-['JetBrains_Mono'] text-xs font-semibold tracking-wider uppercase">
                Brasas & Fuego Lento · Mesa #4
              </span>
            </div>

            <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4f4f5] tracking-tight leading-[1.15] max-w-2xl text-balance">
              Sabor a leña de roble, cortes prémium y recetas de autor.
            </h1>

            <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base text-[#a1a1aa] max-w-2xl leading-relaxed">
              Pide directamente a cocina desde tu dispositivo móvil. Selecciona tus favoritos, personaliza tus acompañamientos y disfruta de un servicio fluido sin esperas.
            </p>

            {/* Quick Actions & Live Kitchen Status */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#grill"
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#f59e0b] text-[#18181b] font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-bold hover:bg-[#d97706] transition-all shadow-[0_2px_15px_rgba(245,158,11,0.25)] active:scale-95"
              >
                <Utensils className="w-4 h-4" />
                <span>Especialidades Grill</span>
              </a>

              <button
                onClick={onOpenFilter}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#18181b] hover:bg-[#222226] border border-[#2e2e33] text-[#f4f4f5] font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-semibold transition-colors relative"
              >
                <Filter className="w-4 h-4 text-[#f59e0b]" />
                <span>Filtro Alérgenos & Veggie</span>
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#f59e0b] text-[#18181b] font-['JetBrains_Mono'] text-[10px] font-bold flex items-center justify-center ml-1">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18181b]/70 border border-[#2e2e33]/60 text-xs font-['Plus_Jakarta_Sans'] text-[#a1a1aa]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span>Cocina activa (12 - 18 min)</span>
              </div>
            </div>
          </div>

          {/* Mini Bento Featured Special Dish */}
          <div className="lg:col-span-4 bg-[#18181b] border border-[#2e2e33] p-4 rounded-2xl shadow-xl relative group">
            <div className="flex items-center justify-between pb-3">
              <span className="font-['JetBrains_Mono'] text-xs text-[#fabc4d] uppercase tracking-wider font-semibold">
                Corte Insignia del Día
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] px-2 py-0.5 rounded bg-[#f59e0b]/20 text-[#f59e0b] font-medium border border-[#f59e0b]/30">
                Top Selección
              </span>
            </div>

            <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3 bg-[#131315]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYbbGWiJo918Y1URzrVpp6cS_m_32m2DTb3SsNrWVO55hxwKglqxzWZXkTrJ8eyGlI-2_VkUfAxK-gOGsJovRzwLqQFG6akuPYfgwhJE9Qe0w6CSMgy2xn-HPUOlJN2l3JUPHPadO1ZO3K6B5rtjQ91sp7AEPta61OV5T7FSsosY9MRLmiRU0fjWLqzZJmyBm1jMJSp4dYsp0Cek1Hv1_OhlvVtgjf9iqMqj3NdDAtybZ98TDpXkcpEg"
                alt="Baby Back Ribs Full Rack a la leña"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 bg-[#131315]/90 backdrop-blur-md px-2.5 py-0.5 rounded text-[#f59e0b] font-['JetBrains_Mono'] text-[11px] border border-[#2e2e33]">
                Leña de Roble & Naranjo
              </div>
            </div>

            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-['Space_Grotesk'] text-base font-bold text-[#f4f4f5] leading-snug truncate">
                  Baby Back Ribs Full Rack
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#a1a1aa] line-clamp-1 mt-0.5">
                  Las más tiernas costillas ahumadas por 8 horas con salsa BBQ artesanal.
                </p>
              </div>
              <span className="font-['JetBrains_Mono'] text-base font-bold text-[#f59e0b] shrink-0">
                {formatPrice(17990)}
              </span>
            </div>

            <button
              onClick={onAddFeatured}
              className="mt-3.5 w-full py-2 px-4 rounded-xl bg-[#222226] hover:bg-[#f59e0b] hover:text-[#18181b] text-[#f4f4f5] font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-all border border-[#2e2e33] hover:border-[#f59e0b] flex items-center justify-center gap-1.5 active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir a la Mesa</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
