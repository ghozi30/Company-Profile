/* ==========================================================================
   STILVA — EVERYDAY APPAREL (EST. 2030)
   Application Logic, GSAP ScrollTrigger Animations, Runway & Concierge Modal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Register GSAP ScrollTrigger
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 2. Product Catalog Dataset (6 Exact Items)
  const CATALOG_PRODUCTS = {
    'SV-ESS-01': {
      id: 'SV-ESS-01',
      title: 'Stilva Heavyweight Boxy Tee',
      category: 'Daily Essentials',
      badge: 'SIGNATURE BEST SELLER',
      spec: 'COTTON COMBED 24S PREMIUM',
      price: 'Rp 95.000',
      desc: 'Kaos katun premium polos berpotongan boxy santai yang sejuk dan menyerap keringat.',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'
    },
    'SV-ESS-02': {
      id: 'SV-ESS-02',
      title: 'Everyday Relaxed Hoodie',
      category: 'Daily Essentials',
      badge: 'DAILY COMFORT',
      spec: 'SOFT COTTON FLEECE 280 GSM',
      price: 'Rp 185.000',
      desc: 'Hoodie berpotongan santai dengan tekstur lembut yang pas untuk hangout atau bersantai.',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80'
    },
    'SV-SMC-01': {
      id: 'SV-SMC-01',
      title: 'Cuban Collar Breeze Shirt',
      category: 'Smart Casual',
      badge: 'RESORT EDITORIAL',
      spec: '100% BREATHABLE LINEN BLEND',
      price: 'Rp 149.000',
      desc: 'Kemeja kerah camp (cuban shirt) yang rapi namun tetap rileks untuk kuliah atau ke kantor.',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    },
    'SV-SMC-02': {
      id: 'SV-SMC-02',
      title: 'Signature Flannel Overshirt',
      category: 'Smart Casual',
      badge: 'TIMELESS LAYER',
      spec: 'BRUSHED COTTON FLANNEL',
      price: 'Rp 165.000',
      desc: 'Kemeja flannel lembut dengan motif klasik yang nyaman dipakai sebagai atasan maupun luaran.',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    },
    'SV-SMC-03': {
      id: 'SV-SMC-03',
      title: 'Tailored Relaxed Chino Pants',
      category: 'Smart Casual',
      badge: 'ERGONOMIC FIT',
      spec: 'STRETCH SOFT COTTON TWILL',
      price: 'Rp 179.000',
      desc: 'Celana chino berpotongan rapi dan elastis yang mendukung mobilitas harian Anda.',
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80'
    },
    'SV-ACC-01': {
      id: 'SV-ACC-01',
      title: 'Stilva Canvas Tote & Cap Bundle',
      category: 'Accessories',
      badge: 'ESSENTIAL GEAR',
      spec: 'HEAVY DUTY 12OZ CANVAS',
      price: 'Rp 89.000',
      desc: 'Pelengkap gaya harian meliputi tote bag kanvas fungsional dan topi baseball minimalis.',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    }
  };

  // 3. Preloader Curtain Animation
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloaderBar');
  const preloaderPercent = document.getElementById('preloaderPercent');

  if (preloader && window.gsap) {
    const progressObj = { value: 0 };
    const tl = gsap.timeline();

    tl.to(progressObj, {
      value: 100,
      duration: 1.35,
      ease: 'power2.inOut',
      onUpdate: () => {
        const current = Math.round(progressObj.value);
        if (preloaderBar) preloaderBar.style.width = `${current}%`;
        if (preloaderPercent) preloaderPercent.textContent = `${current}%`;
      }
    })
      .to(preloader, {
        yPercent: -100,
        duration: 1.05,
        ease: 'expo.inOut',
        onComplete: () => {
          preloader.style.display = 'none';
        }
      })
      .from(
        '.hero-reveal',
        {
          y: 36,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out'
        },
        '-=0.45'
      );
  }

  // 4. Custom Magnetic Cursor
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .product-card');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
    });
  }

  // 5. Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  // 6. GSAP ScrollTrigger Section Reveals & Metric Count-Up
  if (window.gsap && window.ScrollTrigger) {
    gsap.utils.toArray('.gs-reveal').forEach((elem) => {
      gsap.from(elem, {
        scrollTrigger: {
          trigger: elem,
          start: 'top 86%',
          toggleActions: 'play none none none'
        },
        y: 32,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out'
      });
    });

    // Metric Counters
    const counters = document.querySelectorAll('.metric-counter');
    counters.forEach((counter) => {
      const target = parseFloat(counter.getAttribute('data-target') || '0');
      const format = counter.getAttribute('data-format') || 'int';
      const suffix = counter.getAttribute('data-suffix') || '';
      const countObj = { val: 0 };

      ScrollTrigger.create({
        trigger: counter,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(countObj, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              let formatted = '';
              if (format === 'dot') {
                formatted = Math.round(countObj.val)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
              } else if (format === 'decimal') {
                formatted = countObj.val.toFixed(1).replace('.', ',');
              } else {
                formatted = Math.round(countObj.val).toString();
              }
              counter.textContent = `${formatted}${suffix}`;
            }
          });
        }
      });
    });
  }

  // 7. Archive Lookbook Horizontal Runway & Category Filtering
  const runwayTrack = document.getElementById('runwayTrack');
  const runwayPrev = document.getElementById('runwayPrev');
  const runwayNext = document.getElementById('runwayNext');
  const runwayProgressBar = document.getElementById('runwayProgressBar');
  const filterButtons = document.querySelectorAll('.lookbook-filter');
  const productCards = document.querySelectorAll('.product-card');

  const updateRunwayProgress = () => {
    if (!runwayTrack || !runwayProgressBar) return;
    const maxScroll = runwayTrack.scrollWidth - runwayTrack.clientWidth;
    if (maxScroll <= 0) {
      runwayProgressBar.style.width = '100%';
      return;
    }
    const ratio = Math.min(1, Math.max(0.18, runwayTrack.scrollLeft / maxScroll));
    runwayProgressBar.style.width = `${Math.round(ratio * 100)}%`;
  };

  if (runwayTrack) {
    runwayTrack.addEventListener('scroll', updateRunwayProgress);
    window.addEventListener('resize', updateRunwayProgress);
    updateRunwayProgress();
  }

  if (runwayPrev && runwayTrack) {
    runwayPrev.addEventListener('click', () => {
      runwayTrack.scrollBy({ left: -370, behavior: 'smooth' });
    });
  }

  if (runwayNext && runwayTrack) {
    runwayNext.addEventListener('click', () => {
      runwayTrack.scrollBy({ left: 370, behavior: 'smooth' });
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedFilter = btn.getAttribute('data-filter');
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      productCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (selectedFilter === 'all' || category === selectedFilter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      if (runwayTrack) {
        runwayTrack.scrollTo({ left: 0, behavior: 'smooth' });
        setTimeout(updateRunwayProgress, 200);
      }
    });
  });

  // 8. Interactive Product & Size Chart Modal (#productModal)
  const productModal = document.getElementById('productModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalImage = document.getElementById('modalImage');
  const modalBadge = document.getElementById('modalBadge');
  const modalCode = document.getElementById('modalCode');
  const modalSpec = document.getElementById('modalSpec');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const modalDesc = document.getElementById('modalDesc');
  const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');
  const sizeButtons = document.querySelectorAll('.size-btn');
  const selectedSizeLabel = document.getElementById('selectedSizeLabel');

  let activeProduct = CATALOG_PRODUCTS['SV-ESS-01'];
  let activeSize = 'L';

  const syncModalWhatsappUrl = () => {
    if (!modalWhatsappBtn || !activeProduct) return;
    const text = `Halo STILVA, saya ingin memesan produk *${activeProduct.title}* (${activeProduct.id}) — Ukuran: *${activeSize}* (${activeProduct.price}). Apakah stok masih tersedia?`;
    modalWhatsappBtn.href = `https://wa.me/6281200000000?text=${encodeURIComponent(text)}`;
  };

  const openProductModal = (productId) => {
    const item = CATALOG_PRODUCTS[productId];
    if (!item || !productModal) return;
    activeProduct = item;

    if (modalImage) {
      modalImage.src = item.image;
      modalImage.alt = item.title;
    }
    if (modalBadge) modalBadge.textContent = item.badge;
    if (modalCode) modalCode.textContent = item.id;
    if (modalSpec) modalSpec.textContent = item.spec;
    if (modalCategory) modalCategory.textContent = item.category;
    if (modalTitle) modalTitle.textContent = item.title;
    if (modalPrice) modalPrice.textContent = item.price;
    if (modalDesc) modalDesc.textContent = item.desc;

    syncModalWhatsappUrl();
    productModal.classList.remove('hidden');
    productModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  const closeProductModal = () => {
    if (!productModal) return;
    productModal.classList.add('hidden');
    productModal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  productCards.forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      if (id) openProductModal(id);
    });
  });

  sizeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeSize = btn.getAttribute('data-size') || 'L';
      sizeButtons.forEach((b) => b.classList.remove('active', 'bg-[#161615]', 'text-white'));
      btn.classList.add('active');
      if (selectedSizeLabel) selectedSizeLabel.textContent = `UKURAN: ${activeSize}`;
      syncModalWhatsappUrl();
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeProductModal);
  }

  if (productModal) {
    productModal.addEventListener('click', (e) => {
      if (e.target === productModal) closeProductModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProductModal();
  });

  // 9. Interactive WhatsApp Concierge Form (#whatsappForm)
  const whatsappForm = document.getElementById('whatsappForm');
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('waName')?.value.trim() || '';
      const phone = document.getElementById('waPhone')?.value.trim() || '';
      const category = document.getElementById('waCategory')?.value || 'Daily Essentials';
      const message = document.getElementById('waMessage')?.value.trim() || '';

      const formattedMessage =
        `Halo STILVA Everyday Apparel, saya ingin berkonsultasi / memesan koleksi:\n\n` +
        `• *Nama Lengkap:* ${name}\n` +
        `• *Nomor WhatsApp:* ${phone}\n` +
        `• *Kategori Koleksi:* ${category}\n` +
        `• *Detail Pesanan / Pertanyaan:* ${message}`;

      const waUrl = `https://wa.me/6285778966387?text=${encodeURIComponent(formattedMessage)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }
});

