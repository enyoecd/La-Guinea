import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSpotlight } from './components/HeroSpotlight';
import { CategoryNav } from './components/CategoryNav';
import { DishCard } from './components/DishCard';
import { DishModal } from './components/DishModal';
import { OrderDrawer } from './components/OrderDrawer';
import { MobileFloatingBar } from './components/MobileFloatingBar';
import { FilterModal, FilterOptions } from './components/FilterModal';
import { TableSelectorModal } from './components/TableSelectorModal';
import { WaiterCallModal } from './components/WaiterCallModal';
import { BillModal } from './components/BillModal';
import { ActiveOrderStatusModal } from './components/ActiveOrderStatusModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { DISHES, CATEGORIES, AVAILABLE_TABLES } from './data/menuData';
import { Dish, OrderItem, ActiveOrder, TableInfo } from './types/menu';

export default function App() {
  // State: Table
  const [currentTable, setCurrentTable] = useState<TableInfo>(AVAILABLE_TABLES[0]);

  // State: Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    veggieOnly: false,
    glutenFree: false,
    dairyFree: false,
    noSpicy: false,
  });

  // State: Active Category
  const [activeCategory, setActiveCategory] = useState('appetizers');

  // State: Language
  const [language, setLanguage] = useState<'ES' | 'EN'>('ES');

  // State: Cart / Comanda (Preloaded with the items from design reference)
  const [cartItems, setCartItems] = useState<OrderItem[]>([
    {
      cartId: 'item-1',
      dishId: 'baby-back-ribs-full',
      name: 'Baby Backs Ribs Full Rack',
      price: 17990,
      qty: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdg7usBnv-lPGyveXQkhuhwTuW0lvD5YdL01C2yVmqwVfCWKJQzNKyRxPKZK2gk_hFhRct_gBsx-D_T0HZASPoOSwR35Ca1D2IZtTwoT9uXHW4doXOt9-iiT6YWpIdj_oEuALh6ng6ouRxL2nAdJOYPbct5IWz0ssKBuV8j29v7O8OEodGBtj_9e1fPMih0ok1j_emINHNsCZcBmfBtA8AMVzp4OVJsiKUU-m_D5l_eriNiRAgQXajhg',
      selectedSide: 'Papas Rústicas a las finas hierbas',
    },
    {
      cartId: 'item-2',
      dishId: 'jalapeno-stick',
      name: 'Jalapeño Stick',
      price: 6990,
      qty: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLSoPliTfY9Bp30aGGToS6XaaMSxBIrWFbYtxIHn5fimt91Ep8jdqvoUwQ6MFEkd4cYOJtzkAgUTtVHQ8T7Phwh5z4ix04FrFydk8g5Qz2DLqeYdcTvVUBC33bkZ8cfmmiFckxl6ClEjoEgnFMC8HQ7JriZ3N6k0XxCN3ISNhqjACh_m5BEwT_9sVft0VXuIituiTgcL_Yozi6wVt2tTzMP1JWDsaSAofEmuzp9jjwmQuf7KkJpnVC6Q',
    },
  ]);

  // State: Modals
  const [customizingDish, setCustomizingDish] = useState<Dish | null>(null);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isWaiterModalOpen, setIsWaiterModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>(null);
  const [isOrderStatusModalOpen, setIsOrderStatusModalOpen] = useState(false);

  // State: Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  // Filter count
  const activeFilterCount =
    (filters.veggieOnly ? 1 : 0) +
    (filters.glutenFree ? 1 : 0) +
    (filters.dairyFree ? 1 : 0) +
    (filters.noSpicy ? 1 : 0);

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    return DISHES.filter((dish) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = dish.name.toLowerCase().includes(query);
        const matchesDesc = dish.description.toLowerCase().includes(query);
        const matchesTag = dish.tag?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesTag) return false;
      }

      // Dietary filters
      if (filters.veggieOnly && !dish.isVeggie) return false;
      if (filters.glutenFree && !dish.isGlutenFree) return false;
      if (filters.dairyFree && !dish.isDairyFree) return false;
      if (filters.noSpicy && (dish.spicyLevel ?? 0) > 0) return false;

      return true;
    });
  }, [searchQuery, filters]);

  // Add dish to cart (quick or customized)
  const handleQuickAdd = (dish: Dish) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.dishId === dish.id && !item.selectedMeatPoint && !item.notes);
      if (existing) {
        return prev.map((item) =>
          item.cartId === existing.cartId ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          cartId: `cart-${Date.now()}-${Math.random()}`,
          dishId: dish.id,
          name: dish.name,
          price: dish.price,
          qty: 1,
          image: dish.image,
        },
      ];
    });
    triggerToast(`"${dish.name}" añadido a tu comanda`);
  };

  const handleCustomAddToCart = (customizedItem: {
    dishId: string;
    name: string;
    price: number;
    qty: number;
    image: string;
    selectedMeatPoint?: string;
    selectedSide?: string;
    selectedDips?: string[];
    notes?: string;
  }) => {
    setCartItems((prev) => [
      ...prev,
      {
        cartId: `cart-${Date.now()}-${Math.random()}`,
        ...customizedItem,
      },
    ]);
    triggerToast(`"${customizedItem.name}" añadido con tus preferencias`);
  };

  const handleModifyQty = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as OrderItem[]
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));
    triggerToast('Plato eliminado de la comanda');
  };

  // Send to kitchen action
  const handleSendToKitchen = (generalNotes: string, tipPercent: number) => {
    if (cartItems.length === 0) return;

    const subtotal = cartItems.reduce((acc, it) => acc + it.price * it.qty, 0);
    const tipAmount = Math.round(subtotal * (tipPercent / 100));
    const total = subtotal + tipAmount;

    const newOrder: ActiveOrder = {
      orderNumber: `#G-${Math.floor(100 + Math.random() * 900)}`,
      table: `${currentTable.name} • ${currentTable.area}`,
      timestamp: 'Ahora mismo',
      items: [...cartItems],
      subtotal,
      tipAmount,
      tipPercent,
      total,
      status: 'received',
      statusProgress: 45,
      notes: generalNotes,
    };

    setActiveOrder(newOrder);
    setIsMobileCartOpen(false);
    setIsOrderStatusModalOpen(true);
    triggerToast(`¡Comanda ${newOrder.orderNumber} enviada a cocina!`);
  };

  // Bill request
  const handleConfirmBillRequest = (method: string) => {
    triggerToast(`Solicitud de cuenta registrada (${method}). El camarero viene en camino.`);
  };

  // Total cart calculation
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalCartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalCartPrice = totalCartSubtotal + Math.round(totalCartSubtotal * 0.1);

  // Category navigation scroll handler
  const handleSelectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      const yOffset = -140;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#131315] text-[#e5e1e4] flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-[#f59e0b] selection:text-[#18181b]">
      {/* Toast Notification */}
      <Toast message={toastMessage} />

      {/* Top Header */}
      <Header
        currentTable={currentTable}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsMobileCartOpen(true)}
        onOpenTableModal={() => setIsTableModalOpen(true)}
        onOpenWaiterModal={() => setIsWaiterModalOpen(true)}
        language={language}
        onToggleLanguage={() => setLanguage((l) => (l === 'ES' ? 'EN' : 'ES'))}
      />

      <main className="w-full pt-20 flex-1">
        {/* Active Order Banner if order is being cooked */}
        {activeOrder && (
          <div className="bg-gradient-to-r from-[#b45309] to-[#78350f] text-white px-4 py-2.5 shadow-md flex items-center justify-between max-w-7xl mx-auto rounded-b-xl">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="material-symbols-outlined text-[18px] animate-spin">
                sync
              </span>
              <span>
                <strong>Comanda {activeOrder.orderNumber}</strong> en preparación en las brasas (12-16 min)
              </span>
            </div>
            <button
              onClick={() => setIsOrderStatusModalOpen(true)}
              className="px-3 py-1 rounded-full bg-[#18181b]/80 hover:bg-[#18181b] text-[#f59e0b] font-['JetBrains_Mono'] text-xs font-bold transition-all"
            >
              Ver Estado
            </button>
          </div>
        )}

        {/* Hero Spotlight Banner */}
        <HeroSpotlight
          onOpenFilter={() => setIsFilterModalOpen(true)}
          onAddFeatured={() => {
            const ribs = DISHES.find((d) => d.id === 'baby-back-ribs-full');
            if (ribs) handleQuickAdd(ribs);
          }}
          activeFilterCount={activeFilterCount}
        />

        {/* Sticky Categories Navigation Bar */}
        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Main Content: Dishes Catalog Grid + Sticky Comanda Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Dishes Catalog (Cols 1-8 / 9) */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-12">
              
              {/* Active Filter Notice if any */}
              {activeFilterCount > 0 && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#1b1b1d] border border-[#2e2e33] text-xs">
                  <span className="text-[#a1a1aa]">
                    Filtros activos: {filters.veggieOnly && 'Veggie · '}{filters.glutenFree && 'Sin Gluten · '}{filters.dairyFree && 'Sin Lácteos · '}{filters.noSpicy && 'Sin Picante'}
                  </span>
                  <button
                    onClick={() =>
                      setFilters({
                        veggieOnly: false,
                        glutenFree: false,
                        dairyFree: false,
                        noSpicy: false,
                      })
                    }
                    className="text-[#f59e0b] hover:underline font-semibold"
                  >
                    Quitar filtros
                  </button>
                </div>
              )}

              {/* Render categorized sections */}
              {CATEGORIES.map((category) => {
                const categoryDishes = filteredDishes.filter(
                  (dish) => dish.category === category.id
                );

                if (categoryDishes.length === 0) return null;

                return (
                  <section
                    key={category.id}
                    id={category.id}
                    className="space-y-4 scroll-mt-36"
                  >
                    <div className="flex items-end justify-between border-b border-[#2e2e33]/70 pb-2">
                      <div>
                        <span className="font-['JetBrains_Mono'] text-xs text-[#fabc4d] uppercase tracking-widest font-semibold block">
                          {category.subtitle}
                        </span>
                        <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-[#f4f4f5]">
                          {category.name}
                        </h2>
                      </div>
                      <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#71717a]">
                        {categoryDishes.length} opciones
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {categoryDishes.map((dish) => (
                        <DishCard
                          key={dish.id}
                          dish={dish}
                          onQuickAdd={handleQuickAdd}
                          onOpenDetails={setCustomizingDish}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}

              {filteredDishes.length === 0 && (
                <div className="text-center py-16 bg-[#18181b] border border-[#2e2e33] rounded-2xl p-8 space-y-3">
                  <span className="material-symbols-outlined text-[48px] text-[#71717a]">
                    search_off
                  </span>
                  <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#f4f4f5]">
                    No se encontraron platos
                  </h3>
                  <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#a1a1aa] max-w-sm mx-auto">
                    Prueba cambiando los términos de búsqueda o restableciendo los filtros de alérgenos.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({
                        veggieOnly: false,
                        glutenFree: false,
                        dairyFree: false,
                        noSpicy: false,
                      });
                    }}
                    className="px-4 py-2 rounded-xl bg-[#f59e0b] text-[#18181b] font-bold text-xs"
                  >
                    Restablecer Menú
                  </button>
                </div>
              )}

            </div>

            {/* Desktop Sticky Order Sidebar */}
            <OrderDrawer
              isOpenMobile={isMobileCartOpen}
              onCloseMobile={() => setIsMobileCartOpen(false)}
              items={cartItems}
              tableInfo={{ name: currentTable.name, area: currentTable.area }}
              onModifyQty={handleModifyQty}
              onRemoveItem={handleRemoveItem}
              onSendToKitchen={handleSendToKitchen}
              onRequestBill={() => setIsBillModalOpen(true)}
            />

          </div>
        </div>
      </main>

      {/* Mobile Floating Order Summary Bar */}
      <MobileFloatingBar
        itemCount={totalCartCount}
        totalPrice={totalCartPrice}
        tableName={currentTable.name}
        onOpenCart={() => setIsMobileCartOpen(true)}
      />

      {/* Footer */}
      <Footer
        onOpenWaiterModal={() => setIsWaiterModalOpen(true)}
        onOpenFilterModal={() => setIsFilterModalOpen(true)}
      />

      {/* Modals */}
      <DishModal
        dish={customizingDish}
        onClose={() => setCustomizingDish(null)}
        onAddToCart={handleCustomAddToCart}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        onResetFilters={() =>
          setFilters({
            veggieOnly: false,
            glutenFree: false,
            dairyFree: false,
            noSpicy: false,
          })
        }
        matchCount={filteredDishes.length}
      />

      <TableSelectorModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        currentTable={currentTable}
        onSelectTable={(table) => {
          setCurrentTable(table);
          triggerToast(`Conectado al terminal de ${table.name}`);
        }}
      />

      <WaiterCallModal
        isOpen={isWaiterModalOpen}
        onClose={() => setIsWaiterModalOpen(false)}
        tableName={currentTable.name}
        onTriggerToast={triggerToast}
      />

      <BillModal
        isOpen={isBillModalOpen}
        onClose={() => setIsBillModalOpen(false)}
        tableName={currentTable.name}
        totalAmount={totalCartPrice}
        onConfirmBillRequest={handleConfirmBillRequest}
      />

      <ActiveOrderStatusModal
        order={activeOrder}
        onClose={() => setIsOrderStatusModalOpen(false)}
      />
    </div>
  );
}
