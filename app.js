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
// status: 'published' = 公開して表示 / 'unreleased' = 内部保存のみ（画面には絶対表示しない）
// 未解禁予定は先に unreleased で登録し、公式解禁後に詳細を追記して published へ変更する。
// homeUntil は「ホームの次回ライブ候補から外す時刻」。特典会終了時刻を基本に設定。
const liveEvents = [
  {
    id: '2026-09-09-show-in-osaka', status: 'published',
    date: '2026-09-09', day: 'WED', homeUntil: '2026-09-09T21:00:00+09:00',
    title: 'SHOW IN OSAKA', place: 'Live Bar BK',
    openStart: 'OPEN 18:20 / START 18:40', performance: '🎤 19:00–19:20 / 📸 20:00–21:00',
    note: '予約 ¥1,500 / 当日 ¥2,500（+1D）', ticket: 'https://ticketdive.com/event/SIO0909', badge: 'LIVE'
  },
  {
    id: '2026-09-12-mibu-birthday', status: 'published',
    date: '2026-09-12', day: 'SAT', homeUntil: '2026-09-12T23:59:59+09:00',
    title: 'ミブ生誕祭 ～壬生乱舞2026～', place: 'SOUNDNOTE OSAKA',
    openStart: 'OPEN 18:00 / START 18:30', performance: '', note: '',
    ticket: 'https://tiget.net/events/495969', badge: '重要LIVE'
  },
  {
    id: '2026-09-13-show-in-osaka', status: 'published',
    date: '2026-09-13', day: 'SUN', homeUntil: '2026-09-13T15:30:00+09:00',
    title: 'SHOW IN OSAKA', place: 'Live Bar BK',
    openStart: 'OPEN 12:30 / START 12:45', performance: '🎤 13:05–13:25 / 📸 14:30–15:30',
    note: '予約 ¥1,500 / 当日 ¥2,500（+1D）', ticket: 'https://ticketdive.com/event/SIO0913', badge: 'LIVE'
  },

  // ===== 未解禁予定：内部管理専用。公式解禁まで画面には出さない =====
  { id: '2026-09-13-unreleased-osaka-1', status: 'unreleased', date: '2026-09-13', day: 'SUN', title: '大阪【未解禁】', place: '', homeUntil: '2026-09-13T23:59:59+09:00' },
  { id: '2026-09-13-unreleased-osaka-2', status: 'unreleased', date: '2026-09-13', day: 'SUN', title: '大阪【未解禁】', place: '', homeUntil: '2026-09-13T23:59:59+09:00' },
  { id: '2026-09-17-unreleased-umeda', status: 'unreleased', date: '2026-09-17', day: 'THU', title: '梅田【未解禁】', place: '', homeUntil: '2026-09-17T23:59:59+09:00' },
  { id: '2026-09-19-unreleased-umeda', status: 'unreleased', date: '2026-09-19', day: 'SAT', title: '梅田【未解禁】', place: '', homeUntil: '2026-09-19T23:59:59+09:00' },
  { id: '2026-09-19-unreleased-namba', status: 'unreleased', date: '2026-09-19', day: 'SAT', title: '難波【未解禁】', place: '', homeUntil: '2026-09-19T23:59:59+09:00' },
  { id: '2026-09-20-unreleased-osaka', status: 'unreleased', date: '2026-09-20', day: 'SUN', title: '大阪【未解禁】', place: '', homeUntil: '2026-09-20T23:59:59+09:00' },
  { id: '2026-09-22-unreleased-fukuoka', status: 'unreleased', date: '2026-09-22', day: 'TUE', title: '福岡【未解禁】', place: '', homeUntil: '2026-09-22T23:59:59+09:00' },
  { id: '2026-09-26-unreleased-osaka-1', status: 'unreleased', date: '2026-09-26', day: 'SAT', title: '大阪【未解禁】', place: '', homeUntil: '2026-09-26T23:59:59+09:00' },
  { id: '2026-09-26-unreleased-osaka-2', status: 'unreleased', date: '2026-09-26', day: 'SAT', title: '大阪【未解禁】', place: '', homeUntil: '2026-09-26T23:59:59+09:00' },
  { id: '2026-09-27-unreleased-osaka-1', status: 'unreleased', date: '2026-09-27', day: 'SUN', title: '大阪【未解禁】', place: '', homeUntil: '2026-09-27T23:59:59+09:00' },
  { id: '2026-09-27-unreleased-osaka-2', status: 'unreleased', date: '2026-09-27', day: 'SUN', title: '大阪【未解禁】', place: '', homeUntil: '2026-09-27T23:59:59+09:00' },
  { id: '2026-09-28-unreleased-umeda', status: 'unreleased', date: '2026-09-28', day: 'MON', title: '梅田【未解禁】', place: '', homeUntil: '2026-09-28T23:59:59+09:00' },

  {
    id: '2026-10-03-utan-birthday', status: 'published',
    date: '2026-10-03', day: 'SAT', homeUntil: '2026-10-03T23:59:59+09:00',
    title: 'うーたん生誕祭「きらめき魔法少女うーたん降臨っ♡」', place: 'Pollux Theater',
    openStart: 'OPEN 18:10 / START 18:30', performance: '', note: '',
    ticket: 'https://tiget.net/events/503695', badge: '重要LIVE'
  },
  { id: '2026-10-04-unreleased-osaka', status: 'unreleased', date: '2026-10-04', day: 'SUN', title: '大阪【未解禁】', place: '', homeUntil: '2026-10-04T23:59:59+09:00' }
].sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));

const publishedLiveEvents = () => liveEvents.filter((event) => event.status === 'published');
const upcomingPublishedLiveEvents = (now = new Date()) => publishedLiveEvents().filter((event) => now < new Date(event.homeUntil));

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
  ${event.place ? `<p class="live-place">📍 ${event.place}</p>` : ''}
  ${event.openStart ? `<p class="muted live-time">${event.openStart}</p>` : ''}
  ${event.performance ? `<p class="muted live-time">${event.performance}</p>` : ''}
  ${event.note ? `<p class="live-note">${event.note}</p>` : ''}
  ${event.ticket ? `<a class="primary live-ticket" href="${event.ticket}" target="_blank" rel="noopener noreferrer">チケットを購入する →</a>` : ''}
`;

function upcomingTwoLiveDates(now = new Date()) {
  // 未解禁イベントは NEXT LIVE の日付計算にも絶対に使わない。
  const upcoming = upcomingPublishedLiveEvents(now);
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
    // 公開済みかつ終了前のライブだけを表示。Google Calendar側の履歴は消さない。
    upcomingPublishedLiveEvents().forEach((event, index) => {
      const card = document.createElement('article');
      card.className = `card live-card auto-live-event ${event.badge === '重要LIVE' ? 'birthday-schedule' : ''}`;
      if (index > 0) card.style.marginTop = '14px';
      card.innerHTML = `<div class="live-card-top">${eventLines(event)}</div>`;
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

// 予定ページはTimeTree埋め込みではなく、アプリの公開LIVEデータをカレンダー表示する。
// Google Calendarへの同期も同じliveEventsを元にするため、表示と同期元を一本化できる。
(function renderInAppLiveCalendar() {
  if (!livePage) return;
  const iframe = livePage.querySelector('iframe[title="カレンダー"]');
  const calendarCard = iframe?.closest('article.card');
  if (!calendarCard) return;

  // 終了済みのライブはアプリの予定表示から除外する。Google Calendarのイベント自体は残る。
  const events = upcomingPublishedLiveEvents();
  const monthKeys = [...new Set(events.map((event) => event.date.slice(0, 7)))].sort();
  if (!monthKeys.length) return;

  const liveCards = [...livePage.querySelectorAll('.auto-live-event')];
  events.forEach((event, index) => {
    if (liveCards[index]) liveCards[index].dataset.eventId = event.id;
  });

  const style = document.createElement('style');
  style.textContent = `
    .setsuna-calendar{padding:16px!important;overflow:hidden;background:radial-gradient(circle at 90% 0,rgba(156,115,230,.16),transparent 34%),rgba(31,27,39,.96)!important}
    .setsuna-cal-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}
    .setsuna-cal-title{display:flex;flex-direction:column;gap:3px}.setsuna-cal-title strong{font-size:13px;letter-spacing:.12em}.setsuna-cal-title span{font-size:10px;color:#aaa4b4}
    .setsuna-cal-months{display:flex;gap:6px}.setsuna-cal-month{border:1px solid #443750;background:#211d29;color:#9e95aa;border-radius:999px;padding:7px 10px;font-size:10px;font-weight:800}.setsuna-cal-month.active{background:#8061b7;border-color:#a782df;color:#fff}
    .setsuna-cal-week,.setsuna-cal-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:5px}.setsuna-cal-week{margin-bottom:5px}.setsuna-cal-week span{text-align:center;font-size:9px;color:#81798a;font-weight:800;padding:3px 0}.setsuna-cal-week span:first-child{color:#d18b9c}.setsuna-cal-week span:last-child{color:#8ca4da}
    .setsuna-cal-day{min-height:52px;border:1px solid #312b3b;border-radius:11px;background:#19151f;color:#eee9f3;padding:7px 4px;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:6px;font-size:11px}.setsuna-cal-day.empty{visibility:hidden}.setsuna-cal-day.has-live{cursor:pointer;border-color:#674e83;background:linear-gradient(145deg,#2b2037,#201a27);box-shadow:inset 0 0 0 1px rgba(178,139,220,.08)}.setsuna-cal-day.important{border-color:#9b6bd2;background:radial-gradient(circle at 75% 20%,rgba(167,118,232,.26),transparent 45%),linear-gradient(145deg,#32213f,#211827)}.setsuna-cal-day strong{font-size:12px}.setsuna-cal-dots{display:flex;gap:3px;min-height:5px}.setsuna-cal-dot{width:5px;height:5px;border-radius:50%;background:#a986db}.setsuna-cal-day.important .setsuna-cal-dot{box-shadow:0 0 7px rgba(199,170,255,.75)}
    .setsuna-cal-legend{display:flex;align-items:center;gap:7px;margin:12px 2px 0;color:#8f8799;font-size:9px;line-height:1.5}.setsuna-cal-legend i{width:6px;height:6px;border-radius:50%;background:#a986db;box-shadow:0 0 7px rgba(199,170,255,.55)}
    .auto-live-event.calendar-focus{animation:setsunaPulse .8s ease}@keyframes setsunaPulse{0%{box-shadow:0 0 0 0 rgba(167,118,232,.65)}100%{box-shadow:0 0 0 14px rgba(167,118,232,0)}}
  `;
  document.head.appendChild(style);

  calendarCard.classList.add('setsuna-calendar');
  calendarCard.removeAttribute('style');
  calendarCard.innerHTML = `
    <div class="setsuna-cal-head">
      <div class="setsuna-cal-title"><strong>LIVE CALENDAR</strong><span>これからのライブ予定</span></div>
      <div class="setsuna-cal-months"></div>
    </div>
    <div class="setsuna-cal-week"><span>日</span><span>月</span><span>火</span><span>水</span><span>木</span><span>金</span><span>土</span></div>
    <div class="setsuna-cal-grid"></div>
    <div class="setsuna-cal-legend"><i></i><span>紫の印がライブ日。タップすると詳細へ移動します。</span></div>
  `;

  const monthsWrap = calendarCard.querySelector('.setsuna-cal-months');
  const grid = calendarCard.querySelector('.setsuna-cal-grid');

  const renderMonth = (key) => {
    const [yearText, monthText] = key.split('-');
    const year = Number(yearText);
    const month = Number(monthText);
    const firstDay = new Date(year, month - 1, 1).getDay();
    const lastDate = new Date(year, month, 0).getDate();
    const byDate = new Map();
    events.filter((event) => event.date.startsWith(`${key}-`)).forEach((event) => {
      if (!byDate.has(event.date)) byDate.set(event.date, []);
      byDate.get(event.date).push(event);
    });

    grid.innerHTML = '';
    for (let i = 0; i < firstDay; i += 1) {
      const blank = document.createElement('div');
      blank.className = 'setsuna-cal-day empty';
      grid.appendChild(blank);
    }

    for (let day = 1; day <= lastDate; day += 1) {
      const date = `${yearText}-${monthText}-${String(day).padStart(2, '0')}`;
      const dayEvents = byDate.get(date) || [];
      const button = document.createElement(dayEvents.length ? 'button' : 'div');
      button.className = `setsuna-cal-day${dayEvents.length ? ' has-live' : ''}${dayEvents.some((event) => event.badge === '重要LIVE') ? ' important' : ''}`;
      button.innerHTML = `<strong>${day}</strong><span class="setsuna-cal-dots">${dayEvents.slice(0, 3).map(() => '<i class="setsuna-cal-dot"></i>').join('')}</span>`;
      if (dayEvents.length) {
        button.type = 'button';
        button.setAttribute('aria-label', `${month}月${day}日 ${dayEvents.map((event) => event.title).join('、')}`);
        button.addEventListener('click', () => {
          const target = livePage.querySelector(`[data-event-id="${dayEvents[0].id}"]`);
          if (!target) return;
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          target.classList.remove('calendar-focus');
          requestAnimationFrame(() => target.classList.add('calendar-focus'));
          setTimeout(() => target.classList.remove('calendar-focus'), 900);
        });
      }
      grid.appendChild(button);
    }
  };

  monthKeys.forEach((key, index) => {
    const [, monthText] = key.split('-');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `setsuna-cal-month${index === 0 ? ' active' : ''}`;
    button.textContent = `${Number(monthText)}月`;
    button.addEventListener('click', () => {
      [...monthsWrap.children].forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      renderMonth(key);
    });
    monthsWrap.appendChild(button);
  });

  // 月が変わって前月のライブがすべて終了したら、先頭の月が自動で次月になる。
  renderMonth(monthKeys[0]);
})();