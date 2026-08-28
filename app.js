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

const callPage = document.getElementById('call');
if (callPage && !callPage.querySelector('.original-song-guide')) {
  const guide = document.createElement('section');
  guide.className = 'section-block original-song-guide';
  guide.innerHTML = `
    <div class="section-heading"><h2>ORIGINAL SONGS</h2><span>オリジナル曲</span></div>
    <article class="card" style="border:1px solid #6f4c8f;background:linear-gradient(145deg,rgba(139,92,190,.16),rgba(255,255,255,.025));">
      <span class="badge">9/12 ミブ生誕で聴けます！</span>
      <h3 style="margin:10px 0 6px">走りながら聴く曲</h3>
      <p class="muted" style="margin:0 0 12px;font-size:11px;line-height:1.7">ミニワンマンで初披露されたオリジナル曲。ミブ生誕祭 ～壬生乱舞2026～ で披露予定！</p>
      <a class="primary live-ticket" href="https://www.youtube.com/watch?v=XH0axVmtF8s" target="_blank" rel="noopener noreferrer">動画で聴く →</a>
    </article>
    <div style="display:grid;gap:9px;margin-top:12px">
      ${['ちゅるん','ありんこ祭り','オシゴト','ニート☆スター','デストロちゃん'].map((song) => `<article class="card compact" style="padding:14px 16px"><p style="margin:0;font-size:13px;font-weight:800">${song}</p><p class="muted" style="margin:4px 0 0;font-size:10px">永遠のセツナ オリジナル曲</p></article>`).join('')}
    </div>
    <p class="notice" style="margin-top:10px">オリジナル曲は現在6曲掲載中。楽曲情報は順次追加予定です。</p>
  `;
  const credit = callPage.querySelector('.call-credit');
  if (credit) credit.insertAdjacentElement('afterend', guide);
  else callPage.appendChild(guide);
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

const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    const target = item.dataset.page;
    pages.forEach((page) => page.classList.toggle('active', page.id === target));
    navItems.forEach((nav) => nav.classList.toggle('active', nav === item));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});