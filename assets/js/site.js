const { marineFigure } = await import(`./marine-figures.js${new URL(import.meta.url).search}`);

document.documentElement.classList.add('js');

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
document.querySelector('.site-header')?.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    nav.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.focus();
  }
});

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const figures = [];
for (const element of document.querySelectorAll('[data-figure]')) {
  figures.push(marineFigure(element, {
    theme: 'light',
    intensity: 0.65,
    play: !motionPreference.matches,
    label: element.dataset.label,
  }));
}

const filters = document.querySelector('.filters');
const cards = [...document.querySelectorAll('.repo-card')];
const status = document.querySelector('#filter-status');
if (filters) {
  filters.hidden = false;
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    for (const filter of filters.querySelectorAll('button')) {
      filter.setAttribute('aria-pressed', String(filter === button));
    }
    let count = 0;
    for (const card of cards) {
      const visible = button.dataset.filter === 'all' || card.dataset.category === button.dataset.filter;
      card.hidden = !visible;
      if (visible) count++;
    }
    status.textContent = `${count} ${count === 1 ? 'repository' : 'repositories'} shown.`;
  });
}

motionPreference.addEventListener("change", event => {
  figures.forEach(figure => figure.update({ play: !event.matches }));
});
