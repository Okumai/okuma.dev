import './style.css';
import { languages, translations } from './locales.js';
import { categories } from './projects.js';
import { inject } from '@vercel/analytics';

// Initialize once, outside render(), so language changes do not add trackers.
if (import.meta.env.PROD) inject({ mode: 'production' });

const icons = {
  arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  right: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  github: '<path d="M9 19c-4.3 1.3-4.3-2-6-2m12 5v-3.9a3.4 3.4 0 0 0-1-2.6c3.3-.4 6.7-1.6 6.7-7.3a5.7 5.7 0 0 0-1.5-4A5.3 5.3 0 0 0 19.1.3S17.9-.1 15 1.8a13.4 13.4 0 0 0-7 0C5.1-.1 3.9.3 3.9.3a5.3 5.3 0 0 0-.1 3.9 5.7 5.7 0 0 0-1.5 4c0 5.7 3.4 6.9 6.7 7.3a3.4 3.4 0 0 0-1 2.6V22" transform="translate(1 1) scale(.9)"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a18 18 0 0 1 0 18 18 18 0 0 1 0-18Z"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  code: '<path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 20"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  dock: '<path d="M3 15v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4"/><rect x="5" y="5" width="4" height="8" rx="1"/><rect x="15" y="5" width="4" height="8" rx="1"/>',
  bar: '<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20M6 7.5h.01M9 7.5h.01M17 7.5h1"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  terminal: '<path d="m5 7 5 5-5 5m7 0h7"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
  browser: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M12 3h1l4 7M4 8l4 7m4 6 4-7"/>',
  music: '<path d="M9 18V5l12-2v13M9 8l12-2"/><ellipse cx="6" cy="18" rx="3" ry="3"/><ellipse cx="18" cy="16" rx="3" ry="3"/>',
  settings: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/>',
  wifi: '<path d="M3 8a15 15 0 0 1 18 0M6 12a10 10 0 0 1 12 0m-9 4a5 5 0 0 1 6 0m-3 4h.01"/>',
  battery: '<rect x="2" y="6" width="17" height="12" rx="2"/><path d="M22 10v4M5 9h10v6H5Z"/>',
};
const svg = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.grid}</svg>`;
const mark = '<span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>';
const external = (url, text, cls = '') => `<a href="${url}" class="${cls}" target="_blank" rel="noopener noreferrer">${text}</a>`;
const apps = ['browser', 'terminal', 'folder', 'code', 'music', 'settings'];
const appIcons = (limit = 6) => apps.slice(0, limit).map((name, i) => `<span class="app-icon app-${name}">${svg(name)}${i === 0 || i === 2 ? '<i class="running"></i>' : ''}</span>`).join('');
const repo = name => `https://github.com/Okumai/${name}`;
let locale = 'en';
try { const saved = localStorage.getItem('okuma-language'); if (Object.hasOwn(languages, saved)) locale = saved; } catch { /* Storage may be unavailable. */ }

function render() {
  const t = translations[locale];
  document.documentElement.lang = locale;
  document.title = t.title;
  document.querySelector('meta[name="description"]').content = t.description;
  document.querySelector('meta[property="og:title"]').content = t.title;
  document.querySelector('meta[property="og:description"]').content = t.description;
  document.getElementById('app').innerHTML = `
    <a class="skip-link" href="#projects">${t.explore}</a>
    <header class="header" id="top">
      <div class="container header-inner">
        <a class="brand" href="#top" aria-label="ŌKUMA.dev">${mark}<span>ŌKUMA<span class="brand-dot">.dev</span></span></a>
        <nav class="navigation" aria-label="${t.menu}"><a href="#projects">${t.projects}</a>${external('https://github.com/Okumai', `GitHub ${svg('arrow')}`)}</nav>
        <details class="language-picker"><summary id="language" aria-label="${t.language}: ${languages[locale]}" aria-controls="language-options">${svg('globe')}<span>${languages[locale]}</span>${svg('down')}</summary><div class="language-options" id="language-options" role="group" aria-label="${t.language}">${Object.entries(languages).map(([code, label]) => `<button type="button" class="language-option" data-language="${code}" lang="${code}" aria-pressed="${locale === code}"><span>${label}</span>${locale === code ? svg('check') : ''}</button>`).join('')}</div></details>
      </div>
    </header>
    <main>
      <section class="hero container" aria-labelledby="hero-heading">
        <div class="hero-copy"><p class="eyebrow"><span class="status-dot"></span>${t.eyebrow}</p>
          <h1 id="hero-heading">${t.hero1}<br><em>${t.hero2}</em>${t.hero3 ? `<br>${t.hero3}` : ''}</h1>
          <p class="hero-intro">${t.intro}</p>
          <div class="hero-actions"><a class="button button-primary" href="#projects">${t.explore}${svg('right')}</a>${external('https://github.com/Okumai', `${svg('github')}${t.github}`, 'github-link')}</div>
          <div class="hero-meta"><span>${svg('check')}${t.built}</span><span>${svg('code')}${t.license}</span></div>
        </div>
        <div class="hero-art"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><span class="art-cross cross-one">+</span><span class="art-cross cross-two">+</span>
          <div class="desktop" role="img" aria-label="${t.preview}">
            <div class="desktop-top"><span class="desktop-time">${t.desktopDate}</span><span class="desktop-workspaces">${mark}<i class="active"></i><i></i><i></i></span><span class="desktop-system">${svg('wifi')}${svg('battery')}</span></div>
            <div class="desktop-wallpaper"><div class="mountain mountain-back"></div><div class="mountain mountain-mid"></div><div class="mountain mountain-front"></div><div class="desktop-greeting">${mark}<p>${t.desktopLine}</p><span>${t.desktopSub}</span></div></div>
            <div class="mini-launcher"><div class="mini-search">${svg('globe')}<span>${t.search}</span><kbd>⌘ K</kbd></div><div class="launcher-icons">${appIcons()}</div></div>
            <div class="desktop-dock">${appIcons(5)}<span class="dock-separator"></span><span class="app-icon app-grid">${svg('grid')}</span></div>
          </div>
          <span class="art-caption"><span class="status-dot"></span> ${t.illustration} <span>01 / 03</span></span>
        </div>
      </section>
      <section class="projects container" id="projects" aria-labelledby="projects-heading">
        <div class="section-heading"><div><p class="eyebrow">${t.sectionLabel}</p><h2 id="projects-heading">${t.sectionTitle}</h2><p class="section-intro">${t.sectionIntro}</p></div><span class="project-count">${t.count}</span></div>
        <nav class="category-navigation" aria-label="${t.categories}">${categories.map(category => `<a class="category-link" href="#category-${category.id}">${svg('grid')}${category.name}<span>${String(category.projects.length).padStart(2, '0')}</span></a>`).join('')}</nav>
        ${categories.map(category => `<section class="project-category" id="category-${category.id}" aria-labelledby="category-${category.id}-heading">
          <div class="category-heading"><h3 id="category-${category.id}-heading">${category.name}</h3><p>${t[category.descriptionKey]}</p></div>
          <div class="project-grid">${category.projects.map((project, index) => projectCard(project, String(index + 1).padStart(2, '0'), t)).join('')}</div>
          <p class="compatibility">${svg('grid')}<span>${t[category.compatibilityKey]}</span></p>
        </section>`).join('')}
      </section>
      <section class="about container" id="about" aria-labelledby="about-heading">
        <div class="about-heading"><p class="eyebrow">${t.aboutLabel}</p><h2 id="about-heading">${t.aboutTitle.replace('\n', '<br>')}</h2><div class="signature">Ōkuma<span>↗</span></div></div>
        <div class="about-copy"><p>${t.aboutText}</p><p>${t.aboutText2}</p><div class="open-note"><span class="open-icon">${svg('code')}</span><div><h3>${t.openTitle}</h3><p>${t.openText}</p></div></div>${external('https://github.com/Okumai', `${t.contribute}${svg('arrow')}`, 'contribute-link')}</div>
      </section>
    </main>
    <footer class="container footer"><div class="footer-top"><a class="brand" href="#top" aria-label="ŌKUMA.dev">${mark}<span>ŌKUMA<span class="brand-dot">.dev</span></span></a><p>${t.footer}</p><a class="back-top" href="#top">${t.top}<span>↑</span></a></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} ŌKUMA · ${t.rights}</span>${external('https://github.com/Okumai', `GitHub ${svg('arrow')}`)}</div></footer>`;
  const picker = document.querySelector('.language-picker');
  picker.addEventListener('click', event => {
    const option = event.target.closest('[data-language]');
    if (!option) return;
    const keyboard = event.detail === 0;
    const scroll = window.scrollY;
    locale = option.dataset.language;
    try { localStorage.setItem('okuma-language', locale); } catch { /* Keep language in memory. */ }
    render();
    if (keyboard) document.getElementById('language').focus({ preventScroll: true });
    window.scrollTo({ top: scroll, behavior: 'instant' });
  });
  picker.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      picker.open = false;
      document.getElementById('language').focus({ preventScroll: true });
    }
    if (event.target.id === 'language' && event.key === 'ArrowDown') {
      event.preventDefault();
      picker.open = true;
      picker.querySelector('[aria-pressed="true"]').focus();
    }
  });
  picker.addEventListener('focusout', event => {
    if (!picker.contains(event.relatedTarget)) picker.open = false;
  });
}
function projectCard(project, number, t) {
  const { name, key, sourceUrl, installUrl } = project;
  const isScript = Boolean(installUrl);
  const title = isScript ? name : `Okuma${name}`;
  const source = sourceUrl || repo(title);
  let visual = '';
  if (isScript) visual = `<div class="script-preview"><div class="script-search">${svg('globe')}<span>YouTube</span>${svg('code')}</div><div class="script-player ${key === 'youtubeShorts' ? 'script-player-shorts' : ''}">${svg(key === 'youtubeShorts' ? 'down' : 'browser')}</div><div class="script-controls">${svg(key === 'youtubeShorts' ? 'right' : 'check')}<i></i><i></i></div></div>`;
  if (key === 'dock') visual = `<div class="card-desktop-lines"><i></i><i></i><i></i></div><div class="card-dock">${appIcons(5)}</div>`;
  if (key === 'launch') visual = `<div class="card-launcher"><div class="card-search">${svg('globe')}<span>${t.search}</span></div><div class="card-app-grid">${appIcons()}</div></div>`;
  if (key === 'bar') visual = `<div class="card-bar"><span>09:41</span><span>${svg('sun')} 24°</span><span class="bar-center">${mark}<i></i><i></i><i></i></span><span>${svg('wifi')}${svg('battery')}</span></div><div class="card-widgets"><div class="weather-widget">${svg('sun')}<span>24°<small>18° — 26°</small></span></div><div class="memory-widget"><span>RAM <b>32%</b></span><div class="memory-track"><i></i></div><small>5.1 / 16 GB</small></div></div>`;
  return `<article class="project-card"><div class="card-visual visual-${key}" aria-hidden="true"><span class="visual-number">${number}</span>${visual}<span class="visual-label">${isScript ? 'USER SCRIPT' : key === 'bar' ? 'QUICKSHELL' : 'OMARCHY'}</span></div><div class="card-content"><div class="project-name"><span class="project-symbol">${svg(isScript ? 'code' : key === 'launch' ? 'grid' : key)}</span><h3>${title}</h3>${svg('arrow', 'name-arrow')}</div><p class="card-tag">${t[`${key}Tag`]}</p><p class="card-description">${t[`${key}Desc`]}</p><ul class="feature-list">${t[`${key}Features`].map(f => `<li>${f}</li>`).join('')}</ul><div class="card-links">${external(source, `${svg('github')}${t.source}${svg('arrow')}`)}${external(installUrl || `${source}#readme`, `${isScript ? t.install : t.docs}${svg('right')}`)}</div></div></article>`;
}
document.addEventListener('pointerdown', event => {
  const picker = document.querySelector('.language-picker');
  if (picker && !picker.contains(event.target)) picker.open = false;
});
render();
