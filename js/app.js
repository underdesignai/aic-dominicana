/**
 * AIC Dominicana - Main JavaScript Controller
 * Provides interactive features: Lucide icons init, mobile navigation,
 * modal dialogs, image galleries, live filtering and form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Normalize root-relative links if opened via file:// protocol
  normalizeLinksForFileProtocol();

  // 1. Initialize Lucide Icons
  initIcons();

  // 2. Mobile Navigation Drawer
  setupMobileMenu();

  // 3. Modals Management
  setupModals();

  // 4. Interactive Property Filtering
  setupPropertyFilters();

  // 5. Image Gallery Switcher (Property Details)
  setupImageGallery();

  // 6. Form Handlers & Feedback
  setupForms();

  // 7. Light Anti-Spam Captcha
  setupCaptcha();

  // 8. Subtle Motions & Scroll Reveals
  setupSubtleMotions();
});

/**
 * Initialize or refresh Lucide Icons
 */
function initIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

/**
 * Mobile Navigation Menu Handler (Slides from the Left) & Mobile Zoom Lock
 */
function setupMobileMenu() {
  // Block ONLY pinch-to-zoom gestures (never interfere with 1-finger vertical scrolling)
  document.addEventListener('gesturestart', (e) => e.preventDefault());
  document.addEventListener('gesturechange', (e) => e.preventDefault());

  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-backdrop');

  if (!menuBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.remove('hidden');
    drawer.classList.add('drawer-open');
    if (backdrop) {
      backdrop.classList.remove('hidden');
      backdrop.classList.add('backdrop-open');
    }
    setTimeout(() => {
      drawer.classList.remove('-translate-x-full', 'translate-x-full');
      drawer.classList.add('translate-x-0');
      if (backdrop) {
        backdrop.classList.remove('opacity-0');
        backdrop.classList.add('opacity-100');
      }
      document.body.classList.add('overflow-hidden');
    }, 10);
  };

  const closeDrawer = () => {
    drawer.classList.remove('translate-x-0');
    drawer.classList.add('-translate-x-full');
    if (backdrop) {
      backdrop.classList.remove('opacity-100');
      backdrop.classList.add('opacity-0');
    }
    setTimeout(() => {
      drawer.classList.remove('drawer-open');
      drawer.classList.add('hidden');
      if (backdrop) {
        backdrop.classList.remove('backdrop-open');
        backdrop.classList.add('hidden');
      }
      document.body.classList.remove('overflow-hidden');
    }, 300);
  };

  menuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Close with Esc key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('drawer-open')) {
      closeDrawer();
    }
  });

  // Close when clicking nav links
  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });
}

/**
 * Generic Modal System
 */
function setupModals() {
  // Open modal triggers
  document.querySelectorAll('[data-modal-target]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal-target');
      openModal(modalId);
    });
  });

  // Close modal triggers
  document.querySelectorAll('[data-modal-close]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = trigger.closest('.aic-modal');
      if (modal) closeModal(modal.id);
    });
  });

  // Close modal on backdrop click
  document.querySelectorAll('.aic-modal').forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  // Close active modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModals = document.querySelectorAll('.aic-modal:not(.hidden)');
      openModals.forEach((modal) => closeModal(modal.id));
    }
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  setTimeout(() => {
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
      modalContent.classList.remove('scale-95', 'opacity-0');
      modalContent.classList.add('scale-100', 'opacity-100');
    }
    initIcons();
  }, 10);
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  const modalContent = modal.querySelector('.modal-content');
  if (modalContent) {
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
  }
  setTimeout(() => {
    modal.classList.add('hidden');
    // Only remove overflow-hidden if no other modals are open
    if (document.querySelectorAll('.aic-modal:not(.hidden)').length === 0) {
      document.body.classList.remove('overflow-hidden');
    }
  }, 200);
}

// Expose globally for inline onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;

/**
 * Property Category Filter Pills
 */
function setupPropertyFilters() {
  const filterButtons = document.querySelectorAll('[data-filter]');
  const propertyCards = document.querySelectorAll('[data-category]');

  if (filterButtons.length === 0 || propertyCards.length === 0) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Active pill styles
      filterButtons.forEach((b) => {
        b.classList.remove('bg-forest-800', 'text-white');
        b.classList.add('bg-neutral-100', 'hover:bg-neutral-200', 'text-neutral-700');
      });
      btn.classList.add('bg-forest-800', 'text-white');
      btn.classList.remove('bg-neutral-100', 'hover:bg-neutral-200', 'text-neutral-700');

      const filterVal = btn.getAttribute('data-filter');

      propertyCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'todos' || category === filterVal) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease';
            card.style.opacity = '1';
          }, 10);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/**
 * Image Gallery Switcher for Property Details View
 */
function setupImageGallery() {
  const mainImage = document.getElementById('gallery-main-image');
  const thumbs = document.querySelectorAll('[data-thumb-src]');

  if (!mainImage || thumbs.length === 0) return;

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const newSrc = thumb.getAttribute('data-thumb-src');
      const newAlt = thumb.getAttribute('data-thumb-alt') || mainImage.alt;

      // Update main photo with smooth fade
      mainImage.style.opacity = '0.4';
      setTimeout(() => {
        mainImage.src = newSrc;
        mainImage.alt = newAlt;
        mainImage.style.opacity = '1';
      }, 150);

      // Update thumb active state
      thumbs.forEach((t) => {
        t.classList.remove('ring-2', 'ring-forest-600', 'opacity-100');
        t.classList.add('opacity-70', 'hover:opacity-100');
      });
      thumb.classList.add('ring-2', 'ring-forest-600', 'opacity-100');
      thumb.classList.remove('opacity-70');
    });
  });
}

/**
 * Handle form submissions and render success notifications
 */
function setupForms() {
  document.querySelectorAll('form[data-ajax-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Enviar';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="inline-flex items-center gap-2">
            <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Procesando...
          </span>
        `;
      }

      // Simulate API response time
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }

        const successBox = form.querySelector('.form-success-box');
        if (successBox) {
          successBox.classList.remove('hidden');
          form.reset();
          setTimeout(() => {
            successBox.classList.add('hidden');
          }, 6000);
        } else {
          // Trigger floating toast
          showToast('¡Gracias! Hemos recibido tu solicitud. Un asesor de AIC Dominicana te contactará en breve.');
          form.reset();
        }

        // If inside a modal, close after 1.8s
        const parentModal = form.closest('.aic-modal');
        if (parentModal) {
          setTimeout(() => {
            closeModal(parentModal.id);
          }, 1800);
        }
      }, 900);
    });
  });
}

/**
 * Lightweight Anti-Spam Captcha
 */
function setupCaptcha() {
  const captchaQuestion = document.getElementById('captcha-question');
  const captchaAnswer = document.getElementById('captcha-answer');

  if (!captchaQuestion || !captchaAnswer) return;

  const n1 = Math.floor(Math.random() * 6) + 2;
  const n2 = Math.floor(Math.random() * 5) + 1;
  const expectedSum = n1 + n2;

  captchaQuestion.innerText = `¿Cuánto es ${n1} + ${n2}?`;

  const form = captchaAnswer.closest('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      if (parseInt(captchaAnswer.value.trim(), 10) !== expectedSum) {
        e.preventDefault();
        e.stopImmediatePropagation();
        alert('Por favor, responde correctamente la verificación anti-spam.');
        captchaAnswer.focus();
      }
    }, true);
  }
}

/**
 * Simple Toast Notification
 */
function showToast(message) {
  let toast = document.getElementById('aic-global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'aic-global-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 max-w-md bg-forest-900 text-white px-5 py-4 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 transform transition-all duration-300 translate-y-20 opacity-0';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div class="h-8 w-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
      <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <div class="text-xs sm:text-sm font-medium leading-snug">${message}</div>
  `;

  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  }, 50);

  // Animate out
  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 4500);
}

/**
 * Normalizes root-relative links if browsing on file:// protocol
 */
function normalizeLinksForFileProtocol() {
  if (window.location.protocol === 'file:') {
    const pathname = window.location.pathname.replace(/\\/g, '/');
    const folderKeyword = 'AIC Dominicana';
    const idx = pathname.indexOf(folderKeyword);
    if (idx !== -1) {
      const subPath = pathname.substring(idx + folderKeyword.length);
      const segments = subPath.split('/').filter(Boolean);
      // Number of directory levels above the current file
      const depth = Math.max(0, segments.length - 1);
      const prefix = depth > 0 ? '../'.repeat(depth) : './';

      document.querySelectorAll('a[href^="/"]').forEach((link) => {
        const originalHref = link.getAttribute('href');
        link.setAttribute('href', prefix + originalHref.substring(1));
      });
      document.querySelectorAll('img[src^="/"]').forEach((img) => {
        const originalSrc = img.getAttribute('src');
        img.setAttribute('src', prefix + originalSrc.substring(1));
      });
    }
  }
}

/**
 * Setup Professional Luxury Motions:
 * 1. 60fps Interactive Tropical Gold & Emerald Particle System (Scroll-Reactive + Constellation)
 * 2. Continuous Scroll Progress Bar & Interactive SVG Progress Ring + Ambient Orbs
 * 3. GSAP 3 + ScrollTrigger Timelines, Scrubbing Parallax & ScrollTrigger.batch() Reveals
 * 4. Vanilla-Tilt 3D Perspective & Glare on Cards
 * 5. Custom Luxury Cursor Follower & Magnetic CTA Buttons
 */
function setupSubtleMotions() {
  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Add Luxury Sheen class to primary buttons
  const ctaButtons = document.querySelectorAll(`
    a.bg-amber-500,
    button.bg-amber-500,
    a.bg-emerald-600,
    button.bg-emerald-600,
    button[type="submit"],
    a[href*="wa.me"],
    .btn-interactive
  `);
  ctaButtons.forEach((btn) => btn.classList.add('btn-luxury'));

  // 2. Dynamic Navbar Shadow on Scroll
  const navbar = document.querySelector('header');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add('nav-scrolled');
      } else {
        navbar.classList.remove('nav-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  if (prefersReducedMotion) return;

  // 3. Initialize Continuous Scroll Progress Bar, SVG Ring & Ambient Orbs
  initScrollProgressAndOrbs();

  // 4. Initialize GSAP + ScrollTrigger Animations (or fallback if offline)
  initGSAPScrollEngine();

  // 5. Initialize 3D Perspective Tilt & Glare on Property Cards
  init3DTiltCards();

  // 6. Initialize Custom Luxury Cursor & Magnetic Buttons (Desktop)
  initLuxuryCursorAndMagneticButtons();

  // 7. Initialize Animated Stat Counters
  setupStatCounters();
}

/**
 * 1. Continuous Scroll Progress Bar, Interactive Back-to-Top Ring & Ambient Orbs
 */
function initScrollProgressAndOrbs() {
  // Remove any existing particle canvas if present
  const existingCanvas = document.getElementById('aic-particles-canvas');
  if (existingCanvas) existingCanvas.remove();

  // Top Progress Bar
  if (!document.getElementById('aic-scroll-progress')) {
    const progressBar = document.createElement('div');
    progressBar.id = 'aic-scroll-progress';
    document.body.appendChild(progressBar);
  }

  // Ambient Background Orbs that move continuously with scroll
  if (!document.getElementById('aic-orb-emerald')) {
    const orb1 = document.createElement('div');
    orb1.id = 'aic-orb-emerald';
    orb1.className = 'aic-ambient-orb';
    const orb2 = document.createElement('div');
    orb2.id = 'aic-orb-amber';
    orb2.className = 'aic-ambient-orb';
    document.body.appendChild(orb1);
    document.body.appendChild(orb2);
  }

  // Interactive Scroll Progress Ring Button (Bottom Right)
  if (!document.getElementById('aic-scroll-ring-btn')) {
    const ringBtn = document.createElement('button');
    ringBtn.id = 'aic-scroll-ring-btn';
    ringBtn.setAttribute('aria-label', 'Volver arriba');
    ringBtn.setAttribute('title', 'Volver arriba');
    const circumference = 2 * Math.PI * 22; // r=22 -> ~138.23
    ringBtn.innerHTML = `
      <svg class="progress-ring" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="22" stroke="rgba(255,255,255,0.12)"></circle>
        <circle id="aic-progress-circle" cx="25" cy="25" r="22" stroke="#f69f00" stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}"></circle>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
    `;
    ringBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(ringBtn);
  }

  const progressBar = document.getElementById('aic-scroll-progress');
  const ringBtn = document.getElementById('aic-scroll-ring-btn');
  const progressCircle = document.getElementById('aic-progress-circle');
  const orb1 = document.getElementById('aic-orb-emerald');
  const orb2 = document.getElementById('aic-orb-amber');
  const circumference = 2 * Math.PI * 22;

  const updateOnScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);

    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress})`;
    }

    if (progressCircle) {
      const offset = circumference - progress * circumference;
      progressCircle.style.strokeDashoffset = offset;
    }

    if (ringBtn) {
      if (scrollTop > 280) {
        ringBtn.classList.add('visible');
      } else {
        ringBtn.classList.remove('visible');
      }
    }

    // Continuous scroll-linked movement of ambient glow orbs
    if (orb1 && orb2) {
      orb1.style.transform = `translate3d(${progress * 180}px, ${progress * 260}px, 0) scale(${1 + progress * 0.25})`;
      orb2.style.transform = `translate3d(${-progress * 160}px, ${-progress * 240}px, 0) scale(${1 + (1 - progress) * 0.25})`;
    }
  };

  window.addEventListener('scroll', updateOnScroll, { passive: true });
  updateOnScroll();
}

/**
 * 3. GSAP 3 + ScrollTrigger Choreographed Timelines, Parallax Scrub & Batch Reveals
 */
function initGSAPScrollEngine() {
  if (!window.gsap) return;

  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // A. Hero Section Choreographed Timeline Entrance
  const heroSection = document.querySelector('header.relative, section.relative, [data-purpose="hero-section"], main > section:first-of-type');
  if (heroSection) {
    const heroPill = heroSection.querySelector('nav[aria-label="Breadcrumb"], .inline-flex.items-center.rounded-full, .hero-pill');
    const heroTitle = heroSection.querySelector('h1');
    const heroDesc = heroSection.querySelector('p.text-base, p.text-lg, p.leading-relaxed');
    const heroActions = heroSection.querySelector('.glass-card, form, .flex.flex-wrap.gap-4');
    const heroMetrics = heroSection.querySelector('[data-purpose="key-metrics-card"]');

    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (heroPill) heroTl.fromTo(heroPill, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.65 }, 0.05);
    if (heroTitle) heroTl.fromTo(heroTitle, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.15);
    if (heroDesc) heroTl.fromTo(heroDesc, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.75 }, 0.28);
    if (heroActions) heroTl.fromTo(heroActions, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.75 }, 0.38);
    if (heroMetrics) heroTl.fromTo(heroMetrics, { autoAlpha: 0, x: 30, scale: 0.95 }, { autoAlpha: 1, x: 0, scale: 1, duration: 0.9, ease: 'back.out(1.4)' }, 0.45);

    // B. Continuous Hero Parallax Scrubbing while scrolling down
    if (window.ScrollTrigger) {
      const heroBg = heroSection.querySelector('video, img.absolute');
      if (heroBg) {
        gsap.to(heroBg, {
          yPercent: 18,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }
  }

  // C. Continuous ScrollTrigger Batch Reveals for Cards, Sections & Grids
  if (window.ScrollTrigger) {
    const revealSelectors = `
      section > div.mx-auto > div:first-child,
      article,
      .property-card,
      .service-card,
      .bento-card,
      main .grid > div,
      [data-purpose="featured-listings"] article,
      [data-purpose="our-properties-showcase"] .grid > div,
      [data-purpose="service-pillars"] .grid > div,
      footer .grid > div
    `;

    const allTargets = Array.from(document.querySelectorAll(revealSelectors)).filter((el) => {
      // Exclude elements inside the main hero that were already animated by heroTl
      return !el.closest('header.relative') && !(heroSection && heroSection.contains(el));
    });

    // Separate items already visible in viewport vs items below the fold
    const belowFold = [];
    allTargets.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.7, delay: (idx % 4) * 0.08, ease: 'power2.out', overwrite: 'auto' }
        );
      } else {
        gsap.set(el, { autoAlpha: 0, y: 42, scale: 0.97 });
        belowFold.push(el);
      }
    });

    if (belowFold.length > 0) {
      ScrollTrigger.batch(belowFold, {
        interval: 0.1,
        batchMax: 4,
        start: 'top 88%',
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.11,
            ease: 'power3.out',
            overwrite: true
          });
        }
      });
    }

    // D. Continuous Scroll Parallax on Section Showcase Images
    const parallaxImages = document.querySelectorAll('[data-purpose="about-us-container"] img, [data-purpose="our-properties-showcase"] img');
    parallaxImages.forEach((img) => {
      gsap.fromTo(
        img,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement || img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        }
      );
    });
  }
}

/**
 * 4. Vanilla-Tilt 3D Interactive Perspective & Glass Glare on Cards
 */
function init3DTiltCards() {
  if (!window.VanillaTilt || window.innerWidth < 1024) return;

  const tiltTargets = document.querySelectorAll(`
    article,
    .property-card,
    .service-card,
    [data-purpose="key-metrics-card"],
    [data-purpose="service-pillars"] .grid > div
  `);

  if (tiltTargets.length > 0) {
    VanillaTilt.init(Array.from(tiltTargets), {
      max: 4.5,
      perspective: 1200,
      scale: 1.015,
      speed: 600,
      easing: 'cubic-bezier(.03,.98,.52,.99)',
      glare: true,
      'max-glare': 0.12
    });
  }
}

/**
 * 5. Custom Luxury Cursor Follower & Magnetic CTA Buttons (Desktop)
 */
function initLuxuryCursorAndMagneticButtons() {
  const isFinePointer = window.matchMedia && window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches;
  if (!isFinePointer) return;

  if (!document.getElementById('aic-cursor-dot')) {
    const dot = document.createElement('div');
    dot.id = 'aic-cursor-dot';
    const ring = document.createElement('div');
    ring.id = 'aic-cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
  }

  const dot = document.getElementById('aic-cursor-dot');
  const ring = document.getElementById('aic-cursor-ring');

  if (window.gsap) {
    const xDot = gsap.quickTo(dot, 'left', { duration: 0.08, ease: 'power3' });
    const yDot = gsap.quickTo(dot, 'top', { duration: 0.08, ease: 'power3' });
    const xRing = gsap.quickTo(ring, 'left', { duration: 0.28, ease: 'power3' });
    const yRing = gsap.quickTo(ring, 'top', { duration: 0.28, ease: 'power3' });

    window.addEventListener('mousemove', (e) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    }, { passive: true });
  }

  // Expand cursor ring over interactive elements
  const interactives = document.querySelectorAll('a, button, article, input, select, textarea, [data-modal-target]');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
  });

  // Magnetic attraction effect on Primary CTA Buttons & Phone Pill
  if (window.gsap) {
    const magneticBtns = document.querySelectorAll('a.bg-amber-500, a.bg-emerald-600, header a[href^="tel:"], button[type="submit"]');
    magneticBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        gsap.to(btn, {
          x: dx * 0.22,
          y: dy * 0.22,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.4)'
        });
      });
    });
  }
}

/**
 * 6. Subtle count-up animation for metrics when scrolled into view
 */
function setupStatCounters() {
  const statElements = document.querySelectorAll('[data-purpose="key-metrics-card"] .text-2xl, [data-purpose="key-metrics-card"] .text-3xl, .stat-counter');
  if (!statElements.length || !('IntersectionObserver' in window)) return;

  const countObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const rawText = el.textContent.trim();
        const numMatch = rawText.match(/^([^\d]*)(\d+)([^\d]*)$/);
        if (numMatch) {
          const prefix = numMatch[1];
          const targetNum = parseInt(numMatch[2], 10);
          const suffix = numMatch[3];
          const duration = 1400;
          const startTime = performance.now();

          const updateCounter = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeProgress * targetNum);
            el.textContent = `${prefix}${currentVal}${suffix}`;
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = rawText;
            }
          };
          requestAnimationFrame(updateCounter);
        }
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  statElements.forEach((el) => countObserver.observe(el));
}
