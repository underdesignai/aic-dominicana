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

let allOk = true;

allHtmlFiles.forEach(rel => {
  const filePath = path.join(baseDir, rel);
  if (!fs.existsSync(filePath)) {
    console.error('MISSING FILE:', rel);
    allOk = false;
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const hasCss = content.includes('animations.css');
  const hasJs = content.includes('app.js');
  const hasHeader = content.includes('<!-- BEGIN: Global Sticky Navigation Bar');
  
  if (!hasCss || !hasJs || !hasHeader) {
    console.error(`ISSUE in ${rel}: CSS=${hasCss}, JS=${hasJs}, Header=${hasHeader}`);
    allOk = false;
  } else {
    console.log(`OK: ${rel}`);
  }
});

if (allOk) {
  console.log('\n>>> ALL 18 HTML FILES ARE FULLY INTEGRATED AND VALID! <<<');
} else {
  console.error('\n>>> SOME FILES HAVE ISSUES <<<');
}
