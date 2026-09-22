const fs = require('fs');
const path = require('path');

function ensureDir(p) {
  const full = path.join(__dirname, '..', p);
  if (!fs.existsSync(full)) fs.mkdirSync(full, { recursive: true });
}

function getTemplate(title, subtitle, badge, contentHtml, backUpLevel = 1) {
  const root = backUpLevel === 1 ? '' : backUpLevel === 2 ? '../' : '../../';
  return `<!DOCTYPE html>
<html class="scroll-smooth" lang="es">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>${title} — AIC Dominicana</title>
  <meta name="description" content="${subtitle} en Las Terrenas, Samaná con AIC Dominicana. Llámanos +1 809-240-6588."/>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link href="https://fonts.googleapis.com" rel="preconnect"/>
  <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
  <script src="https://unpkg.com/lucide@latest"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: { sans: ['"Plus Jakarta Sans"', 'sans-serif'] },
          colors: {
            forest: { 950: '#0b1f17', 900: '#122c22', 800: '#1b4332', 700: '#2d6a4f', 600: '#40916c', 500: '#52b788', 100: '#d8f3dc', 50: '#edf9f0' },
            amber: { 500: '#f69f00', 600: '#d98200' }
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; -webkit-font-smoothing: antialiased; }
    .hero-mask { background: linear-gradient(180deg, rgba(8, 22, 17, 0.85) 0%, rgba(8, 22, 17, 0.6) 50%, rgba(8, 22, 17, 0.92) 100%); }
  </style>
</head>
<body class="bg-[#fcfdfc] text-neutral-800 antialiased pb-16 md:pb-0">
  <header class="bg-forest-950 text-white border-b border-forest-900 sticky top-0 z-40">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
      <a class="flex items-center gap-3 group" href="${root}index.html">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white shadow-inner">
          <i class="h-5 w-5 text-amber-500" data-lucide="palmtree"></i>
        </div>
        <div class="leading-tight">
          <span class="block text-lg font-bold text-white">AIC Dominicana</span>
          <span class="block text-[10px] font-medium uppercase text-emerald-300">Las Terrenas, Samaná</span>
        </div>
      </a>
      <ul class="hidden lg:flex items-center gap-7 text-sm font-medium text-white/90">
        <li><a class="transition-colors hover:text-emerald-300" href="${root}index.html">Inicio</a></li>
        <li><a class="transition-colors hover:text-emerald-300" href="${root}alquileres/vacaciones.html">Alquileres Vacacionales</a></li>
        <li><a class="transition-colors hover:text-emerald-300" href="${root}ventas/villa.html">Ventas</a></li>
        <li><a class="transition-colors hover:text-emerald-300" href="${root}construccion.html">Construcción</a></li>
        <li><a class="transition-colors hover:text-emerald-300" href="${root}las-terrenas-y-ustedes/contacto.html">Contacto</a></li>
      </ul>
      <div class="flex items-center gap-4">
        <a class="hidden sm:flex items-center gap-2 text-sm font-semibold text-white/95 hover:text-emerald-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15" href="tel:+18092406588">
          <i class="h-4 w-4 text-emerald-400" data-lucide="phone-call"></i>
          <span>+1)809-240-6588</span>
        </a>
      </div>
    </nav>
  </header>

  <section class="relative bg-forest-900 py-16 text-white overflow-hidden">
    <img alt="AIC Dominicana" class="absolute inset-0 h-full w-full object-cover opacity-25" src="${root}src/playa-punta-bonita-las-terrenas.jpg"/>
    <div class="hero-mask absolute inset-0"></div>
    <div class="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
      <span class="inline-block text-xs font-bold tracking-widest uppercase text-emerald-300 mb-2">${badge}</span>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-white mb-3">${title}</h1>
      <p class="text-base text-neutral-200 max-w-2xl">${subtitle}</p>
    </div>
  </section>

  <main class="py-14 bg-white">
    <div class="mx-auto max-w-7xl px-6 lg:px-10">
      ${contentHtml}
    </div>
  </main>

  <footer class="bg-forest-950 text-neutral-300 pt-12 pb-10 border-t border-forest-900 text-center text-xs text-neutral-500">
    <p>© 2026 AIC Dominicana. Plaza El Paseo de la Costanera, Las Terrenas. Tel: +1)809-240-6588 | info@aic-dominicana.com</p>
  </footer>
  <script src="${root}js/app.js"></script>
</body>
</html>`;
}

const baseDir = path.join(__dirname, '..');

// 1. alquileres/vacaciones/villa.html
ensureDir('alquileres/vacaciones');
fs.writeFileSync(path.join(baseDir, 'alquileres/vacaciones/villa.html'), getTemplate(
  'Villas Vacacionales en Las Terrenas',
  'Catálogo exclusivo de villas con piscina privada frente a Playa Bonita y Playa Las Ballenas.',
  'ALQUILERES VACACIONALES',
  `<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="p-6 rounded-2xl bg-neutral-50 border border-neutral-200">
      <img class="rounded-xl w-full aspect-video object-cover mb-4" src="../../src/casa-mango-las-terrenas.jpg" alt="Casa Mango"/>
      <h3 class="text-xl font-bold text-neutral-900">Casa Mango Tropical</h3>
      <p class="text-xs text-neutral-600 mt-2">Villa de 3 habitaciones con piscina privada y jardín a 200m de Playa Las Ballenas. Desde US$ 220 / noche.</p>
      <a href="../../alquileres/vacaciones.html" class="mt-4 inline-block px-5 py-2 rounded-xl bg-forest-800 text-white text-xs font-bold">Consultar Disponibilidad</a>
    </div>
    <div class="p-6 rounded-2xl bg-neutral-50 border border-neutral-200">
      <img class="rounded-xl w-full aspect-video object-cover mb-4" src="../../src/interieur-villa-kalakala-las-terrenas.jpg" alt="Villa Kalakala"/>
      <h3 class="text-xl font-bold text-neutral-900">Villa Kalakala & Spa</h3>
      <p class="text-xs text-neutral-600 mt-2">Villa de lujo para 8 personas con infinity pool y acabados premium. Desde US$ 380 / noche.</p>
      <a href="../../alquileres/vacaciones.html" class="mt-4 inline-block px-5 py-2 rounded-xl bg-forest-800 text-white text-xs font-bold">Consultar Disponibilidad</a>
    </div>
  </div>`,
  2
));

// 2. alquileres/vacaciones/apartamento.html
fs.writeFileSync(path.join(baseDir, 'alquileres/vacaciones/apartamento.html'), getTemplate(
  'Apartamentos en Alquiler Vacacional',
  'Apartamentos modernos con vista al mar y piscina comunitaria en el centro de Las Terrenas.',
  'ALQUILERES VACACIONALES',
  `<div class="max-w-xl mx-auto p-6 rounded-2xl bg-neutral-50 border border-neutral-200 text-center">
    <img class="rounded-xl w-full aspect-video object-cover mb-4" src="../../src/don-cesar-las-terrenas.jpg" alt="Don Cesar"/>
    <h3 class="text-xl font-bold text-neutral-900">Residencial Don César</h3>
    <p class="text-xs text-neutral-600 mt-2">2 habitaciones, frente al mar con acceso directo al paseo turístico. Desde US$ 140 / noche.</p>
    <a href="../../alquileres/vacaciones.html" class="mt-4 inline-block px-6 py-2.5 rounded-xl bg-forest-800 text-white text-xs font-bold">Ver Todos los Alquileres</a>
  </div>`,
  2
));

// 3. ventas/apartamento.html
ensureDir('ventas');
fs.writeFileSync(path.join(baseDir, 'ventas/apartamento.html'), getTemplate(
  'Apartamentos en Venta — Las Terrenas',
  'Propiedades en primera línea y residenciales cerrados con alta plusvalía en Samaná.',
  'VENTAS INMOBILIARIAS',
  `<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="p-6 rounded-2xl bg-neutral-50 border border-neutral-200">
      <img class="rounded-xl w-full aspect-video object-cover mb-4" src="../src/bonita-village-las-terrenas.jpg" alt="Bonita Village"/>
      <h3 class="text-lg font-bold text-neutral-900">Apartamento en Bonita Village</h3>
      <p class="text-xs text-neutral-600 mt-1">2 habitaciones, 140 m², terraza con vista al canal de agua y piscina. US$ 285,000.</p>
      <a href="../las-terrenas-y-ustedes/contacto.html" class="mt-4 inline-block px-5 py-2 rounded-xl bg-forest-800 text-white text-xs font-bold">Solicitar Información</a>
    </div>
  </div>`,
  1
));

// 4. ventas/parcela.html
fs.writeFileSync(path.join(baseDir, 'ventas/parcela.html'), getTemplate(
  'Parcelas & Terrenos en Venta — Las Terrenas',
  'Solares deslindados con vista al mar y listos para construir en Cosón, Portillo y Loma Bonita.',
  'TERRENOS & PARCELAS',
  `<div class="max-w-2xl mx-auto p-6 rounded-2xl bg-neutral-50 border border-neutral-200">
    <img class="rounded-xl w-full aspect-video object-cover mb-4" src="../src/casabe-night.jpg" alt="Parcela Casabe"/>
    <h3 class="text-xl font-bold text-neutral-900">Parcela Casabé Vista al Mar</h3>
    <p class="text-sm text-neutral-600 mt-2">1,850 m² con vista panorámica abierta a Playa Cosón. Título deslindado y acceso de electricidad y agua.</p>
    <div class="text-2xl font-bold text-forest-800 mt-3">US$ 220,000</div>
    <a href="../las-terrenas-y-ustedes/contacto.html" class="mt-4 inline-block px-6 py-2.5 rounded-xl bg-forest-800 text-white text-xs font-bold">Contactar por esta Parcela</a>
  </div>`,
  1
));

// 5. ventas/proyecto.html
fs.writeFileSync(path.join(baseDir, 'ventas/proyecto.html'), getTemplate(
  'Proyectos Inmobiliarios en Desarrollo',
  'Nuevas promociones residenciales con exención de impuestos CONFOTUR en Las Terrenas.',
  'PROYECTOS & PROMOCIONES',
  `<div class="p-8 rounded-2xl bg-forest-50 border border-emerald-200 text-center max-w-xl mx-auto">
    <i class="h-12 w-12 text-forest-700 mx-auto mb-3" data-lucide="layers"></i>
    <h3 class="text-xl font-bold text-neutral-900">Invierte en Proyectos Sobre Plano</h3>
    <p class="text-xs text-neutral-600 mt-2 leading-relaxed">Consulta nuestro portafolio de proyectos residenciales en preventa con facilidades de pago en cuotas y beneficios fiscales de la ley CONFOTUR (15 años sin impuesto a la propiedad IPI).</p>
    <a href="../las-terrenas-y-ustedes/contacto.html" class="mt-6 inline-block px-6 py-3 rounded-full bg-forest-800 text-white text-xs font-bold">Solicitar Dossier de Proyectos</a>
  </div>`,
  1
));

// 6. Guías locales en las-terrenas-y-ustedes/
ensureDir('las-terrenas-y-ustedes');
const guides = [
  { file: 'las-terrenas.html', title: 'Descubre Las Terrenas', subtitle: 'Guía de estilo de vida, playas cristalinas y encanto cosmopolita en la Península de Samaná.', badge: 'GUÍA LOCAL' },
  { file: 'su-estancia.html', title: 'Organiza Tu Estancia en Las Terrenas', subtitle: 'Información práctica para tus vacaciones: clima, transporte, moneda y consejos de llegada.', badge: 'CONSEJOS DE VIAJE' },
  { file: 'ver-y-hacer.html', title: 'Qué Ver y Hacer en Samaná', subtitle: 'Kitesurf, excursión a la Cascada El Limón, avistamiento de ballenas jorobadas y gastronomía local.', badge: 'ACTIVIDADES & TURISMO' },
  { file: 'hoteles.html', title: 'Hoteles Seleccionados en Las Terrenas', subtitle: 'Nuestra selección de hoteles boutique y resorts recomendados para estancias cortas.', badge: 'ALOJAMIENTO RECOMENDADO' },
  { file: 'servicio-de-conserje.html', title: 'Servicio de Conserjería VIP', subtitle: 'Asistencia integral: chef privado en tu villa, traslados privados, alquiler de embarcaciones y quads.', badge: 'CONSERJERÍA AIC' },
  { file: 'nuestros-socios.html', title: 'Nuestros Socios & Colaboradores', subtitle: 'Red de arquitectos, abogados notarios y empresas de servicios de total confianza en Samaná.', badge: 'ALIANZAS PROFESIONALES' }
];

guides.forEach(g => {
  fs.writeFileSync(path.join(baseDir, 'las-terrenas-y-ustedes', g.file), getTemplate(
    g.title,
    g.subtitle,
    g.badge,
    `<div class="max-w-3xl mx-auto space-y-6">
      <div class="rounded-2xl overflow-hidden shadow-md aspect-video">
        <img class="w-full h-full object-cover" src="../src/playa-punta-bonita-las-terrenas.jpg" alt="${g.title}"/>
      </div>
      <div class="space-y-4 text-sm text-neutral-600 leading-relaxed">
        <p>AIC Dominicana pone a tu disposición más de 20 años de experiencia en Las Terrenas para brindarte el mejor asesoramiento local y hacer de tu experiencia en la República Dominicana un éxito absoluto.</p>
        <p>Si deseas asistencia personalizada para planificar tu visita, reservar una villa o conocer oportunidades de inversión, no dudes en comunicarte directamente con nuestro equipo.</p>
      </div>
      <div class="pt-4">
        <a href="contacto.html" class="inline-flex items-center gap-2 rounded-full bg-forest-800 text-white px-7 py-3 text-xs font-bold hover:bg-forest-700">
          <span>Contactar con AIC Dominicana</span>
          <i class="h-4 w-4" data-lucide="arrow-right"></i>
        </a>
      </div>
    </div>`,
    1
  ));
});

// 7. vivir-en-repdom/index.html
ensureDir('vivir-en-repdom');
fs.writeFileSync(path.join(baseDir, 'vivir-en-repdom/index.html'), getTemplate(
  'Vivir e Instalarse en República Dominicana',
  'Guía completa sobre residencia legal, fiscalidad, inversión inmobiliaria y calidad de vida en el Caribe.',
  'VIVIR EN REPDOM',
  `<div class="max-w-3xl mx-auto space-y-6 text-sm text-neutral-600 leading-relaxed">
    <h2 class="text-xl font-bold text-neutral-900">Por qué elegir Las Terrenas para residir</h2>
    <p>Las Terrenas ofrece un ambiente cosmopolita único donde conviven comunidades dominicanas, francesas, italianas y norteamericanas. Seguridad, excelente infraestructura de salud y educación internacional, y un clima tropical constante todo el año.</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
      <div class="p-5 rounded-xl bg-neutral-50 border border-neutral-200">
        <h4 class="font-bold text-neutral-900 mb-1">Residencia por Inversión</h4>
        <p class="text-xs">Facilidades migratorias para inversores inmobiliarios con exención de impuestos de importación.</p>
      </div>
      <div class="p-5 rounded-xl bg-neutral-50 border border-neutral-200">
        <h4 class="font-bold text-neutral-900 mb-1">Seguridad Jurídica</h4>
        <p class="text-xs">Títulos amparados bajo la Ley de Registro Inmobiliario 108-05 con plenas garantías para compradores extranjeros.</p>
      </div>
    </div>
    <div class="pt-6">
      <a href="../las-terrenas-y-ustedes/contacto.html" class="inline-flex items-center gap-2 rounded-full bg-forest-800 text-white px-7 py-3 text-xs font-bold">
        <span>Consultar con un Asesor</span>
        <i class="h-4 w-4" data-lucide="arrow-right"></i>
      </a>
    </div>
  </div>`,
  1
));

console.log('ALL SITEMAP PAGES GENERATED SUCCESSFULLY');
