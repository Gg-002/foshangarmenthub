const SITE_CONFIG = {};

const qs = (s, root = document) => root.querySelector(s);
const qsa = (s, root = document) => [...root.querySelectorAll(s)];

function initNavigation() {
  const toggle = qs('.menu-toggle');
  const menu = qs('.nav-links');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'CLOSE' : 'MENU';
    document.body.classList.toggle('menu-open', open);
  });
}

function initReveals() {
  const items = qsa('.reveal');
  if (!('IntersectionObserver' in window)) return items.forEach(x => x.classList.add('visible'));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  items.forEach(item => observer.observe(item));
}

function initGallery() {
  const buttons = qsa('.filter-btn');
  const cards = qsa('[data-category]');
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
    button.classList.add('active'); button.setAttribute('aria-pressed', 'true');
    const filter = button.dataset.filter;
    cards.forEach(card => card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter));
  }));
  const lightbox = qs('.lightbox');
  if (!lightbox) return;
  const image = qs('img', lightbox);
  const close = () => { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); };
  cards.forEach(card => card.addEventListener('click', () => {
    const source = qs('img', card); if (!source) return;
    image.src = source.src; image.alt = source.alt;
    lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false');
    qs('.lightbox-close', lightbox).focus();
  }));
  qs('.lightbox-close', lightbox).addEventListener('click', close);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

function initForms() {
  qsa('.inquiry-form').forEach(form => {
    const category = new URLSearchParams(location.search).get('category');
    if (category && form.elements.category) form.elements.category.value = category;
  });
}

function initWhatsApp() {
  const number = SITE_CONFIG.whatsappNumber;
  qsa('[data-whatsapp]').forEach(el => {
    if (number) el.href = `https://wa.me/${number}`;
    else el.href = 'contact.html';
  });
}

document.addEventListener('DOMContentLoaded', () => { initNavigation(); initReveals(); initGallery(); initForms(); initWhatsApp(); });
