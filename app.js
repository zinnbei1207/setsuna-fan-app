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

// ライブ情報はここだけ更新すれば、ホームと予定ページの両方に反映されます。
// homeUntil は「ホームの次回ライブ候補から外す時刻」。特典会終了時刻を基本に設定。
const liveEvents = [
  {
    id: '2026-09-09-show-in-osaka',
    date: '2026-09-09', day: 'WED', homeUntil: '2026-09-09T21:00:00+09:00',
    title: 'SHOW IN OSAKA', place: 'Live Bar BK',
    openStart: 'OPEN 18:20 / START 18:40', performance: '🎤 19:00–19:20 / 📸 20:00–21:00',
    note: '予約 ¥1,500 / 当日 ¥2,500（+1D）', ticket: 'https://ticketdive.com/event/SIO0909', badge: 'LIVE'
  },
  {
    id: '2026-09-12-mibu-birthday',
    date: '2026-09-12', day: 'SAT', homeUntil: '2026-09-12T23:59:59+09:00',
    title: 'ミブ生誕祭 ～壬生乱舞2026～', place: 'SOUNDNOTE OSAKA',
    openStart: 'OPEN 18:00 / START 18:30', performance: '', note: '',
    ticket: 'https://tiget.net/events/495969', badge: '重要LIVE'
  },
  {
    id: '2026-09-13-show-in-osaka',
    date: '2026-09-13', day: 'SUN', homeUntil: '2026-09-13T15:30:00+09:00',
    title: 'SHOW IN OSAKA', place: 'Live Bar BK',
    openStart: 'OPEN 12:30 / START 12:45', performance: '🎤 13:05–13:25 / 📸 14:30–15:30',
    note: '予約 ¥1,500 / 当日 ¥2,500（+1D）', ticket: 'https://ticketdive.com/event/SIO0913', badge: 'LIVE'
  },
  {
    id: '2026-10-03-utan-birthday',
    date: '2026-10-03', day: 'SAT', homeUntil: '2026-10-03T23:59:59+09:00',
    title: 'うーたん生誕祭「きらめき魔法少女うーたん降臨っ♡」', place: 'Pollux Theater',
    openStart: 'OPEN 18:10 / START 18:30', performance: '', note: '',
    ticket: 'https://tiget.net/events/503695', badge: '重要LIVE'
  }
].sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));

const shortDate = (date) => {
  const [, month, day] = date.split('-');
  return `${month}.${day}`;
};
const headingDate = (date) => {
  const [, month, day] = date.split('-');
  return `${Number(month)}/${Number(day)}`;
};
const eventLines = (event) => `
  <div class="live-date"><strong>${shortDate(event.date)}</strong><span>${event.day}</span></div>
  <span class="badge">${event.badge || 'LIVE'}</span>
  <h3>${event.title}</h3>
  <p class="live-place">📍 ${event.place}</p>
  ${event.openStart ? `<p class="muted live-time">${event.openStart}</p>` : ''}
  ${event.performance ? `<p class="muted live-time">${event.performance}</p>` : ''}
  ${event.note ? `<p class="live-note">${event.note}</p>` : ''}
  ${event.ticket ? `<a class="primary live-ticket" href="${event.ticket}" target="_blank" rel="noopener noreferrer">チケットを購入する →</a>` : ''}
`;

function upcomingTwoLiveDates(now = new Date()) {
  const upcoming = liveEvents.filter((event) => now < new Date(event.homeUntil));
  const dates = [...new Set(upcoming.map((event) => event.date))].slice(0, 2);
  return { upcoming, dates };
}

const homePage = document.getElementById('home');
if (homePage) {
  const nextHeading = [...homePage.querySelectorAll('.eyebrow')].find((heading) => heading.textContent.trim().startsWith('NEXT LIVE'));
  if (nextHeading) {
    let node = nextHeading.nextElementSibling;
    while (node && node.matches('article.card.next-live, .auto-live-day')) {
      const next = node.nextElementSibling;
      node.remove();
      node = next;
    }

    const { upcoming, dates } = upcomingTwoLiveDates();
    nextHeading.textContent = dates.length ? `NEXT LIVE · ${dates.map(headingDate).join(' ＆ ')}` : 'NEXT LIVE';

    dates.forEach((date, dateIndex) => {
      const dayWrap = document.createElement('div');
      dayWrap.className = 'auto-live-day';
      if (dateIndex > 0) dayWrap.style.marginTop = '18px';
      const eventsForDay = upcoming.filter((event) => event.date === date);
      eventsForDay.forEach((event, eventIndex) => {
        const card = document.createElement('article');
        card.className = 'card next-live';
        if (eventIndex > 0) card.style.marginTop = '14px';
        card.innerHTML = eventLines(event);
        dayWrap.appendChild(card);
      });
      nextHeading.parentNode.insertBefore(dayWrap, node);
    });
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
    liveList.innerHTML = '';
    liveEvents.forEach((event, index) => {
      const card = document.createElement('article');
      card.className = `card live-card auto-live-event ${event.badge === '重要LIVE' ? 'birthday-schedule' : ''}`;
      if (index > 0) card.style.marginTop = '14px';
      card.innerHTML = `<div class="live-card-top">${eventLines(event)}</div>`;
      // eventLines の日付・badge以外を top の外へ戻して既存デザインを維持
      const dateBox = card.querySelector('.live-date');
      const badge = card.querySelector('.badge');
      const top = card.querySelector('.live-card-top');
      [...top.children].forEach((child) => {
        if (child !== dateBox && child !== badge) card.appendChild(child);
      });
      liveList.appendChild(card);
    });
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
