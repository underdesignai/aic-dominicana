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
      <ul class="hidden lg:flex items-center gap-6 text-sm font-medium text-white/90">
        <li><a class="transition-colors hover:text-emerald-300 py-1" href="/index.html">Inicio</a></li>
        <li><a class="transition-colors hover:text-emerald-300 py-1" href="/alquileres/vacaciones.html">Alquileres Vacacionales</a></li>
        <li><a class="transition-colors hover:text-emerald-300 py-1" href="/ventas/villa.html">Ventas</a></li>
        <li><a class="transition-colors hover:text-emerald-300 py-1" href="/construccion.html">Construcción & Conserjería</a></li>
        <li><a class="transition-colors hover:text-emerald-300 py-1" href="/las-terrenas-y-ustedes/contacto.html">Contacto</a></li>
      </ul>

      <!-- Right Action Contacts: Language Selector (between Contacto & Phone) + Phone Number -->
      <div class="flex items-center gap-3">
        <!-- Language Selector (ES | FR | EN) -->
        <div id="aic-lang-switcher" class="flex items-center gap-0.5 bg-white/10 border border-white/15 rounded-full p-1 text-xs font-bold shadow-sm backdrop-blur-sm" aria-label="Selector de idioma">
          <button type="button" data-lang-switch="es" class="lang-btn px-2.5 py-1 rounded-full transition-all bg-emerald-600 text-white shadow-sm" title="Español">ES</button>
          <button type="button" data-lang-switch="fr" class="lang-btn px-2.5 py-1 rounded-full transition-all text-white/75 hover:text-white" title="Français">FR</button>
          <button type="button" data-lang-switch="en" class="lang-btn px-2.5 py-1 rounded-full transition-all text-white/75 hover:text-white" title="English">EN</button>
        </div>

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
  </header>`;

allHtmlFiles.forEach(rel => {
  const filePath = path.join(baseDir, rel);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Replace <header class="bg-forest-950 ... </header> with UNIFIED_HEADER_WITH_LANG
  content = content.replace(/<header class="bg-forest-950[\s\S]*?<\/header>/, UNIFIED_HEADER_WITH_LANG);

  // 2. Calculate relative depth for js/i18n-bot.js
  const depth = (rel.match(/\//g) || []).length;
  let prefix = '';
  if (depth === 1) prefix = '../';
  if (depth === 2) prefix = '../../';

  // 3. Bump cache-busters to v=3.5
  content = content.replace(/animations\.css(\?v=[0-9.]+)?/g, 'animations.css?v=3.5');
  content = content.replace(/app\.js(\?v=[0-9.]+)?/g, 'app.js?v=3.5');

  // 4. Inject i18n-bot.js right after app.js if not already present
  if (!content.includes('i18n-bot.js')) {
    content = content.replace(
      /(<script src="[^"]*app\.js\?v=3\.5"><\/script>)/,
      `$1\n  <script src="${prefix}js/i18n-bot.js?v=3.5"></script>`
    );
  } else {
    content = content.replace(/i18n-bot\.js(\?v=[0-9.]+)?/g, 'i18n-bot.js?v=3.5');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Applied Language Switcher & Bot to:', rel);
});

console.log('ALL 18 PAGES UPDATED WITH ES/FR/EN SELECTOR & AUTO-BOT!');
