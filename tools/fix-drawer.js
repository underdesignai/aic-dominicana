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

const ANTI_FOUC_CSS = `
    /* Prevent Mobile Drawer FOUC / Flashing on desktop & initial load */
    #mobile-drawer:not(.drawer-open),
    #mobile-backdrop:not(.backdrop-open) {
      display: none !important;
    }
    @media (min-width: 1024px) {
      #mobile-drawer,
      #mobile-backdrop,
      aside[aria-label="Acciones rápidas de contacto"] {
        display: none !important;
      }
    }
`;

allHtmlFiles.forEach(rel => {
  const filePath = path.join(baseDir, rel);
  if (!fs.existsSync(filePath)) {
    console.warn('File not found:', rel);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Calculate relative depth for animations.css
  const depth = (rel.match(/\//g) || []).length;
  let relCssPath = 'css/animations.css';
  if (depth === 1) relCssPath = '../css/animations.css';
  if (depth === 2) relCssPath = '../../css/animations.css';

  content = content.replace(/href=["'](\/|\.\.\/|\.\.\/\.\.\/)?css\/animations\.css["']/g, `href="${relCssPath}"`);

  // 2. Ensure anti-fouc css is inside <style>
  if (!content.includes('#mobile-drawer:not(.drawer-open)')) {
    if (content.includes('</style>')) {
      content = content.replace('</style>', `${ANTI_FOUC_CSS}\n  </style>`);
    } else {
      content = content.replace('</head>', `  <style>\n${ANTI_FOUC_CSS}\n  </style>\n</head>`);
    }
  }

  // 3. Ensure #mobile-drawer has class 'hidden'
  content = content.replace(
    'id="mobile-drawer" class="fixed top-0',
    'id="mobile-drawer" class="hidden fixed top-0'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Patched:', rel);
});

console.log('ALL HTML FILES FIXED.');
