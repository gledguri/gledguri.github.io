import { terrain, hub, dish, sieve, plot } from '../vendor/hairline/index.js';

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

const factories = { terrain, hub, dish, sieve, plot };
const figures = [];
for (const element of document.querySelectorAll('[data-figure]')) {
  const factory = factories[element.dataset.figure];
  if (!factory) continue;
  figures.push(factory(element, {
    theme: 'light',
    intensity: 0.65,
    play: false,
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

const playButton = document.querySelector('.play-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function stopPlaying() {
  figures.forEach((figure) => figure.update({ play: false }));
  playButton?.setAttribute('aria-pressed', 'false');
  const label = playButton?.querySelector('[data-play-label]');
  if (label) label.textContent = 'Animate figures';
}
if (playButton) {
  playButton.hidden = reducedMotion.matches;
  playButton.addEventListener('click', () => {
    const playing = playButton.getAttribute('aria-pressed') !== 'true';
    figures.forEach((figure) => figure.update({ play: playing }));
    playButton.setAttribute('aria-pressed', String(playing));
    playButton.querySelector('[data-play-label]').textContent = playing ? 'Pause figures' : 'Animate figures';
  });
  reducedMotion.addEventListener('change', (event) => {
    playButton.hidden = event.matches;
    if (event.matches) stopPlaying();
  });
}
