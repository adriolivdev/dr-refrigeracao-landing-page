/* ============================================================
   DOUTOR REFRIGERAÇÃO — script.js
   ============================================================ */

/* DEPOIMENTOS */
const reviews = [
  { name: "João Carlos S.", city: "Itajaí", time: "há 2 semanas", text: "Minha geladeira parou numa sexta à noite. Liguei pro Doutor Refrigeração e no sábado de manhã estava resolvida! Técnico super competente e preço justo. Indico sem hesitar!", stars: 5, color: "#1259C3" },
  { name: "Maria Fernanda R.", city: "Navegantes", time: "há 1 mês", text: "Atendimento incrível! Minha cervejeira estava com problema de compressor, vieram rápido e resolveram no mesmo dia. Já indiquei pra vários amigos aqui em Navegantes!", stars: 5, color: "#E53935" },
  { name: "Roberto A.", city: "Itajaí", time: "há 3 semanas", text: "O freezer da minha churrascaria parou numa quinta. Não dava pra ficar parado. O Doutor veio no mesmo dia e resolveu! Profissional de verdade. Muito obrigado!", stars: 5, color: "#2E7D32" },
  { name: "Camila S.", city: "Balneário Camboriú", time: "há 2 meses", text: "Frigo bar do escritório com defeito. Vieram, diagnosticaram, consertaram e ainda deram garantia por escrito. Recomendo muito aqui em Balneário Camboriú!", stars: 5, color: "#6A1B9A" },
  { name: "Davi M.", city: "Camboriú", time: "há 1 semana", text: "Já usei o serviço 3x. Sempre pontual, sempre com garantia, preço honesto. Recomendo muito para quem está em Camboriú ou Itajaí!", stars: 5, color: "#E65100" },
  { name: "Ana Paula L.", city: "Itajaí", time: "há 3 semanas", text: "Minha geladeira estava fazendo um barulho horroroso. Em menos de 2 horas estava tudo resolvido. Nota 10 pro técnico e pra empresa!", stars: 5, color: "#0277BD" },
  { name: "Carlos Eduardo F.", city: "Navegantes", time: "há 1 mês", text: "Expositora da minha loja parou de funcionar. Liguei às 7h da manhã e às 10h já estava resolvido. Me salvou de um prejuízo enorme em Navegantes. Muito obrigado!", stars: 5, color: "#558B2F" },
  { name: "Priscila N.", city: "Balneário Camboriú", time: "há 2 semanas", text: "Serviço rápido, eficiente e com nota de garantia. Preço bem abaixo do que eu esperava. Super indico para todo mundo de Balneário Camboriú e região!", stars: 5, color: "#AD1457" },
  { name: "Marcos V.", city: "Itajaí", time: "há 1 semana", text: "Profissional muito educado e competente. Identificou o problema rápido e o preço foi muito justo. Já está na agenda de contatos aqui em casa!", stars: 5, color: "#00695C" },
  { name: "Luciana T.", city: "Penha", time: "há 3 meses", text: "Geladeira parou de gelar e eu estava com muito produto dentro. Eles vieram urgente até Penha e salvaram tudo! Serviço com garantia e atenção especial. Parabéns!", stars: 5, color: "#4527A0" }
];

function buildReviewCard(review) {
  const initials = review.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  return `
    <div class="review-card">
      <div class="review-header">
        <div class="review-avatar" style="background: ${review.color};">${initials}</div>
        <div class="review-meta">
          <strong>${review.name}</strong>
          <small>${review.city} · ${review.time}</small>
        </div>
      </div>
      <div class="review-stars">${'★'.repeat(review.stars)}</div>
      <p class="review-text">"${review.text}"</p>
      <div class="review-source">✅ Google Maps</div>
    </div>`;
}

function initTestimonials() {
  const track = document.getElementById('reviewsTrack');
  if (!track) return;
  const allCards = [...reviews, ...reviews]; // duplicar para loop
  track.innerHTML = allCards.map(buildReviewCard).join('');
}

/* VIEWERS AO VIVO — começa com número aleatório, oscila suavemente */
function initLiveViewers() {
  const el = document.getElementById('viewers-count');
  if (!el) return;
  let current = Math.floor(Math.random() * 12) + 8; // 8–19
  el.textContent = current;
  setInterval(() => {
    const delta = Math.random() > 0.5 ? 1 : -1;
    current = Math.max(5, Math.min(26, current + delta));
    el.textContent = current;
  }, Math.random() * 4000 + 6000);
}

/* ANIMAÇÃO DOS CONTADORES */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  if (isNaN(target)) return;
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(interval);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

/* HERO STATS */
function initHeroCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target);
    if (isNaN(target)) return;
    if (target === 5) { el.textContent = '5.0'; return; }
    if (target === 0) { el.textContent = '0'; return; }
    let current = 0;
    const step = target / (1800 / 16);
    const animate = () => {
      current += step;
      if (current >= target) {
        el.textContent = target + '+';
      } else {
        el.textContent = Math.floor(current);
        requestAnimationFrame(animate);
      }
    };
    setTimeout(animate, 600);
  });
}

/* INTERSECTION OBSERVER */
function initScrollAnimations() {
  const fadeEls = document.querySelectorAll(
    '.service-card, .step, .trust-item, .map-info-item, .social-card, .counter-item, .brand-item, .coverage-item, .faq-item'
  );
  fadeEls.forEach(el => el.classList.add('fade-up'));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => obs.observe(el));

  // Contadores
  const counterEls = document.querySelectorAll('.counter-animate');
  const cObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCounter(e.target); cObs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => cObs.observe(el));
}

/* SMOOTH SCROLL */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

/* FLOAT WA — entra com animação após 1.5s */
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

/* BALÃO DO WHATSAPP — botão × fecha sem abrir o WhatsApp */
function initFloatBubble() {
  var bubble = document.getElementById('floatBubble');
  var closeBtn = document.getElementById('floatBubbleClose');
  if (!bubble || !closeBtn) return;
  closeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    bubble.style.display = 'none';
  });
}

/* FAQ ACCORDION — altura via scrollHeight, nunca corta texto */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(function(item) {
    var btn = item.querySelector('.faq-q');
    var ans = item.querySelector('.faq-a');
    if (!btn || !ans) return;
    btn.addEventListener('click', function() {
      var isOpen = item.classList.contains('op');
      // fechar todos
      document.querySelectorAll('.faq-item').forEach(function(i) {
        i.classList.remove('op');
        var q = i.querySelector('.faq-q');
        var a = i.querySelector('.faq-a');
        if (q) q.setAttribute('aria-expanded', 'false');
        if (a) a.style.maxHeight = null;
      });
      // abrir o clicado
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
  initTestimonials();
  initLiveViewers();
  initHeroCounters();
  initScrollAnimations();
  initSmoothScroll();
  initFloatWA();
  initFloatBubble();
  initFAQ();
  initNavbarScroll();
});