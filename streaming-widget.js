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