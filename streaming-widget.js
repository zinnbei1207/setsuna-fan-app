// ホーム用「配信情報」ウィジェット
// 日本時間の日付を基準に、配信強化週間の「今日の配信予定」と
// うーたん生誕チケット配信の次回予定を自動表示する。
(function renderStreamingWidget() {
  const home = document.getElementById('home');
  if (!home || home.querySelector('.streaming-widget')) return;

  const strengthenWeek = {
    '2026-09-14': ['うーたん', 'ミブ'],
    '2026-09-15': ['ミブ'],
    '2026-09-16': ['ミブ', 'えら'],
    '2026-09-17': ['うーたん', 'ミブ', 'えら'],
    '2026-09-18': ['うーたん', 'えら']
  };

  const utanTicketStreams = [
    { date: '2026-09-16', time: '未定' },
    { date: '2026-09-17', time: '未定' },
    { date: '2026-09-19', time: '未定' },
    { date: '2026-09-20', time: '未定' },
    { date: '2026-09-21', time: '19:00〜' },
    { date: '2026-09-23', time: '19:00〜' },
    { date: '2026-09-26', time: '未定（リアバ!!）' },
    { date: '2026-09-27', time: '未定' },
    { date: '2026-09-28', time: '未定' },
    { date: '2026-09-29', time: '19:00〜' },
    { date: '2026-09-30', time: '19:00〜' }
  ];

  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(new Date());
  const get = (type) => parts.find((part) => part.type === type)?.value;
  const today = `${get('year')}-${get('month')}-${get('day')}`;

  const todayMembers = strengthenWeek[today] || null;
  const nextTicketStream = utanTicketStreams.find((item) => item.date >= today) || null;
  if (!todayMembers && !nextTicketStream) return;

  const formatDate = (date) => {
    const [, month, day] = date.split('-');
    return `${Number(month)}/${Number(day)}`;
  };

  const section = document.createElement('section');
  section.className = 'section-block streaming-widget';
  section.innerHTML = `
    <div class="section-heading"><h2>STREAMING</h2><span>配信情報</span></div>
    <article class="streaming-card">
      ${todayMembers ? `
        <div class="streaming-row streaming-today">
          <div class="streaming-icon">📡</div>
          <div class="streaming-copy">
            <span class="streaming-label">永遠のセツナ 配信強化週間</span>
            <strong>今日の配信予定：${todayMembers.join('・')}</strong>
            <small>配信時間・変更は各メンバーの告知をご確認ください。</small>
            <a class="streaming-image-link" href="streaming_week_202609.jpeg" target="_blank" rel="noopener noreferrer">告知画像を見る →</a>
          </div>
        </div>
      ` : ''}
      ${nextTicketStream ? `
        <div class="streaming-row ${todayMembers ? 'streaming-divider' : ''}">
          <div class="streaming-icon">🎫</div>
          <div class="streaming-copy">
            <span class="streaming-label">うーたん生誕 チケット配信</span>
            <strong>次回 ${formatDate(nextTicketStream.date)}　${nextTicketStream.time}</strong>
            <small>10/3 うーたん生誕祭に向けた「終われまてん配信」</small>
            <a class="streaming-image-link" href="utan_stream_schedule_202609.jpeg" target="_blank" rel="noopener noreferrer">予定表を見る →</a>
          </div>
        </div>
      ` : ''}
    </article>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .streaming-widget{margin-top:26px}
    .streaming-widget .section-heading h2{color:#bfe9ff}
    .streaming-card{overflow:hidden;border:1px solid #4d526b;border-radius:18px;background:radial-gradient(circle at 90% 0,rgba(111,183,255,.16),transparent 38%),linear-gradient(145deg,#1d2030,#191720);box-shadow:0 12px 35px rgba(0,0,0,.18)}
    .streaming-row{display:flex;gap:12px;padding:16px 17px;align-items:flex-start}
    .streaming-divider{border-top:1px solid rgba(174,191,221,.16)}
    .streaming-icon{flex:0 0 34px;width:34px;height:34px;display:flex;align-items:center;justify-content:center;border-radius:11px;background:rgba(255,255,255,.06);font-size:17px}
    .streaming-copy{min-width:0;display:flex;flex-direction:column;gap:5px;flex:1}
    .streaming-label{font-size:9px;font-weight:800;letter-spacing:.08em;color:#a8d9ff}
    .streaming-copy strong{font-size:13px;line-height:1.55;color:#f6f7ff}
    .streaming-copy small{font-size:9px;line-height:1.6;color:#9798aa}
    .streaming-image-link{align-self:flex-start;margin-top:4px;padding:7px 10px;border:1px solid rgba(168,217,255,.25);border-radius:999px;color:#bfe9ff;text-decoration:none;font-size:9px;font-weight:800;background:rgba(168,217,255,.05)}
  `;
  document.head.appendChild(style);

  // NEXT LIVE のカードと注意文をひとまとまりとして扱い、その直後、BIRTHDAY EVENT の前に置く。
  const nextHeading = [...home.querySelectorAll('.eyebrow')].find((heading) => heading.textContent.trim().startsWith('NEXT LIVE'));
  if (nextHeading) {
    let insertBefore = nextHeading.nextElementSibling;
    while (insertBefore && insertBefore.matches('article.card.next-live, .auto-live-day, .unreleased-live-caution')) {
      insertBefore = insertBefore.nextElementSibling;
    }
    home.insertBefore(section, insertBefore);
  } else {
    home.prepend(section);
  }
})();

// 9/17 SHOW IN OSAKA：公式告知の販売期間に合わせてチケットボタンを自動制御する。
(function renderSep17TicketSalesWindow() {
  const ticketUrl = 'https://ticketdive.com/event/SIO0917';
  const saleStart = new Date('2026-09-16T22:00:00+09:00');
  const saleEnd = new Date('2026-09-17T18:30:00+09:00');
  const now = new Date();
  const links = [...document.querySelectorAll(`a.live-ticket[href="${ticketUrl}"]`)];

  links.forEach((link) => {
    const card = link.closest('.card');
    if (card && !card.querySelector('.ticket-sales-window')) {
      const sales = document.createElement('p');
      sales.className = 'muted live-time ticket-sales-window';
      sales.textContent = '🎫 チケット販売：9/16 22:00〜9/17 18:30';
      link.insertAdjacentElement('beforebegin', sales);
    }

    if (now < saleStart) {
      link.textContent = 'チケット販売 9/16 22:00〜';
      link.removeAttribute('href');
      link.setAttribute('aria-disabled', 'true');
      link.style.pointerEvents = 'none';
      link.style.opacity = '.55';
    } else if (now >= saleEnd) {
      link.textContent = 'チケット販売終了';
      link.removeAttribute('href');
      link.setAttribute('aria-disabled', 'true');
      link.style.pointerEvents = 'none';
      link.style.opacity = '.55';
    } else {
      link.textContent = 'チケットを購入する →';
    }
  });
})();