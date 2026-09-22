const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');

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

const UNIFIED_HEADER_WITH_LANG = `  <header class="bg-forest-950 text-white border-b border-forest-900/80 sticky top-0 z-50 backdrop-blur-md">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 lg:px-10">
      <!-- Left Group: Hamburger Menu at the Far Left + Brand Logo -->
      <div class="flex items-center gap-2.5 sm:gap-3.5">
        <!-- Hamburger Menu Button (Far Left of Navbar) -->
        <button id="mobile-menu-btn" type="button" aria-label="Abrir menú de navegación" class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 shadow-sm transition-all shrink-0 cursor-pointer">
          <i class="h-5 w-5 text-emerald-400" data-lucide="menu"></i>
        </button>

        <!-- Brand Logo & Subtitle -->
        <a class="flex items-center gap-2.5 sm:gap-3 group" href="/index.html">
          <div class="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-white/10 text-white shadow-inner transition-transform group-hover:scale-105 border border-white/10 shrink-0">
            <i class="h-5 w-5 text-amber-500" data-lucide="palmtree"></i>
          </div>
          <div class="leading-tight">
            <span class="block text-base sm:text-lg font-bold tracking-tight text-white">AIC Dominicana</span>
            <span class="block text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase text-emerald-400">OFICINA LAS TERRENAS</span>
          </div>
        </a>
      </div>

      <!-- Right Action Contacts: Downward Language Dropdown + Phone Icon (Icon only on mobile, full number on desktop) -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Downward Language Selector Dropdown (ES | FR | EN) -->
        <div id="aic-lang-switcher" class="relative" aria-label="Selector de idioma">
          <button
            type="button"
            id="aic-lang-dropdown-btn"
            aria-label="Cambiar idioma"
            class="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/15 rounded-full px-3 py-2 text-xs font-bold text-white shadow-sm backdrop-blur-sm transition-all cursor-pointer"
          >
            <i class="h-3.5 w-3.5 text-emerald-400" data-lucide="globe"></i>
            <span id="aic-lang-current-label">ES</span>
            <svg id="aic-lang-chevron" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-white/80 transition-transform duration-200"><path d="m6 9 6 6 6-6"/></svg>
          </button>

          <!-- Downward Dropdown Panel -->
          <div
            id="aic-lang-dropdown-menu"
            class="hidden absolute right-0 top-full mt-2 w-36 rounded-2xl bg-forest-950/95 backdrop-blur-xl border border-emerald-500/30 shadow-2xl py-1.5 z-[100] overflow-hidden"
          >
            <button type="button" data-lang-switch="es" class="lang-option w-full flex items-center justify-between px-3.5 py-2 text-xs font-bold bg-emerald-600/25 text-emerald-300 transition-colors">
              <span>Español</span>
              <span class="text-[10px] uppercase tracking-wider opacity-80">ES</span>
            </button>
            <button type="button" data-lang-switch="fr" class="lang-option w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors">
              <span>Français</span>
              <span class="text-[10px] uppercase tracking-wider opacity-80">FR</span>
            </button>
            <button type="button" data-lang-switch="en" class="lang-option w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors">
              <span>English</span>
              <span class="text-[10px] uppercase tracking-wider opacity-80">EN</span>
            </button>
          </div>
        </div>

        <!-- Phone Button: Only Icon on Mobile, Icon + Phone Number on Desktop -->
        <a aria-label="Llamar a AIC Dominicana" class="flex items-center justify-center gap-2 text-sm font-semibold text-white/95 hover:text-white transition-colors bg-white/10 hover:bg-white/15 h-9 w-9 lg:h-auto lg:w-auto lg:px-4 lg:py-2 rounded-full border border-white/15 shadow-sm shrink-0" href="tel:+18092406588">
          <i class="h-4 w-4 text-emerald-400" data-lucide="phone-call"></i>
          <span class="hidden lg:inline">+1)809-240-6588</span>
        </a>
      </div>
    </nav>
  </header>`;

const UNIFIED_LEFT_DRAWER = `  <div id="mobile-backdrop" class="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm hidden opacity-0 transition-opacity duration-300"></div>
  <div id="mobile-drawer" class="hidden fixed top-0 left-0 z-[95] h-full w-4/5 max-w-xs bg-forest-950 text-white p-6 shadow-2xl transform -translate-x-full transition-transform duration-300 overflow-y-auto border-r border-forest-800">
    <div class="flex items-center justify-between pb-6 border-b border-forest-900">
      <div class="flex items-center gap-2.5">
        <div class="h-9 w-9 rounded-xl bg-white/10 text-amber-500 flex items-center justify-center border border-white/10">
          <i class="h-5 w-5" data-lucide="palmtree"></i>
        </div>
        <div class="leading-tight">
          <span class="block text-base font-bold text-white">AIC Dominicana</span>
          <span class="block text-[9px] font-semibold tracking-wider uppercase text-emerald-400">OFICINA LAS TERRENAS</span>
        </div>
      </div>
      <button id="mobile-menu-close" type="button" aria-label="Cerrar menú" class="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
        <i class="h-5 w-5" data-lucide="x"></i>
      </button>
    </div>

    <div class="py-6 space-y-2">
      <a class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-white/10 hover:text-emerald-300 transition-colors" href="/index.html">
        <i class="h-4 w-4 text-emerald-400" data-lucide="home"></i>
        <span>Inicio</span>
      </a>
      <a class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-white/10 hover:text-emerald-300 transition-colors" href="/alquileres/vacaciones.html">
        <i class="h-4 w-4 text-emerald-400" data-lucide="sun"></i>
        <span>Alquileres Vacacionales</span>
      </a>
      <a class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-white/10 hover:text-emerald-300 transition-colors" href="/ventas/villa.html">
        <i class="h-4 w-4 text-emerald-400" data-lucide="building-2"></i>
        <span>Ventas</span>
      </a>
      <a class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-white/10 hover:text-emerald-300 transition-colors" href="/construccion.html">
        <i class="h-4 w-4 text-emerald-400" data-lucide="compass"></i>
        <span>Construcción & Conserjería</span>
      </a>
      <a class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-white/10 hover:text-emerald-300 transition-colors" href="/las-terrenas-y-ustedes/contacto.html">
        <i class="h-4 w-4 text-emerald-400" data-lucide="map-pin"></i>
        <span>Contacto</span>
      </a>
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
      <a href="https://wa.me/18092406588" target="_blank" rel="noopener" class="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md transition-colors">
        <i class="h-4 w-4" data-lucide="message-circle"></i>
        <span>WhatsApp Directo</span>
      </a>
    </div>
  </div>`;

allHtmlFiles.forEach(rel => {
  const filePath = path.join(baseDir, rel);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Lock viewport zoom in <head> for native mobile app feel
  content = content.replace(
    /<meta[^>]*name=["']viewport["'][^>]*>/i,
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover"/>'
  );

  // 2. Replace <header class="bg-forest-950 ... </header> with UNIFIED_HEADER_WITH_LANG
  content = content.replace(/<header class="bg-forest-950[\s\S]*?<\/header>/, UNIFIED_HEADER_WITH_LANG);

  // 3. Replace #mobile-backdrop and #mobile-drawer with UNIFIED_LEFT_DRAWER (opening from the LEFT)
  content = content.replace(
    /<div id="mobile-backdrop"[\s\S]*?<\/div>\s*<!-- END: Mobile (Navigation )?Drawer -->/,
    UNIFIED_LEFT_DRAWER + '\n  <!-- END: Mobile Navigation Drawer -->'
  );

  // 4. Fix inline <style> rule so #mobile-drawer can open on desktop too when clicking the left hamburger
  content = content.replace(
    /@media \(min-width: 1024px\) \{\s*#mobile-drawer,\s*#mobile-backdrop,\s*aside\[aria-label="Acciones rápidas de contacto"\] \{\s*display: none !important;\s*\}\s*\}/g,
    `@media (min-width: 1024px) {\n      aside[aria-label="Acciones rápidas de contacto"] {\n        display: none !important;\n      }\n    }`
  );

  // 5. Calculate relative depth for js/i18n-bot.js
  const depth = (rel.match(/\//g) || []).length;
  let prefix = '';
  if (depth === 1) prefix = '../';
  if (depth === 2) prefix = '../../';

  // 6. Bump cache-busters to v=3.9
  content = content.replace(/animations\.css(\?v=[0-9.]+)?/g, 'animations.css?v=3.9');
  content = content.replace(/app\.js(\?v=[0-9.]+)?/g, 'app.js?v=3.9');
  content = content.replace(/i18n-bot\.js(\?v=[0-9.]+)?/g, 'i18n-bot.js?v=3.9');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated mobile-first header, left drawer & zoom lock on:', rel);
});

console.log('ALL 18 PAGES UPDATED SUCCESSFULLY!');
