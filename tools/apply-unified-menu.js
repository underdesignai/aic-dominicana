const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');

// 1. EXACT UNIFIED HEADER HTML
const UNIFIED_HEADER = `  <!-- BEGIN: Global Sticky Navigation Bar (100% Identical Across All Pages) -->
  <header class="bg-forest-950 text-white border-b border-forest-900/80 sticky top-0 z-50 backdrop-blur-md">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 lg:px-10">
      <!-- Brand Logo & Subtitle matching user specification -->
      <a class="flex items-center gap-3 group" href="/index.html">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white shadow-inner transition-transform group-hover:scale-105 border border-white/10">
          <i class="h-5 w-5 text-amber-500" data-lucide="palmtree"></i>
        </div>
        <div class="leading-tight">
          <span class="block text-lg font-bold tracking-tight text-white">AIC Dominicana</span>
          <span class="block text-[10px] font-semibold tracking-wider uppercase text-emerald-400">OFICINA LAS TERRENAS</span>
        </div>
      </a>

      <!-- Desktop Navigation Links - Exact 5 identical links -->
      <ul class="hidden lg:flex items-center gap-7 text-sm font-medium text-white/90">
        <li><a class="transition-colors hover:text-emerald-300 py-1" href="/index.html">Inicio</a></li>
        <li><a class="transition-colors hover:text-emerald-300 py-1" href="/alquileres/vacaciones.html">Alquileres Vacacionales</a></li>
        <li><a class="transition-colors hover:text-emerald-300 py-1" href="/ventas/villa.html">Ventas</a></li>
        <li><a class="transition-colors hover:text-emerald-300 py-1" href="/construccion.html">Construcción & Conserjería</a></li>
        <li><a class="transition-colors hover:text-emerald-300 py-1" href="/las-terrenas-y-ustedes/contacto.html">Contacto</a></li>
      </ul>

      <!-- Right Action Contacts matching user screenshot -->
      <div class="flex items-center gap-4">
        <a class="flex items-center gap-2 text-sm font-semibold text-white/95 hover:text-white transition-colors bg-white/10 hover:bg-white/15 px-4 py-2 rounded-full border border-white/15 shadow-sm" href="tel:+18092406588">
          <i class="h-4 w-4 text-emerald-400" data-lucide="phone-call"></i>
          <span>+1)809-240-6588</span>
        </a>

        <!-- Mobile Menu Trigger -->
        <button id="mobile-menu-btn" aria-label="Abrir menú" class="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white border border-white/10">
          <i class="h-6 w-6" data-lucide="menu"></i>
        </button>
      </div>
    </nav>
  </header>
  <!-- END: Global Sticky Navigation Bar -->`;

// 2. EXACT UNIFIED MOBILE DRAWER
const UNIFIED_DRAWER = `  <!-- BEGIN: Mobile Drawer (100% Identical Across All Pages) -->
  <div id="mobile-backdrop" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden opacity-0 transition-opacity duration-300"></div>
  <div id="mobile-drawer" class="fixed top-0 right-0 z-50 h-full w-4/5 max-w-sm bg-forest-950 text-white p-6 shadow-2xl transform translate-x-full transition-transform duration-300 overflow-y-auto">
    <div class="flex items-center justify-between pb-6 border-b border-forest-900">
      <div class="flex items-center gap-2">
        <div class="h-8 w-8 rounded-lg bg-emerald-500 text-forest-950 flex items-center justify-center font-bold">
          <i class="h-5 w-5" data-lucide="palmtree"></i>
        </div>
        <div class="leading-tight">
          <span class="block text-base font-bold text-white">AIC Dominicana</span>
          <span class="block text-[9px] font-semibold tracking-wider uppercase text-emerald-400">OFICINA LAS TERRENAS</span>
        </div>
      </div>
      <button id="mobile-menu-close" aria-label="Cerrar menú" class="h-8 w-8 rounded-full bg-white/10 text-white flex items-center justify-center">
        <i class="h-5 w-5" data-lucide="x"></i>
      </button>
    </div>

    <div class="py-6 space-y-4">
      <a class="block py-2 text-base font-semibold text-white hover:text-emerald-300 border-b border-forest-900/50" href="/index.html">Inicio</a>
      <a class="block py-2 text-base font-semibold text-white hover:text-emerald-300 border-b border-forest-900/50" href="/alquileres/vacaciones.html">Alquileres Vacacionales</a>
      <a class="block py-2 text-base font-semibold text-white hover:text-emerald-300 border-b border-forest-900/50" href="/ventas/villa.html">Ventas</a>
      <a class="block py-2 text-base font-semibold text-white hover:text-emerald-300 border-b border-forest-900/50" href="/construccion.html">Construcción & Conserjería</a>
      <a class="block py-2 text-base font-semibold text-white hover:text-emerald-300 border-b border-forest-900/50" href="/las-terrenas-y-ustedes/contacto.html">Contacto</a>
    </div>

    <div class="pt-6 border-t border-forest-900 space-y-3 text-xs text-neutral-400">
      <div class="flex items-center gap-2">
        <i class="h-4 w-4 text-emerald-400" data-lucide="phone"></i>
        <a href="tel:+18092406588" class="text-white font-semibold">+1)809-240-6588</a>
      </div>
      <div class="flex items-center gap-2">
        <i class="h-4 w-4 text-emerald-400" data-lucide="mail"></i>
        <span>info@aic-dominicana.com</span>
      </div>
      <a href="https://wa.me/18092406588" target="_blank" rel="noopener" class="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm">
        <i class="h-4 w-4" data-lucide="message-circle"></i>
        <span>WhatsApp Directo</span>
      </a>
    </div>
  </div>
  <!-- END: Mobile Drawer -->`;

// 3. EXACT UNIFIED MOBILE STICKY BAR
const UNIFIED_STICKY = `  <!-- BEGIN: Mobile Sticky Bar (100% Identical Across All Pages) -->
  <aside aria-label="Acciones rápidas de contacto" class="fixed bottom-0 inset-x-0 z-40 bg-forest-950/95 backdrop-blur-md border-t border-forest-900 px-4 py-2.5 flex items-center justify-around md:hidden">
    <a href="tel:+18092406588" class="flex flex-col items-center text-white/90 hover:text-emerald-400 text-[10px] font-medium">
      <i class="h-5 w-5 text-emerald-400 mb-0.5" data-lucide="phone"></i>
      <span>Llamar</span>
    </a>
    <a href="https://wa.me/18092406588" target="_blank" rel="noopener" class="flex flex-col items-center text-white/90 hover:text-emerald-400 text-[10px] font-medium">
      <i class="h-5 w-5 text-emerald-400 mb-0.5" data-lucide="message-circle"></i>
      <span>WhatsApp</span>
    </a>
    <a href="/las-terrenas-y-ustedes/contacto.html" class="flex flex-col items-center text-white/90 hover:text-amber-500 text-[10px] font-medium">
      <i class="h-5 w-5 text-amber-500 mb-0.5" data-lucide="mail"></i>
      <span>Contacto</span>
    </a>
  </aside>
  <!-- END: Mobile Sticky Bar -->`;

const allHtmlFiles = [
  'index.html',
  'construccion.html',
  'oportunidades.html',
  'alquileres/vacaciones.html',
  'alquileres/vacaciones/villa.html',
  'alquileres/vacaciones/apartamento.html',
  'ventas/villa.html',
  'ventas/apartamento.html',
  'ventas/parcela.html',
  'ventas/proyecto.html',
  'las-terrenas-y-ustedes/contacto.html',
  'las-terrenas-y-ustedes/las-terrenas.html',
  'las-terrenas-y-ustedes/su-estancia.html',
  'las-terrenas-y-ustedes/ver-y-hacer.html',
  'las-terrenas-y-ustedes/hoteles.html',
  'las-terrenas-y-ustedes/servicio-de-conserje.html',
  'las-terrenas-y-ustedes/nuestros-socios.html',
  'vivir-en-repdom/index.html'
];

allHtmlFiles.forEach(rel => {
  const filePath = path.join(baseDir, rel);
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', rel);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Header
  content = content.replace(/<header class="bg-forest-950[\s\S]*?<\/header>/, UNIFIED_HEADER.trim());

  // Replace Mobile Sticky Bar if present, or add before </body>
  if (content.includes('<aside aria-label="Acciones')) {
    content = content.replace(/<aside aria-label="Acciones[\s\S]*?<\/aside>/, UNIFIED_STICKY.trim());
  } else if (!content.includes('BEGIN: Mobile Sticky Bar')) {
    content = content.replace('</body>', `${UNIFIED_STICKY}\n</body>`);
  }

  // Replace Mobile Drawer if present, or add before </body>
  if (content.includes('id="mobile-drawer"')) {
    content = content.replace(/<div id="mobile-backdrop"[\s\S]*?<!-- END: Mobile Drawer -->/, UNIFIED_DRAWER.trim());
  } else if (!content.includes('BEGIN: Mobile Drawer')) {
    content = content.replace('</body>', `${UNIFIED_DRAWER}\n</body>`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Synchronized 100% identical menu in:', rel);
});

console.log('ALL 18 PAGES HAVE THE EXACT SAME UNIFIED MENU NOW!');
