/* =========================================================
   RUCK CAFÉ — SCRIPT
========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loading screen ---------- */
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('is-hidden');
        document.body.classList.remove('no-scroll');
      }, 1900);
    });
    document.body.classList.add('no-scroll');
  }

  /* ---------- Sticky nav on scroll ---------- */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile burger menu ---------- */
  const burger = document.getElementById('nav-burger');
  const navLinks = document.getElementById('nav-links');
  
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      burger.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
    });
    
    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Active section detection ---------- */
  const navAnchors = document.querySelectorAll('.nav__link');
  if (navAnchors.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach(a => {
            a.classList.toggle('active', a.dataset.section === id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    
    document.querySelectorAll('[id]').forEach(sec => {
      if (['home', 'menu', 'about', 'gallery', 'contact'].includes(sec.id)) {
        sectionObserver.observe(sec);
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    
    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* =========================================================
     MENU — data model
  ========================================================= */
  const ICONS = {
    cup: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 15H27V25C27 30 23 33 18 33C13 33 9 30 9 25V15Z" stroke="#C9A66B" stroke-width="1.3"/>
      <path d="M27 18H30C32.2 18 34 19.8 34 22C34 24.2 32.2 26 30 26H27" stroke="#C9A66B" stroke-width="1.3"/>
      <path d="M13 9C13 11 15 11 15 13M20 9C20 11 22 11 22 13" stroke="#C9A66B" stroke-width="1.1" stroke-linecap="round"/>
    </svg>`,
    iced: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 12H29L26.5 32H13.5L11 12Z" stroke="#C9A66B" stroke-width="1.3"/>
      <path d="M14 18L18 22M18 18L14 22M22 24L26 28M26 24L22 28" stroke="#C9A66B" stroke-width="1"/>
      <path d="M11 12H29" stroke="#C9A66B" stroke-width="1.3"/>
      <path d="M23 8L21 12" stroke="#C9A66B" stroke-width="1.1" stroke-linecap="round"/>
    </svg>`,
    leaf: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 30C10 16 20 8 32 8C32 22 24 30 10 30Z" stroke="#C9A66B" stroke-width="1.3"/>
      <path d="M11 29C17 22 22 17 30 10" stroke="#C9A66B" stroke-width="1"/>
    </svg>`,
    dessert: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 8V20C12 22.2 13.8 24 16 24C18.2 24 20 22.2 20 20V8" stroke="#C9A66B" stroke-width="1.2"/>
      <path d="M16 8V24" stroke="#C9A66B" stroke-width="1.2"/>
      <path d="M16 24V33" stroke="#C9A66B" stroke-width="1.2"/>
      <path d="M27 8C27 8 24 12 24 18C24 21 25.3 22.5 27 23V33" stroke="#C9A66B" stroke-width="1.2"/>
    </svg>`
  };

  const MENU = {
    'hot-coffee': [
      { 
        name: 'اسپرسو دوبل', 
        tagline: 'Espresso Double', 
        origin: 'اتیوپی، یرگاچف', 
        roast: 'رست متوسط', 
        notes: 'شکلات تلخ، کارامل، هلو', 
        icon: 'cup',
        image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&q=80',
        desc: 'شاتی متمرکز و غلیظ با کِرمای طلایی؛ برای لحظه‌ای که فقط قهوه اهمیت دارد.',
        variants: [
          { label: '۲۰٪ روبوستا / ۸۰٪ عربیکا', price: '۱۲۰٬۰۰۰' },
          { label: 'بلند ۵۰/۵۰', price: '۱۴۵٬۰۰۰' },
          { label: '۱۰۰٪ عربیکا مخصوص', price: '۱۸۰٬۰۰۰' }
        ] 
      },
      { 
        name: 'کاپوچینو', 
        tagline: 'Cappuccino', 
        origin: 'برزیل، سرادو', 
        roast: 'رست تیره', 
        notes: 'فندق، شکلات شیری', 
        icon: 'cup',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80',
        desc: 'تعادل کلاسیک اسپرسو، شیر بخاردیده و فومی ابریشمی و پایدار.',
        variants: [
          { label: 'کوچک (۱۸۰ میل)', price: '۱۱۰٬۰۰۰' },
          { label: 'متوسط (۲۴۰ میل)', price: '۱۳۰٬۰۰۰' },
          { label: 'بزرگ (۳۰۰ میل)', price: '۱۵۰٬۰۰۰' }
        ] 
      },
      { 
        name: 'لاته', 
        tagline: 'Latte', 
        origin: 'کلمبیا، هوئیلا', 
        roast: 'رست روشن', 
        notes: 'کارامل نرم، بادام', 
        icon: 'cup',
        image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&q=80',
        desc: 'ملایم و کِرمی، با لایه‌ای ظریف از فوم و ریتم آرام یک عصر بی‌عجله.',
        variants: [
          { label: 'کوچک (۲۴۰ میل)', price: '۱۱۵٬۰۰۰' },
          { label: 'بزرگ (۳۳۰ میل)', price: '۱۴۰٬۰۰۰' }
        ] 
      },
      { 
        name: 'موکا', 
        tagline: 'Mocha', 
        origin: 'گواتمالا، آنتیگوا', 
        roast: 'رست تیره', 
        notes: 'شکلات تلخ، دارچین', 
        icon: 'cup',
        image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600&q=80',
        desc: 'ترکیب گرم قهوه و شکلات تلخ بلژیکی، برای روزهای رمانتیک زمستانی.',
        variants: [
          { label: 'کوچک', price: '۱۲۵٬۰۰۰' },
          { label: 'بزرگ', price: '۱۵۵٬۰۰۰' }
        ] 
      }
    ],
    'cold-coffee': [
      { 
        name: 'آیس لاته', 
        tagline: 'Iced Latte', 
        origin: 'کلمبیا، هوئیلا', 
        roast: 'رست روشن', 
        notes: 'مرکبات، عسل', 
        icon: 'iced',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
        desc: 'لاته کلاسیک روی یخ؛ خنک، روان و بی‌نهایت شرب‌پذیر.',
        variants: [
          { label: 'متوسط (۳۰۰ میل)', price: '۱۲۰٬۰۰۰' },
          { label: 'بزرگ (۴۰۰ میل)', price: '۱۴۵٬۰۰۰' }
        ] 
      },
      { 
        name: 'کلد برو', 
        tagline: 'Cold Brew', 
        origin: 'اتیوپی، سیدامو', 
        roast: 'رست متوسط', 
        notes: 'توت سیاه، شکلات', 
        icon: 'iced',
        image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80',
        desc: 'دم‌آوری سرد ۱۸ ساعته با اسیدیته پایین و بدنه‌ای نرم و عمیق.',
        variants: [
          { label: 'کلاسیک', price: '۱۳۵٬۰۰۰' },
          { label: 'با شیر نارگیل', price: '۱۶۰٬۰۰۰' }
        ] 
      },
      { 
        name: 'آفوگاتو', 
        tagline: 'Affogato', 
        origin: 'برزیل، سرادو', 
        roast: 'رست تیره', 
        notes: 'وانیل، کارامل سوخته', 
        icon: 'iced',
        image: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=600&q=80',
        desc: 'یک شات اسپرسو داغ که آرام روی بستنی وانیل ذوب می‌شود.',
        variants: [
          { label: 'تک نفره', price: '۱۴۵٬۰۰۰' }
        ] 
      }
    ],
    'hot-drinks': [
      { 
        name: 'هات چاکلت', 
        tagline: 'Hot Chocolate', 
        origin: 'اکوادور، آرریبا', 
        roast: '—', 
        notes: 'شکلات ۷۰٪، وانیل', 
        icon: 'leaf',
        image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f554?w=600&q=80',
        desc: 'شکلات تلخ ذوب‌شده با شیر گرم و کفی مخملی و آرام.',
        variants: [
          { label: 'کلاسیک', price: '۱۱۰٬۰۰۰' },
          { label: 'با مارشمالو', price: '۱۲۵٬۰۰۰' }
        ] 
      },
      { 
        name: 'چای ماسالا', 
        tagline: 'Masala Chai', 
        origin: 'هند، آسام', 
        roast: '—', 
        notes: 'دارچین، هل، زنجبیل', 
        icon: 'leaf',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
        desc: 'دم‌نوش هندی با ادویه‌های گرم، عسل طبیعی و شیر بخاردیده.',
        variants: [
          { label: 'استاندارد', price: '۹۰٬۰۰۰' }
        ] 
      }
    ],
    'cold-drinks': [
      { 
        name: 'لیموناد نعنا', 
        tagline: 'Mint Lemonade', 
        origin: '—', 
        roast: '—', 
        notes: 'لیمو تازه، نعنای خنک', 
        icon: 'iced',
        image: 'https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?w=600&q=80',
        desc: 'ترکیبی روشن و شاداب از لیمو تازه و نعنای خنک روی یخ.',
        variants: [
          { label: 'استاندارد', price: '۸۵٬۰۰۰' }
        ] 
      },
      { 
        name: 'آیس چای هلو', 
        tagline: 'Iced Peach Tea', 
        origin: 'سیلان', 
        roast: '—', 
        notes: 'هلو، بلک تی', 
        icon: 'iced',
        image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=600&q=80',
        desc: 'دم‌نوش سرد سیاه با طعم طبیعی هلو؛ سبک و خنک‌کننده.',
        variants: [
          { label: 'استاندارد', price: '۹۵٬۰۰۰' }
        ] 
      }
    ],
    'no-coffee': [
      { 
        name: 'ماسالا چای لاته', 
        tagline: 'Chai Latte', 
        origin: 'هند، آسام', 
        roast: '—', 
        notes: 'ادویه گرم، وانیل', 
        icon: 'leaf',
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&q=80',
        desc: 'شیر بخاردیده با ادویه‌جات گرم؛ بدون کافئین اسپرسو.',
        variants: [
          { label: 'استاندارد', price: '۱۰۵٬۰۰۰' }
        ] 
      },
      { 
        name: 'ماچا لاته', 
        tagline: 'Matcha Latte', 
        origin: 'ژاپن، اوجی', 
        roast: '—', 
        notes: 'گیاهی، شیرینی ملایم', 
        icon: 'leaf',
        image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=80',
        desc: 'پودر ماچای درجه یک ژاپنی با شیر گرم و کفی ابریشمی.',
        variants: [
          { label: 'استاندارد', price: '۱۳۰٬۰۰۰' },
          { label: 'با شیر بادام', price: '۱۵۰٬۰۰۰' }
        ] 
      }
    ],
    'desserts': [
      { 
        name: 'تیرامیسو', 
        tagline: 'Tiramisu', 
        origin: 'ایتالیا', 
        roast: '—', 
        notes: 'اسپرسو، کاکائو', 
        icon: 'dessert',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80',
        desc: 'لایه‌های ظریف مسکارپونه، بیسکویت لیدی‌فینگر و اسپرسو تازه.',
        variants: [
          { label: 'تکه استاندارد', price: '۱۸۵٬۰۰۰' }
        ] 
      },
      { 
        name: 'چیزکیک نیویورکی', 
        tagline: 'NY Cheesecake', 
        origin: 'آمریکا', 
        roast: '—', 
        notes: 'خامه‌ای، لیمو', 
        icon: 'dessert',
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80',
        desc: 'کِرمی و غنی، با کف بیسکویتی و رویه‌ای صاف و درخشان.',
        variants: [
          { label: 'تکه استاندارد', price: '۱۷۰٬۰۰۰' }
        ] 
      },
      { 
        name: 'کروسان بادام', 
        tagline: 'Almond Croissant', 
        origin: 'فرانسه', 
        roast: '—', 
        notes: 'کره، بادام برشته', 
        icon: 'dessert',
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80',
        desc: 'خمیر لایه‌ای فرانسوی با فیلینگ بادام و روکشی طلایی.',
        variants: [
          { label: 'استاندارد', price: '۱۴۰٬۰۰۰' }
        ] 
      }
    ]
  };

  /* ---------- Render menu grid ---------- */
  const grid = document.getElementById('menu-grid');
  
  if (!grid) return; // اگه grid وجود نداشت، بقیه کد اجرا نشه

  function renderMenu(cat) {
    grid.innerHTML = '';
    const items = MENU[cat] || [];
    
    items.forEach((item, i) => {
      const card = document.createElement('article');
      card.className = 'menu__card';
      card.style.animationDelay = (i * 0.07) + 's';
      
      const hasImage = item.image && item.image.trim() !== '';
      
      card.innerHTML = `
        ${hasImage ? `
          <div class="menu__card-image">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
          </div>
        ` : ''}
        <div class="menu__card-body">
          ${!hasImage ? `<div class="menu__card-icon">${ICONS[item.icon] || ICONS.cup}</div>` : ''}
          <h3 class="menu__card-name">${item.name}</h3>
          <p class="menu__card-tagline">${item.tagline}</p>
          <p class="menu__card-origin">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 21C12 21 19 14.5 19 9.5C19 5.35786 15.6421 2 11.5 2C7.35786 2 4 5.35786 4 9.5C4 14.5 12 21 12 21Z" stroke="#C9A66B" stroke-width="1.4"/></svg>
            ${item.origin}
          </p>
          <div class="menu__card-foot">
            <span class="menu__card-roast">${item.roast}</span>
            <button class="menu__price-btn" type="button">مشاهده قیمت</button>
          </div>
        </div>`;
      
      // اضافه کردن event listener به دکمه
      const btn = card.querySelector('.menu__price-btn');
      btn.addEventListener('click', () => {
        openPriceModal(item);
      });
      
      grid.appendChild(card);
    });
  }
  
  renderMenu('hot-coffee');

  /* ---------- Menu tabs ---------- */
  const tabs = document.querySelectorAll('.menu__tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
      renderMenu(this.dataset.cat);
    });
  });

  /* =========================================================
     PRICE MODAL
  ========================================================= */
  const modal = document.getElementById('price-modal');
  if (!modal) return;
  
  const modalPanel = modal.querySelector('.price-modal__panel');
  const modalBackdrop = document.getElementById('price-modal-backdrop');
  const modalClose = document.getElementById('price-modal-close');
  const pmTitle = document.getElementById('pm-title');
  const pmOrigin = document.getElementById('pm-origin');
  const pmDesc = document.getElementById('pm-desc');
  const pmRoast = document.getElementById('pm-roast');
  const pmNotes = document.getElementById('pm-notes');
  const pmVariants = document.getElementById('pm-variants');

  let lastFocused = null;

  function openPriceModal(item) {
    if (!item) return;
    
    pmTitle.textContent = `${item.name} — ${item.tagline}`;
    pmOrigin.textContent = `خاستگاه: ${item.origin}`;
    pmDesc.textContent = item.desc || '';
    pmRoast.textContent = item.roast || '—';
    pmNotes.textContent = item.notes || '—';

    pmVariants.innerHTML = (item.variants || []).map(v => `
      <li class="price-modal__variant">
        <span class="price-modal__variant-label">${v.label}</span>
        <span class="price-modal__variant-price">${v.price} تومان</span>
      </li>`).join('');

    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    
    setTimeout(() => {
      if (modalPanel) modalPanel.focus();
    }, 100);
    
    document.addEventListener('keydown', onModalKeydown);
  }

  function closePriceModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    document.removeEventListener('keydown', onModalKeydown);
    if (lastFocused) {
      setTimeout(() => lastFocused.focus(), 100);
    }
  }

  function onModalKeydown(e) {
    if (e.key === 'Escape') {
      closePriceModal();
    }
  }

  if (modalClose) modalClose.addEventListener('click', closePriceModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closePriceModal);

});