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

const mibuBirthdayNext = `
  <div class="live-date"><strong>09.12</strong><span>SAT</span></div>
  <span class="badge">🎂 重要LIVE</span>
  <h3>ミブ生誕祭 ～壬生乱舞2026～</h3>
  <p class="live-place">📍 SOUNDNOTE OSAKA</p>
  <p class="muted live-time">OPEN 18:00 / START 18:30</p>
  <p class="live-note"><strong>いよいよ次のライブはミブ生誕祭！</strong></p>
  <a class="primary live-ticket" href="https://tiget.net/events/495969" target="_blank" rel="noopener noreferrer">チケットを購入する →</a>
`;

const homePage = document.getElementById('home');
if (homePage) {
  const homeHeadings = [...homePage.querySelectorAll('.eyebrow')];
  const todayHeading = homeHeadings.find((heading) => heading.textContent.trim() === "TODAY'S SCHEDULE");
  if (todayHeading) {
    let node = todayHeading.nextElementSibling;
    while (node && node.matches('article.card.next-live')) {
      const next = node.nextElementSibling;
      node.remove();
      node = next;
    }
    todayHeading.remove();
  }

  const nextHeading = [...homePage.querySelectorAll('.eyebrow')].find((heading) => heading.textContent.trim() === 'NEXT LIVE');
  if (nextHeading) {
    nextHeading.textContent = 'NEXT LIVE · 9/12';
    let nextLive = nextHeading.nextElementSibling;
    if (nextLive?.matches('article.card.next-live')) {
      nextLive.innerHTML = mibuBirthdayNext;
      nextLive.className = 'card next-live birthday-schedule';
      let node = nextLive.nextElementSibling;
      while (node && node.matches('article.card.next-live')) {
        const next = node.nextElementSibling;
        node.remove();
        node = next;
      }
    }
  }

  if (!homePage.querySelector('.about-fan-app')) {
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
}

const livePage = document.getElementById('live');
if (livePage) {
  const liveList = livePage.querySelector('.live-list');
  if (liveList) {
    liveList.querySelectorAll('.sep05-live, .sep06-live').forEach((item) => item.remove());

    if (!liveList.querySelector('.sep09-live')) {
      const sep09 = document.createElement('article');
      sep09.className = 'card live-card sep09-live';
      sep09.style.marginTop = '14px';
      sep09.innerHTML = `
        <div class="live-card-top">
          <div class="live-date"><strong>09.09</strong><span>WED</span></div>
          <span class="badge">LIVE</span>
        </div>
        <h3>SHOW IN OSAKA</h3>
        <p class="live-place">📍 Live Bar BK</p>
        <p class="muted live-time">OPEN 18:20 / START 18:40</p>
        <p class="muted live-time">🎤 19:00–19:20 / 📸 20:00–21:00</p>
        <p class="live-note">予約 ¥1,500 / 当日 ¥2,500（+1D）</p>
        <a class="primary live-ticket" href="https://ticketdive.com/event/SIO0909" target="_blank" rel="noopener noreferrer">チケットを購入する →</a>
      `;
      const firstBirthday = liveList.querySelector('.birthday-schedule');
      if (firstBirthday) liveList.insertBefore(sep09, firstBirthday);
      else liveList.prepend(sep09);
    }

    if (!liveList.querySelector('.sep13-live')) {
      const sep13 = document.createElement('article');
      sep13.className = 'card live-card sep13-live';
      sep13.style.marginTop = '14px';
      sep13.innerHTML = `
        <div class="live-card-top">
          <div class="live-date"><strong>09.13</strong><span>SUN</span></div>
          <span class="badge">LIVE</span>
        </div>
        <h3>SHOW IN OSAKA</h3>
        <p class="live-place">📍 Live Bar BK</p>
        <p class="muted live-time">OPEN 12:30 / START 12:45</p>
        <p class="muted live-time">🎤 13:05–13:25 / 📸 14:30–15:30</p>
        <p class="live-note">予約 ¥1,500 / 当日 ¥2,500（+1D）</p>
        <a class="primary live-ticket" href="https://ticketdive.com/event/SIO0913" target="_blank" rel="noopener noreferrer">チケットを購入する →</a>
      `;
      const birthdayCards = [...liveList.querySelectorAll('.birthday-schedule')];
      const oct03 = birthdayCards.find((card) => card.textContent.includes('10.03'));
      if (oct03) liveList.insertBefore(sep13, oct03);
      else liveList.appendChild(sep13);
    }
  }
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
