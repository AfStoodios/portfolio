// AF Photography — Shared JS

// ── Reveal on scroll ──
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

// ── Active nav link ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});

// ── Lightbox ──
const overlay = document.getElementById('lightboxOverlay');
const lbImg = document.getElementById('lbImg');
const lbTag = document.getElementById('lbTag');
const lbTitle = document.getElementById('lbTitle');

let currentItems = [];
let currentIndex = 0;

function openLightbox(items, index) {
  if (!overlay) return;
  currentItems = items;
  currentIndex = index;
  showLightboxItem(currentIndex);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showLightboxItem(index) {
  const item = currentItems[index];
  if (!item) return;
  if (lbTag) lbTag.textContent = item.tag || '';
  if (lbTitle) lbTitle.textContent = item.title || '';
}

function closeLightbox() {
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function lbNext() {
  currentIndex = (currentIndex + 1) % currentItems.length;
  showLightboxItem(currentIndex);
}
function lbPrev() {
  currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
  showLightboxItem(currentIndex);
}

document.addEventListener('keydown', e => {
  if (!overlay || !overlay.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') lbNext();
  if (e.key === 'ArrowLeft') lbPrev();
});

if (overlay) {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeLightbox();
  });
}
