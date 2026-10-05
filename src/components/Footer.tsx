import React from 'react';
import { MapPin, Phone, Mail, Flame, Bell, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenWaiterModal: () => void;
  onOpenFilterModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenWaiterModal,
  onOpenFilterModal,
}) => {
  return (
    <footer className="w-full bg-[#0e0e10] border-t border-[#2e2e33] mt-16 py-12 text-[#a1a1aa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#2e2e33]/70">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/20 flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <span className="font-['Space_Grotesk'] text-xl font-bold text-[#f4f4f5]">
                La Guinea
              </span>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs leading-relaxed text-[#a1a1aa]">
              Cocina a la brasa con identidad, cortes prémium madurados, ahumados lentos con madera de roble y coctelería de autor para sobremesas memorables.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#f59e0b] flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#f59e0b]" />
                Calidad Grill Selecta
              </span>
            </div>
          </div>

          {/* Horarios de Brasas */}
          <div className="space-y-3">
            <h4 className="font-['Space_Grotesk'] text-sm font-bold text-[#f4f4f5]">
              Horarios de Brasas
            </h4>
            <ul className="space-y-2 font-['Plus_Jakarta_Sans'] text-xs">
              <li>
                <span className="text-[#f4f4f5] font-medium">Lun - Jue:</span>{' '}
                13:00 - 16:30 | 20:00 - 23:30
              </li>
              <li>
                <span className="text-[#f4f4f5] font-medium">Vie - Sáb:</span>{' '}
                13:00 - 00:30 (Non-stop Grill)
              </li>
              <li>
                <span className="text-[#f4f4f5] font-medium">Domingos:</span>{' '}
                12:30 - 18:00 (Tardeo & BBQ)
              </li>
            </ul>
          </div>

          {/* Ubicación & Contacto */}
          <div className="space-y-3">
            <h4 className="font-['Space_Grotesk'] text-sm font-bold text-[#f4f4f5]">
              Ubicación & Contacto
            </h4>
            <ul className="space-y-2 font-['Plus_Jakarta_Sans'] text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                <span>Paseo Marítimo & Boulevard Gastronómico 42, Terraza Principal</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#f59e0b] shrink-0" />
                <span>+34 912 345 678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#f59e0b] shrink-0" />
                <span>reservas@laguineagrill.es</span>
              </li>
            </ul>
          </div>

          {/* Servicio Digital */}
          <div className="space-y-3">
            <h4 className="font-['Space_Grotesk'] text-sm font-bold text-[#f4f4f5]">
              Servicio Digital en Mesa
            </h4>
            <p className="font-['Plus_Jakarta_Sans'] text-xs leading-relaxed">
              Estás conectado al terminal de pedido en mesa. Avisa al sumiller o solicita la cuenta con un solo toque.
            </p>
            <div className="pt-1">
              <button
                onClick={onOpenWaiterModal}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#222226] hover:bg-[#2a2a2c] text-[#f4f4f5] font-['Plus_Jakarta_Sans'] text-xs font-semibold border border-[#2e2e33] transition-colors"
              >
                <Bell className="w-4 h-4 text-[#f59e0b]" />
                <span>Llamar al Camarero</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-['Plus_Jakarta_Sans'] text-xs">
          <p>© 2026 La Guinea - Restaurante & Grill. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenFilterModal}
              className="hover:text-[#f4f4f5] transition-colors text-left"
            >
              Carta de Alérgenos
            </button>
            <a href="#terminos" className="hover:text-[#f4f4f5] transition-colors">
              Términos del Servicio
            </a>
            <a href="#privacidad" className="hover:text-[#f4f4f5] transition-colors">
              Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
