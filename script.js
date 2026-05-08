/* ============================================================
   DOUTOR REFRIGERAÇÃO — script.js
   Funcionalidades: reviews, contadores, viewers, animações
   ============================================================ */

/* ============================
   DADOS DOS DEPOIMENTOS
   ============================ */
const reviews = [
  {
    name: "João Carlos S.",
    time: "há 2 semanas",
    text: "Minha geladeira parou numa sexta à noite. Liguei pro Doutor Refrigeração e no sábado de manhã estava resolvida! Técnico super competente e preço justo. Indico sem hesitar!",
    stars: 5,
    color: "#1259C3"
  },
  {
    name: "Maria Fernanda R.",
    time: "há 1 mês",
    text: "Atendimento incrível! Minha cervejeira estava com problema de compressor, vieram rápido e resolveram no mesmo dia. Já indiquei pra vários amigos aqui em Itajaí!",
    stars: 5,
    color: "#E53935"
  },
  {
    name: "Roberto A.",
    time: "há 3 semanas",
    text: "O freezer da minha churrascaria parou numa quinta. Não dava pra ficar parado. O Doutor veio no mesmo dia e resolveu! Profissional de verdade. Muito obrigado!",
    stars: 5,
    color: "#2E7D32"
  },
  {
    name: "Camila S.",
    time: "há 2 meses",
    text: "Frigo bar do escritório com defeito. Vieram, diagnosticaram, consertaram e ainda deram garantia. Nunca mais vou chamar outro técnico de refrigeração!",
    stars: 5,
    color: "#6A1B9A"
  },
  {
    name: "Davi M.",
    time: "há 1 semana",
    text: "Já usei o serviço 3x. Sempre pontual, sempre com garantia, preço honesto. Recomendo muito pra quem está em Balneário ou Itajaí!",
    stars: 5,
    color: "#E65100"
  },
  {
    name: "Ana Paula L.",
    time: "há 3 semanas",
    text: "Minha geladeira estava fazendo um barulho horroroso. Em menos de 2 horas estava tudo resolvido. Nota 10 pro técnico e pra empresa!",
    stars: 5,
    color: "#0277BD"
  },
  {
    name: "Carlos Eduardo F.",
    time: "há 1 mês",
    text: "Expositora da minha loja parou de funcionar. Liguei às 7h da manhã e às 10h já estava resolvido. Me salvou de um prejuízo enorme. Muito obrigado!",
    stars: 5,
    color: "#558B2F"
  },
  {
    name: "Priscila N.",
    time: "há 2 semanas",
    text: "Serviço rápido, eficiente e com nota de garantia. Preço bem abaixo do que eu esperava. Super indico para todo mundo da região!",
    stars: 5,
    color: "#AD1457"
  },
  {
    name: "Marcos V.",
    time: "há 1 semana",
    text: "Profissional muito educado e competente. Identificou o problema rápido e o preço foi muito justo. Já está na agenda de contatos aqui em casa!",
    stars: 5,
    color: "#00695C"
  },
  {
    name: "Luciana T.",
    time: "há 3 meses",
    text: "Geladeira parou de gelar e eu estava com muito produto dentro. Eles vieram urgente e salvaram tudo! Serviço com garantia e atenção especial. Parabéns!",
    stars: 5,
    color: "#4527A0"
  }
];

/* ============================
   RENDERIZA DEPOIMENTOS
   ============================ */
function buildReviewCard(review) {
  const initials = review.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  const starsHtml = '★'.repeat(review.stars);
  return `
    <div class="review-card">
      <div class="review-header">
        <div class="review-avatar" style="background: ${review.color};">${initials}</div>
        <div class="review-meta">
          <strong>${review.name}</strong>
          <small>${review.time}</small>
        </div>
      </div>
      <div class="review-stars">${starsHtml}</div>
      <p class="review-text">"${review.text}"</p>
      <div class="review-source">✅ Google Maps</div>
    </div>
  `;
}

function initTestimonials() {
  const track = document.getElementById('reviewsTrack');
  if (!track) return;

  // Duplicar para loop infinito
  const allCards = [...reviews, ...reviews];
  track.innerHTML = allCards.map(buildReviewCard).join('');
}

/* ============================
   CONTADOR DE VIEWERS AO VIVO
   ============================ */
function initLiveViewers() {
  const el = document.getElementById('viewers-count');
  if (!el) return;

  let current = Math.floor(Math.random() * 10) + 10; // 10-19
  el.textContent = current;

  setInterval(() => {
    const delta = Math.random() > 0.5 ? 1 : -1;
    current = Math.max(7, Math.min(28, current + delta));
    el.textContent = current;
  }, Math.random() * 4000 + 5000); // a cada 5-9s
}

/* ============================
   ANIMAÇÃO DOS CONTADORES
   ============================ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
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

/* ============================
   HERO STATS COUNTER (aparece rápido)
   ============================ */
function initHeroCounters() {
  const heroNums = document.querySelectorAll('.stat-num');
  heroNums.forEach(el => {
    const target = parseInt(el.dataset.target);
    if (target === 0) { el.textContent = '0'; return; }
    if (target === 5) { el.textContent = '5.0'; return; }

    let current = 0;
    const duration = 1800;
    const step = target / (duration / 16);

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

/* ============================
   INTERSECTION OBSERVER — SCROLL
   ============================ */
function initScrollAnimations() {
  // Fade up em cards e seções
  const fadeEls = document.querySelectorAll(
    '.service-card, .step, .trust-item, .map-info-item, .social-card, .counter-item'
  );

  fadeEls.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => observer.observe(el));

  // Contadores da seção counters
  const counterEls = document.querySelectorAll('.counter-animate');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => counterObserver.observe(el));
}

/* ============================
   SMOOTH SCROLL LINKS
   ============================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ============================
   FLOAT WA — esconder ao rolar pro topo
   ============================ */
function initFloatWA() {
  const floatBtn = document.getElementById('floatWA');
  if (!floatBtn) return;

  // Mostrar após 1.5s
  floatBtn.style.opacity = '0';
  floatBtn.style.transform = 'translateY(20px)';
  floatBtn.style.transition = 'opacity 0.5s, transform 0.5s';

  setTimeout(() => {
    floatBtn.style.opacity = '1';
    floatBtn.style.transform = 'translateY(0)';
  }, 1500);
}

/* ============================
   URGENCY: PISCAR A CADA X MIN
   ============================ */
function initUrgencyPulse() {
  const bar = document.querySelector('.urgency-bar');
  if (!bar) return;

  setInterval(() => {
    bar.style.background = 'linear-gradient(90deg, #FF3D00, #CC2200)';
    setTimeout(() => {
      bar.style.background = '';
    }, 800);
  }, 15000);
}

/* ============================
   NAVBAR: sombra ao scrollar
   ============================ */
function initNavbarScroll() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.boxShadow = '0 4px 24px rgba(13,30,74,0.18)';
    } else {
      nav.style.boxShadow = '0 2px 16px rgba(13,30,74,0.10)';
    }
  });
}

/* ============================
   INIT
   ============================ */
document.addEventListener('DOMContentLoaded', () => {
  initTestimonials();
  initLiveViewers();
  initHeroCounters();
  initScrollAnimations();
  initSmoothScroll();
  initFloatWA();
  initUrgencyPulse();
  initNavbarScroll();

  console.log('%c🔵 Doutor Refrigeração — Landing Page carregada com sucesso!', 'color: #2979FF; font-weight: bold; font-size: 14px;');
});
