// -----------------------------
// typing effect (home section)
// -----------------------------
// simple typing effect
const typingEl = document.querySelector('.typing-text span');

const text = "I'm a Front-End Developer";
let i = 0;
const speed = 100; // typing speed (ms)

function type() {
  if (i < text.length) {
    typingEl.textContent += text.charAt(i);
    i++;
    setTimeout(type, speed);
  }
}

type();

// -----------------------------
// smooth scroll for nav links
// -----------------------------
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', function (e) {
    // prevent default if link is an anchor (#)
    const href = this.getAttribute('href');
    if (!href || href === '#') {
      e.preventDefault();
      // simple scroll to top if # or to section by name
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // manage active class
      document.querySelectorAll('nav a').forEach(x => x.classList.remove('active'));
      this.classList.add('active');
    } else if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.querySelectorAll('nav a').forEach(x => x.classList.remove('active'));
        this.classList.add('active');
      }
    }
  });
});

// -----------------------------
// scroll reveal (simple animation)
// -----------------------------
const revealEls = document.querySelectorAll('section, .project-card, .about-image img');

function revealOnScroll() {
  const vh = window.innerHeight;
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < vh - 80) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.transition = 'all 0.6s ease-out';
    } else {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
    }
  });
}
window.addEventListener('load', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);

// set initial invisible state for reveal targets
revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
});

// -----------------------------
// image modal viewer (click to enlarge)
// -----------------------------
function createModal() {
  const modal = document.createElement('div');
  modal.id = 'img-modal';
  Object.assign(modal.style, {
    position: 'fixed',
    inset: '0',
    display: 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'backgroundColor': 'rgba(0,0,0,0.85)',
    zIndex: 9999,
    cursor: 'zoom-out'
  });

  const img = document.createElement('img');
  img.style.maxWidth = '90%';
  img.style.maxHeight = '90%';
  img.style.borderRadius = '8px';
  img.style.boxShadow = '0 0 30px rgba(255,0,0,0.6)';
  modal.appendChild(img);

  modal.addEventListener('click', () => modal.remove());
  document.body.appendChild(modal);
  return modal;
}

function openModalWithSrc(src) {
  let modal = document.getElementById('img-modal');
  if (!modal) modal = createModal();
  modal.querySelector('img').src = src;
}

const clickableImages = document.querySelectorAll('.home-image img, .about-image img, .project-card img');
clickableImages.forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', (e) => {
    const src = e.currentTarget.getAttribute('src');
    if (src) openModalWithSrc(src);
  });
});

// -----------------------------
// small enhancement: focus outline when tabbing
// -----------------------------
document.body.addEventListener('keydown', function(e){
  if (e.key === 'Tab') document.documentElement.classList.add('show-focus');
});
