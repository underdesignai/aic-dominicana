/**
 * AIC Dominicana — Multi-Language Engine (ES / FR / EN) & Auto-Greeting Virtual Assistant Bot
 * Translates all 18 pages seamlessly and launches the AIC Dominicana Concierge Bot on every page load.
 */

(function () {
  const STORAGE_KEY = 'aic_lang';
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'es';
  if (!['es', 'fr', 'en'].includes(currentLang)) currentLang = 'es';

  // Store original Spanish text nodes and attributes so switching ES <-> FR <-> EN is 100% lossless
  const originalTextMap = new WeakMap();
  const originalAttrMap = new WeakMap();

  /**
   * Complete Dictionary: Spanish (Original) -> { fr: French, en: English }
   */
  const DICTIONARY = {
    // Navbar & Global Actions
    "OFICINA LAS TERRENAS": {
      fr: "BUREAU LAS TERRENAS",
      en: "LAS TERRENAS OFFICE"
    },
    "Inicio": {
      fr: "Accueil",
      en: "Home"
    },
    "Alquileres Vacacionales": {
      fr: "Locations Saisonnières",
      en: "Vacation Rentals"
    },
    "Ventas": {
      fr: "Ventes",
      en: "Sales"
    },
    "Construcción & Conserjería": {
      fr: "Construction & Conciergerie",
      en: "Construction & Concierge"
    },
    "Contacto": {
      fr: "Contact",
      en: "Contact"
    },
    "Llamar": {
      fr: "Appeler",
      en: "Call"
    },
    "Contacto y Ubicación": {
      fr: "Contact et Localisation",
      en: "Contact & Location"
    },
    "WhatsApp Directo": {
      fr: "WhatsApp Direct",
      en: "Direct WhatsApp"
    },

    // Home Hero & Metrics
    "ESPECIALISTAS EN LAS TERRENAS DESDE 2002": {
      fr: "SPÉCIALISTES À LAS TERRENAS DEPUIS 2002",
      en: "SPECIALISTS IN LAS TERRENAS SINCE 2002"
    },
    "Inmobiliaria": {
      fr: "Immobilier",
      en: "Real Estate"
    },
    "en Las Terrenas, Samaná": {
      fr: "à Las Terrenas, Samaná",
      en: "in Las Terrenas, Samaná"
    },
    "Especialistas locales en alquileres vacacionales y ventas inmobiliarias. Catálogo verificado de villas exclusivas, apartamentos y terrenos, con servicios complementarios de construcción y conserjería personalizada.": {
      fr: "Spécialistes locaux en locations saisonnières et ventes immobilières. Catalogue vérifié de villas exclusives, appartements et terrains, avec services complémentaires de construction et conciergerie personnalisée.",
      en: "Local specialists in vacation rentals and real estate sales. Verified catalog of exclusive villas, apartments, and land parcels, with complementary construction and personalized concierge services."
    },
    "Ver Alquileres Vacacionales": {
      fr: "Voir les Locations Saisonnières",
      en: "View Vacation Rentals"
    },
    "Ver Propiedades en Venta": {
      fr: "Voir les Propriétés à Vendre",
      en: "View Properties for Sale"
    },
    "Llámanos: +1)809-240-6588": {
      fr: "Appelez-nous : +1)809-240-6588",
      en: "Call Us: +1)809-240-6588"
    },
    "¿Por qué elegir AIC Dominicana?": {
      fr: "Pourquoi choisir AIC Dominicana ?",
      en: "Why choose AIC Dominicana?"
    },
    "Ocupación Vacacional": {
      fr: "Occupation Saisonnière",
      en: "Vacation Occupancy"
    },
    "Soporte & Conserjería": {
      fr: "Assistance & Conciergerie",
      en: "Support & Concierge"
    },
    "Años de Trayectoria": {
      fr: "Années d'Expérience",
      en: "Years of Experience"
    },

    // Service Pillars
    "SOLUCIONES INTEGRALES": {
      fr: "SOLUTIONS INTÉGRALES",
      en: "COMPREHENSIVE SOLUTIONS"
    },
    "Nuestros Tres Pilares en Las Terrenas": {
      fr: "Nos Trois Piliers à Las Terrenas",
      en: "Our Three Pillars in Las Terrenas"
    },
    "Cubrimos cada faceta de tu proyecto en República Dominicana con atención experta y transparente.": {
      fr: "Nous couvrons chaque facette de votre projet en République Dominicaine avec une attention experte et transparente.",
      en: "We cover every facet of your project in the Dominican Republic with expert and transparent care."
    },
    "Selección verificada de villas y apartamentos frente a las mejores playas. Fotos reales, descripciones prácticas y soporte en el destino.": {
      fr: "Sélection vérifiée de villas et appartements face aux plus belles plages. Photos réelles, descriptions pratiques et assistance sur place.",
      en: "Verified selection of villas and apartments facing the best beaches. Real photos, practical descriptions, and on-site destination support."
    },
    "Ver alquileres": {
      fr: "Voir les locations",
      en: "View rentals"
    },
    "Ventas & Asesoría Legal": {
      fr: "Ventes & Conseil Juridique",
      en: "Sales & Legal Advisory"
    },
    "Villas de lujo, apartamentos con piscina, parcelas con vista al mar y traspasos de negocios con título deslindado y máxima seguridad jurídica.": {
      fr: "Villas de luxe, appartements avec piscine, terrains vue mer et fonds de commerce avec titre borné (Deslinde) et sécurité juridique maximale.",
      en: "Luxury villas, pool apartments, ocean-view lots, and business transfers with clear surveyed titles (Deslinde) and maximum legal security."
    },
    "Explorar ventas": {
      fr: "Explorer les ventes",
      en: "Explore sales"
    },
    "Construcción & Conserje": {
      fr: "Construction & Conciergerie",
      en: "Construction & Concierge"
    },
    "Diseño y construcción a medida de tu villa caribeña. Servicio integral de conserje VIP: traslados, chef, alquiler de quads y gestión de llaves.": {
      fr: "Conception et construction sur mesure de votre villa caribéenne. Service complet de conciergerie VIP : transferts, chef privé, location de quads et gestion des clés.",
      en: "Custom design and construction of your Caribbean villa. Full VIP concierge service: airport transfers, private chef, quad rentals, and key management."
    },
    "Solicitar información": {
      fr: "Demander des informations",
      en: "Request information"
    },

    // Showcase & About Sections
    "NUESTRAS PROPIEDADES EN SAMANÁ": {
      fr: "NOS PROPRIÉTÉS À SAMANÁ",
      en: "OUR PROPERTIES IN SAMANÁ"
    },
    "Hogares de Calidad, Vida Excepcional en el Caribe": {
      fr: "Des Demeures d'Exception, une Vie Unique aux Caraïbes",
      en: "Quality Homes, Exceptional Living in the Caribbean"
    },
    "Desde modernos apartamentos frente a la playa hasta exclusivas villas familiares en las colinas verdes de Las Terrenas. Propiedades rigurosamente verificadas en los sectores más privilegiados: Playa Bonita, Las Ballenas, Cosón y Portillo.": {
      fr: "Des appartements modernes en bord de mer aux villas familiales exclusives sur les collines verdoyantes de Las Terrenas. Propriétés rigoureusement vérifiées dans les secteurs les plus prisés : Playa Bonita, Las Ballenas, Cosón et Portillo.",
      en: "From modern beachfront apartments to exclusive family villas in the lush hills of Las Terrenas. Rigorously verified properties in the most privileged areas: Playa Bonita, Las Ballenas, Cosón, and Portillo."
    },
    "Propiedades meticulosamente mantenidas y con títulos en regla": {
      fr: "Propriétés méticuleusement entretenues avec titres de propriété en règle",
      en: "Meticulously maintained properties with clear legal titles"
    },
    "Ubicaciones turísticas y residenciales de alta plusvalía y retorno": {
      fr: "Emplacements touristiques et résidentiels à forte plus-value et rendement",
      en: "Tourist and residential locations with high capital appreciation and ROI"
    },
    "Comunidades privadas con seguridad 24h y acceso directo a la playa": {
      fr: "Résidences privées avec sécurité 24h/24 et accès direct à la plage",
      en: "Private gated communities with 24h security and direct beach access"
    },
    "Equipo local bilingüe de asistencia inmobiliaria y conserjería": {
      fr: "Équipe locale multilingue d'assistance immobilière et de conciergerie",
      en: "Multilingual local team for real estate assistance and concierge"
    },
    "Ver Catálogo de Ventas": {
      fr: "Voir le Catalogue des Ventes",
      en: "View Sales Catalog"
    },
    "Proyecto Exclusivo": {
      fr: "Projet Exclusif",
      en: "Exclusive Project"
    },
    "SOBRE AIC DOMINICANA": {
      fr: "À PROPOS D'AIC DOMINICANA",
      en: "ABOUT AIC DOMINICANA"
    },
    "Tu Socio Confiable en": {
      fr: "Votre Partenaire de Confiance à",
      en: "Your Trusted Partner in"
    },
    "Fundada en junio de 2002, AIC Dominicana se ha consolidado como la agencia de referencia en el mercado inmobiliario de la Península de Samaná. Acompañamos a compradores, inquilinos y propietarios con honestidad, conocimiento técnico de la zona y un servicio de conserjería integral.": {
      fr: "Fondée en juin 2002, AIC Dominicana s'est imposée comme l'agence de référence sur le marché immobilier de la péninsule de Samaná. Nous accompagnons acheteurs, locataires et propriétaires avec honnêteté, expertise locale et un service de conciergerie complet.",
      en: "Founded in June 2002, AIC Dominicana has established itself as the benchmark real estate agency on the Samaná Peninsula. We guide buyers, guests, and property owners with honesty, technical local expertise, and full-service concierge care."
    },
    "¿Eres propietario?": {
      fr: "Vous êtes propriétaire ?",
      en: "Are you a property owner?"
    },
    "Gestionamos tu inmueble con máxima rentabilidad vacacional, cuidado integral de mantenimiento y rendición mensual de cuentas.": {
      fr: "Nous gérons votre bien avec une rentabilité locative optimale, un entretien complet et des rapports comptables mensuels.",
      en: "We manage your property for maximum vacation rental return, comprehensive maintenance care, and monthly accounting reports."
    },
    "Gestionamos tu Inmueble": {
      fr: "Confier mon Bien",
      en: "Manage My Property"
    },
    "Conoce a nuestro equipo": {
      fr: "Découvrir notre équipe",
      en: "Meet our team"
    },

    // Featured Catalog & Filters
    "CATÁLOGO DESTACADO": {
      fr: "CATALOGUE EN VEDETTE",
      en: "FEATURED CATALOG"
    },
    "Propiedades Seleccionadas en": {
      fr: "Propriétés Sélectionnées à",
      en: "Selected Properties in"
    },
    "Todos": {
      fr: "Tous",
      en: "All"
    },
    "Villas": {
      fr: "Villas",
      en: "Villas"
    },
    "Apartamentos": {
      fr: "Appartements",
      en: "Apartments"
    },
    "Parcelas / Terrenos": {
      fr: "Terrains / Parcelles",
      en: "Land / Lots"
    },
    "Negocios": {
      fr: "Commerces",
      en: "Businesses"
    },
    "En Venta": {
      fr: "À Vendre",
      en: "For Sale"
    },
    "Vacacional": {
      fr: "Location",
      en: "Vacation Rental"
    },
    "Oportunidad": {
      fr: "Opportunité",
      en: "Opportunity"
    },
    "Deslindado": {
      fr: "Titre Borné",
      en: "Titled"
    },
    "Agua/Luz": {
      fr: "Eau/Élec.",
      en: "Water/Power"
    },
    "¿Eres Propietario en Las Terrenas o Samaná?": {
      fr: "Êtes-vous Propriétaire à Las Terrenas ou Samaná ?",
      en: "Are You a Property Owner in Las Terrenas or Samaná?"
    },
    "Gestionamos el alquiler de tu propiedad y optimizamos tus ingresos con total transparencia.": {
      fr: "Nous gérons la location de votre propriété et optimisons vos revenus en toute transparence.",
      en: "We manage your property rental and optimize your income with complete transparency."
    },
    "Gestionar mi Inmueble": {
      fr: "Gérer mon Bien",
      en: "Manage My Property"
    },

    // Subpages: Construction, Rentals, Sales, Contact
    "ARQUITECTURA & OBRAS": {
      fr: "ARCHITECTURE & CONSTRUCTION",
      en: "ARCHITECTURE & CONSTRUCTION"
    },
    "Construcción de Villas a Medida en": {
      fr: "Construction de Villas sur Mesure à",
      en: "Custom Villa Construction in"
    },
    "Hacemos realidad tu residencia soñada en el Caribe. Desde la búsqueda de la parcela ideal y el diseño arquitectónico tropical hasta la entrega llave en mano con acabados de primera calidad.": {
      fr: "Nous réalisons la résidence de vos rêves aux Caraïbes. De la recherche du terrain idéal et la conception architecturale tropicale jusqu'à la livraison clé en main avec des finitions haut de gamme.",
      en: "We bring your dream Caribbean residence to life. From finding the ideal land parcel and tropical architectural design to turnkey delivery with first-class finishes."
    },
    "Solicitar Asesoría de Construcción": {
      fr: "Demander un Conseil en Construction",
      en: "Request Construction Consultation"
    },
    "1. Diseño & Planos": {
      fr: "1. Conception & Plans",
      en: "1. Design & Blueprints"
    },
    "Concepción bioclimática adaptada a la brisa marina, orientación solar y vistas de Samaná.": {
      fr: "Conception bioclimatique adaptée à la brise marine, à l'orientation solaire et aux vues de Samaná.",
      en: "Bioclimatic design adapted to ocean breezes, solar orientation, and Samaná views."
    },
    "2. Permisos & Legalidad": {
      fr: "2. Permis & Légalité",
      en: "2. Permits & Legalities"
    },
    "Gestión completa de permisos medioambientales, municipales y deslinde registral seguro.": {
      fr: "Gestion complète des permis environnementaux, municipaux et bornage cadastral sécurisé.",
      en: "Full management of environmental and municipal permits and secure title registration."
    },
    "3. Llave en Mano": {
      fr: "3. Clé en Main",
      en: "3. Turnkey Delivery"
    },
    "Supervisión técnica permanente, informes fotográficos quincenales y garantía post-entrega.": {
      fr: "Supervision technique permanente, rapports photographiques bimensuels et garantie après livraison.",
      en: "Permanent technical supervision, bi-weekly photo reports, and post-delivery warranty."
    },
    "Villas y Apartamentos en Alquiler —": {
      fr: "Villas et Appartements à Louer —",
      en: "Villas & Apartments for Rent —"
    },
    "Selección verificada de inmuebles para corta y media estancia. Fotos 100% reales, asistencia personalizada en destino y la máxima garantía de confort a pasos de las playas más hermosas de Samaná.": {
      fr: "Sélection vérifiée de propriétés pour court et moyen séjour. Photos 100% réelles, assistance personnalisée sur place et garantie maximale de confort à deux pas des plus belles plages de Samaná.",
      en: "Verified selection of properties for short and medium stays. 100% real photos, personalized on-site assistance, and maximum comfort steps away from Samaná's most beautiful beaches."
    },
    "Entrada (Check-in)": {
      fr: "Arrivée (Check-in)",
      en: "Check-in Date"
    },
    "Salida (Check-out)": {
      fr: "Départ (Check-out)",
      en: "Check-out Date"
    },
    "Huéspedes": {
      fr: "Voyageurs",
      en: "Guests"
    },
    "Tipo de Propiedad": {
      fr: "Type de Propriété",
      en: "Property Type"
    },
    "Todas las opciones": {
      fr: "Toutes les options",
      en: "All options"
    },
    "Villa con Piscina": {
      fr: "Villa avec Piscine",
      en: "Villa with Pool"
    },
    "Apartamento frente a playa": {
      fr: "Appartement front de mer",
      en: "Beachfront Apartment"
    },
    "Casa en la Colina": {
      fr: "Villa sur la Colline",
      en: "Hillside Villa"
    },
    "Consultar": {
      fr: "Rechercher",
      en: "Search"
    },
    "Catálogo de Alquileres Verificados": {
      fr: "Catalogue de Locations Vérifiées",
      en: "Verified Rental Catalog"
    },
    "Disponibilidad en tiempo real para estancias vacacionales en Las Terrenas": {
      fr: "Disponibilité en temps réel pour séjours de vacances à Las Terrenas",
      en: "Real-time availability for vacation stays in Las Terrenas"
    },
    "Consultar Disponibilidad": {
      fr: "Vérifier la Disponibilité",
      en: "Check Availability"
    },
    "SERVICIO DE CONSERJERÍA AIC": {
      fr: "SERVICE DE CONCIERGERIE AIC",
      en: "AIC CONCIERGE SERVICE"
    },
    "Tu Estancia Completa Sin Preocupaciones": {
      fr: "Votre Séjour Complet Sans Souci",
      en: "Your Complete Worry-Free Stay"
    },
    "Traslados Aeropuerto": {
      fr: "Transferts Aéroport",
      en: "Airport Transfers"
    },
    "Chef & Cocinera Privada": {
      fr: "Chef & Cuisinière Privée",
      en: "Private Chef & Cook"
    },
    "Excursiones en Samaná": {
      fr: "Excursions à Samaná",
      en: "Excursions in Samaná"
    },
    "Villa de Lujo en Venta": {
      fr: "Villa de Luxe à Vendre",
      en: "Luxury Villa for Sale"
    },
    "Título Deslindado": {
      fr: "Titre Borné (Deslinde)",
      en: "Clear Surveyed Title"
    },
    "Precio de Venta": {
      fr: "Prix de Vente",
      en: "Sale Price"
    },
    "Agendar Visita a la Propiedad": {
      fr: "Planifier une Visite",
      en: "Schedule a Property Viewing"
    },
    "Confirmar Solicitud de Visita": {
      fr: "Confirmer la Demande de Visite",
      en: "Confirm Viewing Request"
    },
    "Consultar por WhatsApp": {
      fr: "Consulter par WhatsApp",
      en: "Inquire via WhatsApp"
    },
    "Contacta con": {
      fr: "Contactez",
      en: "Contact"
    },
    "Un equipo de profesionales de los bienes inmuebles en la República Dominicana. Estamos aquí para responder tus consultas sobre alquileres vacacionales, compra de villas, parcelas o gestión para propietarios.": {
      fr: "Une équipe de professionnels de l'immobilier en République Dominicaine. Nous sommes là pour répondre à vos questions sur les locations de vacances, l'achat de villas, de terrains ou la gestion locative.",
      en: "A team of real estate professionals in the Dominican Republic. We are here to answer your questions about vacation rentals, buying villas, land lots, or property management."
    },
    "Envíanos tu Consulta": {
      fr: "Envoyez-nous votre Demande",
      en: "Send Us Your Inquiry"
    },
    "Completa el formulario y te responderemos en un plazo máximo de 24 horas laborables.": {
      fr: "Remplissez le formulaire et nous vous répondrons dans un délai maximum de 24 heures ouvrables.",
      en: "Fill out the form and we will reply within 24 business hours."
    },
    "Nombre y Apellidos *": {
      fr: "Nom et Prénom *",
      en: "Full Name *"
    },
    "Correo Electrónico *": {
      fr: "Adresse E-mail *",
      en: "Email Address *"
    },
    "Teléfono / WhatsApp *": {
      fr: "Téléphone / WhatsApp *",
      en: "Phone / WhatsApp *"
    },
    "Motivo de Consulta *": {
      fr: "Objet de la Demande *",
      en: "Reason for Inquiry *"
    },
    "Tu Mensaje *": {
      fr: "Votre Message *",
      en: "Your Message *"
    },
    "Enviar Consulta": {
      fr: "Envoyer la Demande",
      en: "Send Inquiry"
    },
    "NUESTRA OFICINA PRINCIPAL": {
      fr: "NOTRE AGENCE PRINCIPALE",
      en: "OUR MAIN OFFICE"
    },
    "Atención en Español, Francés e Inglés": {
      fr: "Service en Français, Espagnol et Anglais",
      en: "Assistance in English, French, and Spanish"
    },
    "Horario de Atención": {
      fr: "Horaires d'Ouverture",
      en: "Opening Hours"
    },
    "Abrir en Google Maps": {
      fr: "Ouvrir dans Google Maps",
      en: "Open in Google Maps"
    },

    // Footer
    "Inmobiliaria establecida en Las Terrenas desde 2002. Alquileres vacacionales, compraventa de villas exclusivas, gestión y construcción en República Dominicana.": {
      fr: "Agence immobilière établie à Las Terrenas depuis 2002. Locations saisonnières, achat-vente de villas exclusives, gestion et construction en République Dominicaine.",
      en: "Real estate agency established in Las Terrenas since 2002. Vacation rentals, exclusive villa sales, property management, and construction in the Dominican Republic."
    },
    "Navegación": {
      fr: "Navigation",
      en: "Navigation"
    },
    "Venta de Villas": {
      fr: "Vente de Villas",
      en: "Villa Sales"
    },
    "Contacto Directo": {
      fr: "Contact Direct",
      en: "Direct Contact"
    },
    "Zonas en Las Terrenas": {
      fr: "Secteurs à Las Terrenas",
      en: "Areas in Las Terrenas"
    },
    "Lunes a Sábado: 9:00 AM - 6:00 PM": {
      fr: "Lundi au Samedi : 9h00 - 18h00",
      en: "Monday to Saturday: 9:00 AM - 6:00 PM"
    },
    "© 2026 AIC Dominicana Inmobiliaria. Todos los derechos reservados.": {
      fr: "© 2026 AIC Dominicana Immobilier. Tous droits réservés.",
      en: "© 2026 AIC Dominicana Real Estate. All rights reserved."
    },
    "Aviso Legal": {
      fr: "Mentions Légales",
      en: "Legal Notice"
    },
    "Política de Privacidad": {
      fr: "Politique de Confidentialité",
      en: "Privacy Policy"
    },
    "Mapa del Sitio": {
      fr: "Plan du Site",
      en: "Sitemap"
    }
  };

  /**
   * Pattern / Substring rules for dynamic badges, rooms, prices, etc.
   */
  function translateDynamicText(text, lang) {
    if (lang === 'es') return text;
    let out = text;

    if (lang === 'fr') {
      out = out
        .replace(/(\d+)\s*Hab\b/g, '$1 Ch.')
        .replace(/(\d+)\s*Baños\b/g, '$1 Sdb')
        .replace(/(\d+)\s*Personas\b/g, '$1 Personnes')
        .replace(/Desde\s+US\$/g, 'Dès US$')
        .replace(/\/\s*noche\b/g, '/ nuit')
        .replace(/Vista Panorámica/g, 'Vue Panoramique')
        .replace(/Vista al Mar/g, 'Vue sur Mer')
        .replace(/Piscina Infinity/g, 'Piscine à Débordement')
        .replace(/Piscina/g, 'Piscine');
    } else if (lang === 'en') {
      out = out
        .replace(/(\d+)\s*Hab\b/g, '$1 Bed')
        .replace(/(\d+)\s*Baños\b/g, '$1 Bath')
        .replace(/(\d+)\s*Personas\b/g, '$1 Guests')
        .replace(/Desde\s+US\$/g, 'From US$')
        .replace(/\/\s*noche\b/g, '/ night')
        .replace(/Vista Panorámica/g, 'Panoramic View')
        .replace(/Vista al Mar/g, 'Ocean View')
        .replace(/Piscina Infinity/g, 'Infinity Pool')
        .replace(/Piscina/g, 'Pool');
    }
    return out;
  }

  /**
   * Apply Language across the entire DOM
   */
  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute('lang', lang);

    // 1. Update Switcher Buttons UI
    document.querySelectorAll('[data-lang-switch]').forEach((btn) => {
      const btnLang = btn.getAttribute('data-lang-switch');
      if (btnLang === lang) {
        btn.className = 'lang-btn px-2.5 py-1 rounded-full transition-all bg-emerald-600 text-white shadow-sm font-bold';
      } else {
        btn.className = 'lang-btn px-2.5 py-1 rounded-full transition-all text-white/75 hover:text-white font-semibold';
      }
    });

    // 2. Walk all text nodes in body (excluding chatbot messages and script/style tags)
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName;
          if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE'].includes(tag)) return NodeFilter.FILTER_REJECT;
          if (parent.closest('#aic-chatbot-widget') || parent.closest('#aic-lang-switcher')) return NodeFilter.FILTER_REJECT;
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      if (!originalTextMap.has(node)) {
        originalTextMap.set(node, node.nodeValue);
      }
      const origRaw = originalTextMap.get(node);
      const trimmed = origRaw.replace(/\s+/g, ' ').trim();

      if (lang === 'es') {
        node.nodeValue = origRaw;
        return;
      }

      if (DICTIONARY[trimmed] && DICTIONARY[trimmed][lang]) {
        // Preserve leading/trailing whitespace
        const leadingSpace = origRaw.match(/^\s*/)[0];
        const trailingSpace = origRaw.match(/\s*$/)[0];
        node.nodeValue = leadingSpace + DICTIONARY[trimmed][lang] + trailingSpace;
      } else {
        node.nodeValue = translateDynamicText(origRaw, lang);
      }
    });

    // 3. Translate placeholders
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach((el) => {
      if (el.closest('#aic-chatbot-widget')) return;
      if (!originalAttrMap.has(el)) {
        originalAttrMap.set(el, el.getAttribute('placeholder'));
      }
      const origPh = originalAttrMap.get(el);
      if (lang === 'es') {
        el.setAttribute('placeholder', origPh);
      } else if (lang === 'fr') {
        el.setAttribute('placeholder', origPh
          .replace('Ej. Juan Pérez', 'Ex. Jean Dupont')
          .replace('tu@email.com', 'votre@email.com')
          .replace('Escribe aquí los detalles...', 'Écrivez ici les détails de votre demande...'));
      } else if (lang === 'en') {
        el.setAttribute('placeholder', origPh
          .replace('Ej. Juan Pérez', 'E.g. John Smith')
          .replace('Escribe aquí los detalles...', 'Write the details of your inquiry here...'));
      }
    });

    // 4. Refresh Chatbot UI language
    updateChatbotLanguage(lang);
  }

  /**
   * ============================================================================
   * AIC DOMINICANA AUTO-GREETING VIRTUAL CONCIERGE BOT
   * ============================================================================
   */
  const BOT_DATA = {
    es: {
      title: "AIC Dominicana",
      subtitle: "Asistente Inmobiliario • En línea",
      placeholder: "Escribe tu consulta aquí...",
      send: "Enviar",
      typing: "AIC está escribiendo...",
      welcome: "¡Hola! Bienvenido a **AIC Dominicana** 🌴.\n\nSomos su agencia inmobiliaria de confianza en **Las Terrenas, Samaná** desde 2002. Especialistas en alquileres vacacionales de lujo, compra-venta de villas, apartamentos, terrenos y construcción a medida.\n\n¿En qué podemos ayudarle hoy?",
      chips: [
        { label: "🏖️ Alquileres Vacacionales", query: "Quiero información sobre alquileres vacacionales" },
        { label: "🏡 Comprar Propiedad", query: "Busco propiedades en venta en Las Terrenas" },
        { label: "🏗️ Construcción a Medida", query: "¿Cómo funciona el servicio de construcción?" },
        { label: "📍 Contacto y Oficina", query: "¿Dónde está su oficina y cuál es su teléfono?" }
      ],
      responses: {
        rental: "Contamos con una selección verificada de **villas privadas con piscina y apartamentos frente al mar** en Playa Bonita, Las Ballenas y el centro de Las Terrenas desde **US$ 140 / noche**, con servicio de conserjería 24/7.\n\n👉 [Ver Alquileres Vacacionales](/alquileres/vacaciones.html)",
        sale: "Disponemos de **villas de lujo, apartamentos y solares con vista al mar** con **Título Deslindado** (plena seguridad jurídica bajo la Ley 108-05).\n\n👉 [Explorar Catálogo de Ventas](/ventas/villa.html)",
        build: "En **AIC Construcción** gestionamos su proyecto **llave en mano** en Las Terrenas: diseño bioclimático tropical, permisos legales, supervisión técnica e informes quincenales.\n\n👉 [Ver Construcción & Conserjería](/construccion.html)",
        contact: "📍 **Oficina AIC Dominicana:** Plaza El Paseo de la Costanera, Av. Juan Pablo Duarte, Las Terrenas, Samaná.\n📞 **Teléfono / WhatsApp:** +1)809-240-6588\n✉️ **Email:** info@aic-dominicana.com\n\n👉 [Ir a la página de Contacto](/las-terrenas-y-ustedes/contacto.html)",
        fallback: "¡Gracias por escribirnos! Un asesor especializado de nuestro equipo en Las Terrenas puede atender su solicitud de inmediato.\n\n📞 **Tel / WhatsApp:** +1)809-240-6588\n👉 [Chatear por WhatsApp Directo](https://wa.me/18092406588)"
      }
    },
    fr: {
      title: "AIC Dominicana",
      subtitle: "Assistant Immobilier • En ligne",
      placeholder: "Écrivez votre message ici...",
      send: "Envoyer",
      typing: "AIC écrit...",
      welcome: "Bonjour ! Bienvenue chez **AIC Dominicana** 🌴.\n\nNous sommes votre agence immobilière de référence à **Las Terrenas, Samaná** depuis 2002. Spécialistes de la location saisonnière de luxe, de l'achat-vente de villas, appartements, terrains titrés et de la construction sur mesure.\n\nComment pouvons-nous vous aider aujourd'hui ?",
      chips: [
        { label: "🏖️ Locations Saisonnières", query: "Je souhaite des informations sur les locations de vacances" },
        { label: "🏡 Acheter un Bien", query: "Je cherche des propriétés à vendre à Las Terrenas" },
        { label: "🏗️ Construction sur Mesure", query: "Comment fonctionne votre service de construction ?" },
        { label: "📍 Contact & Agence", query: "Où se trouve votre agence et quel est votre téléphone ?" }
      ],
      responses: {
        rental: "Nous proposons une sélection vérifiée de **villas privées avec piscine et d'appartements en bord de mer** à Playa Bonita, Las Ballenas et Las Terrenas dès **140 US$ / nuit**, avec conciergerie 24h/24.\n\n👉 [Voir les Locations Saisonnières](/alquileres/vacaciones.html)",
        sale: "Découvrez nos **villas de luxe, appartements et terrains vue mer** avec **Titre Borné (Deslinde)** offrant une sécurité juridique totale (Loi 108-05).\n\n👉 [Explorer le Catalogue des Ventes](/ventas/villa.html)",
        build: "**AIC Construction** réalise votre villa **clé en main** à Las Terrenas : conception bioclimatique, permis, suivi technique permanent et rapports photo bimensuels.\n\n👉 [Voir Construction & Conciergerie](/construccion.html)",
        contact: "📍 **Agence AIC Dominicana :** Plaza El Paseo de la Costanera, Av. Juan Pablo Duarte, Las Terrenas, Samaná.\n📞 **Tél / WhatsApp :** +1)809-240-6588\n✉️ **E-mail :** info@aic-dominicana.com\n\n👉 [Page Contact](/las-terrenas-y-ustedes/contacto.html)",
        fallback: "Merci pour votre message ! Nos conseillers francophones à Las Terrenas sont à votre disposition pour vous accompagner.\n\n📞 **Tél / WhatsApp :** +1)809-240-6588\n👉 [Discuter sur WhatsApp Direct](https://wa.me/18092406588)"
      }
    },
    en: {
      title: "AIC Dominicana",
      subtitle: "Real Estate Assistant • Online",
      placeholder: "Type your question here...",
      send: "Send",
      typing: "AIC is typing...",
      welcome: "Hello! Welcome to **AIC Dominicana** 🌴.\n\nWe are your trusted real estate agency in **Las Terrenas, Samaná** since 2002. Specialists in luxury vacation rentals, buying & selling villas, apartments, titled land lots, and turnkey construction.\n\nHow may we assist you today?",
      chips: [
        { label: "🏖️ Vacation Rentals", query: "I would like information about vacation rentals" },
        { label: "🏡 Buy a Property", query: "I am looking for properties for sale in Las Terrenas" },
        { label: "🏗️ Custom Construction", query: "How does your villa construction service work?" },
        { label: "📍 Office & Contact", query: "Where is your office located and what is your phone number?" }
      ],
      responses: {
        rental: "We offer a verified collection of **private pool villas and beachfront apartments** in Playa Bonita, Las Ballenas, and Las Terrenas starting at **US$ 140 / night**, complete with 24/7 concierge care.\n\n👉 [View Vacation Rentals](/alquileres/vacaciones.html)",
        sale: "Explore our **luxury villas, beachfront condos, and ocean-view land lots** with **Clear Surveyed Titles (Deslinde)** under Law 108-05.\n\n👉 [Explore Sales Catalog](/ventas/villa.html)",
        build: "**AIC Construction** delivers **turnkey custom villas** in Las Terrenas: tropical bioclimatic architecture, permits, full technical supervision, and bi-weekly photo updates.\n\n👉 [View Construction & Concierge](/construccion.html)",
        contact: "📍 **AIC Dominicana Office:** Plaza El Paseo de la Costanera, Av. Juan Pablo Duarte, Las Terrenas, Samaná.\n📞 **Phone / WhatsApp:** +1)809-240-6588\n✉️ **Email:** info@aic-dominicana.com\n\n👉 [Go to Contact Page](/las-terrenas-y-ustedes/contacto.html)",
        fallback: "Thank you for reaching out! Our multilingual specialists in Las Terrenas are ready to assist you.\n\n📞 **Phone / WhatsApp:** +1)809-240-6588\n👉 [Chat on Direct WhatsApp](https://wa.me/18092406588)"
      }
    }
  };

  function formatBotHtml(text) {
    return text
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-emerald-700 font-bold underline hover:text-amber-600 transition-colors">$1</a>')
      .replace(/\n/g, '<br/>');
  }

  function detectIntent(query) {
    const q = query.toLowerCase();
    if (q.match(/alquil|vacaci|rent|locat|noche|nuit|night|estancia|séjour|stay/)) return 'rental';
    if (q.match(/compr|vent|propiedad|villa|apart|terreno|parcel|buy|sale|achete|vendre|invers|invest|precio|price|prix/)) return 'sale';
    if (q.match(/construc|arquitec|obra|build|plan|llave en mano|clé en main|turnkey/)) return 'build';
    if (q.match(/contact|oficina|ubicaci|direcci|tel|whatsapp|donde|où|where|office|bureau|horario|mail/)) return 'contact';
    return 'fallback';
  }

  function injectChatbot() {
    if (document.getElementById('aic-chatbot-widget')) return;

    // Move scroll ring to bottom-left so it doesn't overlap the chatbot on bottom-right
    const ringBtn = document.getElementById('aic-scroll-ring-btn');
    if (ringBtn) {
      ringBtn.style.right = 'auto';
      ringBtn.style.left = '24px';
    }

    const widget = document.createElement('div');
    widget.id = 'aic-chatbot-widget';
    widget.className = 'fixed bottom-5 right-5 z-[95] flex flex-col items-end font-sans';

    const data = BOT_DATA[currentLang];

    widget.innerHTML = `
      <!-- Chat Window (Auto-Opens on Page Load) -->
      <div id="aic-chat-panel" class="w-[340px] sm:w-[375px] rounded-2xl bg-white shadow-2xl border border-neutral-200/90 overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right mb-3" style="max-height: 520px;">
        <!-- Header -->
        <div class="bg-forest-950 text-white px-4 py-3.5 flex items-center justify-between border-b border-forest-800">
          <div class="flex items-center gap-3">
            <div class="relative flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/25 border border-emerald-400/40 text-amber-400 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
              <span class="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-forest-950"></span>
            </div>
            <div>
              <div id="aic-bot-title" class="text-sm font-bold tracking-tight text-white">${data.title}</div>
              <div id="aic-bot-subtitle" class="text-[11px] text-emerald-300 font-medium">${data.subtitle}</div>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <button type="button" id="aic-chat-minimize" aria-label="Minimizar chat" class="h-8 w-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
            </button>
          </div>
        </div>

        <!-- Messages Area -->
        <div id="aic-chat-messages" class="p-4 overflow-y-auto space-y-3 bg-[#f8faf9] flex-1" style="min-height: 250px; max-height: 310px;">
          <!-- Initial Generic Company Greeting -->
          <div class="flex items-start gap-2.5">
            <div class="h-7 w-7 rounded-full bg-forest-900 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">AIC</div>
            <div id="aic-bot-welcome-msg" class="bg-white border border-neutral-200/80 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-xs sm:text-[13px] text-neutral-800 leading-relaxed shadow-sm">
              ${formatBotHtml(data.welcome)}
            </div>
          </div>

          <!-- Quick Action Chips -->
          <div id="aic-bot-chips" class="flex flex-wrap gap-1.5 pt-1 pl-9"></div>
        </div>

        <!-- Input Form -->
        <form id="aic-chat-form" class="p-2.5 bg-white border-t border-neutral-200 flex items-center gap-2">
          <input
            type="text"
            id="aic-chat-input"
            autocomplete="off"
            placeholder="${data.placeholder}"
            class="flex-1 text-xs sm:text-sm rounded-xl border-neutral-300 px-3 py-2 focus:border-forest-600 focus:ring-forest-600/20"
          />
          <button
            type="submit"
            id="aic-chat-submit"
            class="bg-forest-900 hover:bg-forest-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-sm shrink-0"
          >
            <span id="aic-bot-send-label">${data.send}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </form>
      </div>

      <!-- Floating Toggle Bubble -->
      <button
        type="button"
        id="aic-chat-toggle-btn"
        aria-label="Abrir asistente virtual AIC"
        class="group relative flex items-center gap-2.5 bg-forest-950 hover:bg-forest-900 text-white px-4 py-3 rounded-full shadow-2xl border border-emerald-500/30 transition-all hover:scale-105"
      >
        <span class="relative flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f69f00" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span class="text-xs font-bold tracking-wide">Asistente AIC</span>
        <span id="aic-chat-unread-badge" class="hidden -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-amber-500 text-forest-950 text-[11px] font-extrabold items-center justify-center shadow-md">1</span>
      </button>
    `;

    document.body.appendChild(widget);

    renderChips();

    const panel = document.getElementById('aic-chat-panel');
    const minimizeBtn = document.getElementById('aic-chat-minimize');
    const toggleBtn = document.getElementById('aic-chat-toggle-btn');
    const unreadBadge = document.getElementById('aic-chat-unread-badge');
    const chatForm = document.getElementById('aic-chat-form');
    const chatInput = document.getElementById('aic-chat-input');

    // Auto-open ONLY on desktop computers (never auto-open on mobile/tablets)
    const isMobileDevice =
      window.innerWidth < 1024 ||
      window.matchMedia('(max-width: 1023px)').matches ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobileDevice) {
      panel.style.display = 'none';
      if (unreadBadge) {
        unreadBadge.classList.remove('hidden');
        unreadBadge.classList.add('absolute', 'flex');
      }
    } else {
      panel.style.display = 'flex';
    }

    const toggleChat = () => {
      if (panel.style.display === 'none') {
        panel.style.display = 'flex';
        if (unreadBadge) {
          unreadBadge.classList.add('hidden');
          unreadBadge.classList.remove('flex');
        }
        if (!isMobileDevice) chatInput.focus();
      } else {
        panel.style.display = 'none';
      }
    };

    minimizeBtn.addEventListener('click', toggleChat);
    toggleBtn.addEventListener('click', toggleChat);

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      chatInput.value = '';
      handleUserMessage(text);
    });
  }

  function renderChips() {
    const chipsContainer = document.getElementById('aic-bot-chips');
    if (!chipsContainer) return;
    const data = BOT_DATA[currentLang];
    chipsContainer.innerHTML = '';
    data.chips.forEach((chip) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'text-[11px] font-semibold bg-emerald-50 hover:bg-emerald-100 text-forest-900 border border-emerald-200 px-2.5 py-1.5 rounded-full transition-colors text-left shadow-xs';
      btn.textContent = chip.label;
      btn.addEventListener('click', () => handleUserMessage(chip.query, chip.label));
      chipsContainer.appendChild(btn);
    });
  }

  function handleUserMessage(queryText, displayLabel) {
    const messagesBox = document.getElementById('aic-chat-messages');
    if (!messagesBox) return;

    // 1. Append user bubble
    const userBubble = document.createElement('div');
    userBubble.className = 'flex justify-end';
    userBubble.innerHTML = `
      <div class="bg-forest-900 text-white rounded-2xl rounded-tr-sm px-3.5 py-2 text-xs sm:text-[13px] max-w-[82%] shadow-xs">
        ${displayLabel || queryText}
      </div>
    `;
    messagesBox.appendChild(userBubble);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    // 2. Append typing indicator
    const data = BOT_DATA[currentLang];
    const typingEl = document.createElement('div');
    typingEl.className = 'flex items-center gap-2 text-[11px] text-neutral-500 italic pl-2';
    typingEl.textContent = data.typing;
    messagesBox.appendChild(typingEl);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    // 3. Respond after short natural delay
    setTimeout(() => {
      typingEl.remove();
      const intent = detectIntent(queryText);
      const replyRaw = data.responses[intent] || data.responses.fallback;

      const botBubble = document.createElement('div');
      botBubble.className = 'flex items-start gap-2.5';
      botBubble.innerHTML = `
        <div class="h-7 w-7 rounded-full bg-forest-900 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">AIC</div>
        <div class="bg-white border border-neutral-200/80 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-xs sm:text-[13px] text-neutral-800 leading-relaxed shadow-sm">
          ${formatBotHtml(replyRaw)}
        </div>
      `;
      messagesBox.appendChild(botBubble);
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }, 550);
  }

  function updateChatbotLanguage(lang) {
    const data = BOT_DATA[lang] || BOT_DATA.es;
    const titleEl = document.getElementById('aic-bot-title');
    const subEl = document.getElementById('aic-bot-subtitle');
    const welcomeEl = document.getElementById('aic-bot-welcome-msg');
    const inputEl = document.getElementById('aic-chat-input');
    const sendEl = document.getElementById('aic-bot-send-label');

    if (titleEl) titleEl.textContent = data.title;
    if (subEl) subEl.textContent = data.subtitle;
    if (welcomeEl) welcomeEl.innerHTML = formatBotHtml(data.welcome);
    if (inputEl) inputEl.setAttribute('placeholder', data.placeholder);
    if (sendEl) sendEl.textContent = data.send;

    renderChips();
  }

  /**
   * Initialize on DOMContentLoaded
   */
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Bind Language Switcher Buttons
    document.querySelectorAll('[data-lang-switch]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedLang = btn.getAttribute('data-lang-switch');
        applyLanguage(selectedLang);
      });
    });

    // 2. Inject and Auto-Start the AIC Dominicana Chatbot
    injectChatbot();

    // 3. Apply initial language (ES, FR, or EN)
    applyLanguage(currentLang);
  });
})();
