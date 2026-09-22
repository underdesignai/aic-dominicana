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

allHtmlFiles.forEach(rel => {
  const filePath = path.join(baseDir, rel);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/animations\.css(\?v=[0-9.]+)?/g, 'animations.css?v=3.4');
  content = content.replace(/app\.js(\?v=[0-9.]+)?/g, 'app.js?v=3.4');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated v3.4 (no particles) in:', rel);
});
