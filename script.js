const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const header = document.getElementById('header');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');
const countEl = document.getElementById('projectCount');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });

    let visible = 0;
    cards.forEach((card) => {
      const show = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('is-hidden', !show);
      if (show) visible += 1;
    });
    countEl.textContent = String(visible);
    document.getElementById('projectLabel').textContent = visible === 1 ? 'project' : 'projects';
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...nav.querySelectorAll('a')];

const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
  const marker = window.scrollY + Math.min(window.innerHeight * 0.32, 280);
  let current = sections[0].id;
  sections.forEach((section) => {
    if (section.offsetTop <= marker) current = section.id;
  });
  links.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

onScroll();
window.addEventListener('scroll', onScroll, { passive: true });
