const fs = require('fs');
const h1 = fs.readFileSync('index.html', 'utf8').match(/<header[\s\S]*?<\/header>/)[0];
const h2 = fs.readFileSync('alquileres/vacaciones.html', 'utf8').match(/<header[\s\S]*?<\/header>/)[0];
const h3 = fs.readFileSync('ventas/villa.html', 'utf8').match(/<header[\s\S]*?<\/header>/)[0];
const h4 = fs.readFileSync('las-terrenas-y-ustedes/contacto.html', 'utf8').match(/<header[\s\S]*?<\/header>/)[0];

console.log('h1 vs h2:', h1 === h2);
console.log('h2 vs h3:', h2 === h3);
console.log('h3 vs h4:', h3 === h4);

console.log('h1:');
console.log(h1);
console.log('---');
console.log('h2:');
console.log(h2);
