// criando a animação de scroll para os links internos
const internalLinks = document.querySelectorAll(
  '[data-menu="smooth"] a[href^="#"]',
);

function scrollToSection(event) {
  event.preventDefault();

  const href = event.currentTarget.getAttribute('href');
  const section = document.querySelector(href);

  const top = section.offsetTop;
  scrollTo({
    top: top,
    behavior: 'smooth',
  });
}

internalLinks.forEach((item) => {
  item.addEventListener('click', scrollToSection);
});

// mantendo o menu visível ao subir a página
const header = document.querySelector('.header');

function syncHeaderHeight() {
  if (!header) return;

  document.documentElement.style.setProperty(
    '--header-height',
    `${header.offsetHeight}px`,
  );
}

let lastScrollY = scrollY;

function handleHeaderVisibility() {
  if (!header) return;

  const currentScrollY = scrollY;
  const scrollingDown = currentScrollY > lastScrollY;

  header.classList.toggle('is-hidden', scrollingDown && currentScrollY > 32);

  if (!scrollingDown || currentScrollY <= 32) {
    header.classList.remove('is-hidden');
  }

  lastScrollY = currentScrollY;
}

syncHeaderHeight();

addEventListener('resize', syncHeaderHeight);

// criando animação de renderização dos elementos ao scroll
const sections = document.querySelectorAll('[data-animation="scroll"]');
const animationHeight = innerHeight * 0.5;

function scrollAnimation() {
  sections.forEach((item) => {
    const sectionTop = item.getBoundingClientRect().top - animationHeight;

    if (sectionTop < 0) {
      item.classList.add('active');
    }
  });

  sections[1].classList.add('active');
}

scrollAnimation();
handleHeaderVisibility();

addEventListener('scroll', handleHeaderVisibility, { passive: true });
addEventListener('scroll', scrollAnimation);
