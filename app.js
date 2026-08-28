const appLinks = [
  { rel: 'apple-touch-icon', href: 'apple-touch-icon.jpg', sizes: '180x180' },
  { rel: 'icon', href: 'apple-touch-icon.jpg', type: 'image/jpeg' },
  { rel: 'manifest', href: 'manifest.webmanifest' }
];

appLinks.forEach((attrs) => {
  if (document.head.querySelector(`link[rel="${attrs.rel}"]`)) return;
  const link = document.createElement('link');
  Object.entries(attrs).forEach(([key, value]) => link.setAttribute(key, value));
  document.head.appendChild(link);
});

[
  ['apple-mobile-web-app-capable', 'yes'],
  ['apple-mobile-web-app-title', '永遠のセツナ'],
  ['mobile-web-app-capable', 'yes']
].forEach(([name, content]) => {
  if (document.head.querySelector(`meta[name="${name}"]`)) return;
  const meta = document.createElement('meta');
  meta.name = name;
  meta.content = content;
  document.head.appendChild(meta);
});

const homePage = document.getElementById('home');
if (homePage && !homePage.querySelector('.about-fan-app')) {
  const about = document.createElement('section');
  about.className = 'section-block about-fan-app';
  about.innerHTML = `
    <div class="section-heading"><h2>ABOUT THIS APP</h2><span>このアプリについて</span></div>
    <article class="card compact">
      <p style="margin:0;font-size:12px;font-weight:800;line-height:1.8">永遠のセツナをもっと楽しむために、ファンのジンベイが個人で制作・運営している非公式ファンアプリです。</p>
      <p class="muted" style="margin:8px 0 0;font-size:11px;line-height:1.8">公式アプリではありません。ライブ予定などは変更される場合があるため、最新情報は公式告知もあわせてご確認ください。</p>
    </article>
  `;
  homePage.appendChild(about);
}

const bottomNav = document.querySelector('.bottom-nav');
if (bottomNav && !bottomNav.querySelector('.song-nav-item')) {
  const songLink = document.createElement('a');
  songLink.className = 'nav-item song-nav-item';
  songLink.href = 'songs.html';
  songLink.setAttribute('aria-label', '楽曲');
  songLink.innerHTML = '🎵<small>楽曲</small>';
  const videoNav = bottomNav.querySelector('[data-page="video"]');
  if (videoNav) bottomNav.insertBefore(songLink, videoNav);
  else bottomNav.appendChild(songLink);

  bottomNav.style.gridTemplateColumns = 'repeat(6, minmax(0, 1fr))';
  songLink.style.textDecoration = 'none';
}

const videoPage = document.getElementById('video');
if (videoPage) {
  const pickup = [...videoPage.querySelectorAll('.section-block')].find((section) => section.querySelector('.section-heading h2')?.textContent.trim() === 'PICK UP VIDEO');
  if (pickup) {
    const label = pickup.querySelector('.section-heading span');
    if (label) label.textContent = '走りながら聴く曲';
    const iframe = pickup.querySelector('iframe');
    if (iframe) iframe.title = 'PICK UP VIDEO 走りながら聴く曲';
    const card = pickup.querySelector('.card');
    if (card) {
      const title = card.querySelector('p[style*="font-weight:800"]');
      if (title) title.textContent = '走りながら聴く曲';
      const desc = card.querySelector('.muted');
      if (desc) desc.innerHTML = 'ミニワンマンで初披露されたオリジナル曲。<br><strong style="color:#e2cef8">9/12 ミブ生誕祭で聴けます！</strong>';
    }
  }
}

const navItems = document.querySelectorAll('.nav-item[data-page]');
const pages = document.querySelectorAll('.page');

function showPage(target, smooth = true) {
  const exists = [...pages].some((page) => page.id === target);
  if (!exists) return;
  pages.forEach((page) => page.classList.toggle('active', page.id === target));
  navItems.forEach((nav) => nav.classList.toggle('active', nav.dataset.page === target));
  window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
}

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    const target = item.dataset.page;
    showPage(target);
    history.replaceState(null, '', `#${target}`);
  });
});

const initialHash = location.hash.replace('#', '');
if (initialHash) showPage(initialHash, false);