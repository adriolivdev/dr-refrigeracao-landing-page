/* ============================================================
   DOUTOR REFRIGERAÇÃO — script.js
   Removidos: depoimentos fabricados, contador de "visitantes ao vivo"
   e contadores numéricos não confirmados (números/estatísticas).
   ============================================================ */

/* SCROLL ANIMATIONS */
function initScrollAnimations() {
  const fadeEls = document.querySelectorAll(
    '.service-card, .step, .trust-item, .problem-card, .why-card, .equip-chips li, .brand-item, .regiao-list li, .faq-item, .social-card'
  );
  fadeEls.forEach(el => el.classList.add('fade-up'));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => obs.observe(el));
}

/* SMOOTH SCROLL */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

/* FLOAT WA — entra suavemente após 1.5s */
function initFloatWA() {
  const floatBtn = document.getElementById('floatWA');
  if (!floatBtn) return;
  floatBtn.style.opacity = '0';
  floatBtn.style.transform = 'translateY(20px)';
  floatBtn.style.transition = 'opacity 0.5s, transform 0.5s';
  setTimeout(() => {
    floatBtn.style.opacity = '1';
    floatBtn.style.transform = 'translateY(0)';
  }, 1500);
}

/* BALÃO DO WHATSAPP — × fecha sem abrir o WhatsApp */
function initFloatBubble() {
  const bubble = document.getElementById('floatBubble');
  const closeBtn = document.getElementById('floatBubbleClose');
  if (!bubble || !closeBtn) return;
  closeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    bubble.style.display = 'none';
  });
}

/* FAQ ACCORDION — altura via scrollHeight, nunca corta texto */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(function (item) {
    const btn = item.querySelector('.faq-q');
    const ans = item.querySelector('.faq-a');
    if (!btn || !ans) return;
    btn.addEventListener('click', function () {
      const isOpen = item.classList.contains('op');
      document.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('op');
        const q = i.querySelector('.faq-q');
        const a = i.querySelector('.faq-a');
        if (q) q.setAttribute('aria-expanded', 'false');
        if (a) a.style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('op');
        btn.setAttribute('aria-expanded', 'true');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });
}

/* NAVBAR — sombra ao rolar */
function initNavbarScroll() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 60
      ? '0 4px 24px rgba(13,30,74,0.18)'
      : '0 2px 16px rgba(13,30,74,0.10)';
  });
}

/* INIT */
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initSmoothScroll();
  initFloatWA();
  initFloatBubble();
  initFAQ();
  initNavbarScroll();
});