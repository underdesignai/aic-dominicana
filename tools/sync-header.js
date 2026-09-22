const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');

function getHeaderHtml(root) {
  return `<!-- BEGIN: Global Sticky Navigation Bar (Identical across all pages) -->
  <header class="bg-forest-950 text-white border-b border-forest-900/80 sticky top-0 z-50 backdrop-blur-md">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 lg:px-10">
      <!-- Brand Logo & Subtitle matching user specification -->
      <a class="flex items-center gap-3 group" href="${root}index.html">
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
        <li><a class="transition-colors hover:text-emerald-300 py-1" href="${root}index.html">Inicio</a></li>
        <li><a class="transition-colors hover:text-emerald-300 py-1" href="${root}alquileres/vacaciones.html">Alquileres Vacacionales</a></li>
        <li><a class="transition-colors hover:text-emerald-300 py-1" href="${root}ventas/villa.html">Ventas</a></li>
        <li><a class="transition-colors hover:text-emerald-300 py-1" href="${root}construccion.html">Construcción & Conserjería</a></li>
        <li><a class="transition-colors hover:text-emerald-300 py-1" href="${root}las-terrenas-y-ustedes/contacto.html">Contacto</a></li>
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
}

// Update index.html
function updateIndex() {
  const file = path.join(baseDir, 'index.html');
  let content = fs.readFileSync(file, 'utf8');

  const headerHtml = getHeaderHtml('');

  // Replace header and hero separation in index.html
  // Currently: <body ...> <header class="relative min-h-[760px] ..."> ... <nav ...>...</nav> ... <div class="HeroContent"...>
  // We want: <body ...> HEADER_HTML <section class="relative min-h-[740px] lg:min-h-[800px] w-full overflow-hidden text-white"> ... </section>
  
  // Find start of <header class="relative min-h
  const headerStart = content.indexOf('<!-- BEGIN: HeaderAndHero -->');
  const heroContentStart = content.indexOf('<!-- BEGIN: HeroContent -->');
  
  if (headerStart !== -1 && heroContentStart !== -1) {
    // Extract everything from <header ... up to heroContentStart
    const beforeHeader = content.substring(0, headerStart);
    const afterHeroStart = content.substring(heroContentStart);
    
    // In afterHeroStart, find the closing </header> of HeaderAndHero
    const closingHeader = afterHeroStart.indexOf('</header>\n  <!-- END: HeaderAndHero -->');
    if (closingHeader !== -1) {
      const heroBody = afterHeroStart.substring(0, closingHeader);
      const restOfPage = afterHeroStart.substring(closingHeader + '</header>\n  <!-- END: HeaderAndHero -->'.length);

      const newHero = `
  ${headerHtml}

  <!-- BEGIN: HeroSection -->
  <section class="relative min-h-[740px] lg:min-h-[820px] w-full overflow-hidden text-white">
    <img 
      alt="Playa Bonita Las Terrenas Samaná - AIC Dominicana" 
      class="absolute inset-0 h-full w-full object-cover object-center" 
      src="src/playa-punta-bonita-las-terrenas.jpg"
      onerror="this.onerror=null; this.src='https://www.aic-dominicana-inmobiliaria.com/src/playa-punta-bonita-las-terrenas.jpg';"
    />
    <div class="hero-mask absolute inset-0"></div>
    ${heroBody}
  </section>
  <!-- END: HeroSection -->`;

      content = beforeHeader + newHero + restOfPage;
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated index.html with sticky identical header');
    }
  }
}

// Function to update header in any standard page
function updateStandardPage(relPath, root) {
  const file = path.join(baseDir, relPath);
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  const newHeader = getHeaderHtml(root);

  // Replace whatever header is between <body...> and <section class="relative bg-forest-900 ..."> or <div class="bg-neutral-100...
  // Usually matches <header class="bg-forest-950 ...">...</header>
  const headerRegex = /<header class="bg-forest-950[\s\S]*?<\/header>/;
  if (headerRegex.test(content)) {
    content = content.replace(headerRegex, newHeader);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated:', relPath);
  } else {
    console.log('Header pattern not found in:', relPath);
  }
}

// Run updates
updateIndex();

const pagesDepth1 = [
  'alquileres/vacaciones.html',
  'ventas/villa.html',
  'ventas/apartamento.html',
  'ventas/parcela.html',
  'ventas/proyecto.html',
  'construccion.html',
  'oportunidades.html',
  'las-terrenas-y-ustedes/contacto.html',
  'las-terrenas-y-ustedes/las-terrenas.html',
  'las-terrenas-y-ustedes/su-estancia.html',
  'las-terrenas-y-ustedes/ver-y-hacer.html',
  'las-terrenas-y-ustedes/hoteles.html',
  'las-terrenas-y-ustedes/servicio-de-conserje.html',
  'las-terrenas-y-ustedes/nuestros-socios.html',
  'vivir-en-repdom/index.html'
];

pagesDepth1.forEach(p => {
  const isDepth1 = p.includes('/');
  const root = isDepth1 ? '../' : '';
  updateStandardPage(p, root);
});

const pagesDepth2 = [
  'alquileres/vacaciones/villa.html',
  'alquileres/vacaciones/apartamento.html'
];

pagesDepth2.forEach(p => {
  updateStandardPage(p, '../../');
});

console.log('ALL HEADERS SYNCHRONIZED AND FIXED IDENTICALLY');
