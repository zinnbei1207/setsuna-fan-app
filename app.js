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

// Birthday support / カンパ案内
const importantBlock = document.querySelector('#home .important-block');
if (importantBlock) {
  const supportStyle = document.createElement('style');
  supportStyle.textContent = `
    .birthday-support-block{margin-top:30px}
    .birthday-support-block .section-heading h2{color:#eadcff}
    .support-intro{margin:-2px 2px 12px;color:#9991a2;font-size:11px;line-height:1.65}
    .support-card{overflow:hidden;border-radius:22px;border:1px solid #4d3d5c;background:linear-gradient(145deg,#211a29,#151119);box-shadow:0 16px 38px rgba(0,0,0,.2)}
    .support-card+.support-card{margin-top:16px}
    .support-card.mibu-support{border-color:#704ca2;background:radial-gradient(circle at 85% 8%,rgba(151,90,214,.2),transparent 34%),linear-gradient(145deg,#25172f,#151019)}
    .support-card.utan-support{border-color:#536ca5;background:radial-gradient(circle at 82% 10%,rgba(95,153,255,.18),transparent 36%),linear-gradient(145deg,#171d31,#12131d)}
    .support-poster-wrap{position:relative;background:#0e0b12;min-height:150px}
    .support-poster{display:block;width:100%;height:auto;max-height:520px;object-fit:contain;background:#0e0b12}
    .support-poster-placeholder{display:none;min-height:170px;padding:26px 18px;align-items:center;justify-content:center;text-align:center;color:#847a8d;font-size:11px;line-height:1.7;background:linear-gradient(135deg,#211a29,#151119)}
    .support-card-body{padding:17px 18px 19px}
    .support-kicker{font-size:9px;letter-spacing:.17em;font-weight:800;color:#c9afe9}
    .utan-support .support-kicker{color:#abc8ff}
    .support-card h3{margin:6px 0 8px;font-size:20px}
    .support-summary{margin:0;color:#cfc7d7;font-size:11px;line-height:1.7}
    .support-price-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}
    .support-price-row span{font-size:10px;padding:6px 9px;border-radius:999px;background:#2b2234;color:#e1d5eb;border:1px solid #41324d}
    .utan-support .support-price-row span{background:#20283a;border-color:#344766;color:#d6e5ff}
    .support-shop-button{display:block;margin-top:14px;padding:13px;border-radius:13px;text-align:center;text-decoration:none;font-weight:800;font-size:12px;color:#fff;background:linear-gradient(90deg,#7650a9,#9a6bd4)}
    .utan-support .support-shop-button{background:linear-gradient(90deg,#526fa6,#7f79c5)}
    .support-note{margin:10px 2px 0;color:#777080;font-size:9px;line-height:1.6}
  `;
  document.head.appendChild(supportStyle);

  const supportBlock = document.createElement('section');
  supportBlock.className = 'section-block birthday-support-block';
  supportBlock.innerHTML = `
    <div class="section-heading"><h2>BIRTHDAY SUPPORT</h2><span>生誕応援企画</span></div>
    <p class="support-intro">生誕祭をもっと華やかに。カンパの内容・特典はこちらから確認できます。</p>

    <article class="support-card mibu-support">
      <div class="support-poster-wrap">
        <img class="support-poster" src="mibu_kampa2026.jpeg" alt="壬生乱舞2026 カンパメニュー表" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="support-poster-placeholder">壬生乱舞2026<br>カンパメニュー画像</div>
      </div>
      <div class="support-card-body">
        <span class="support-kicker">MIBU BIRTHDAY SUPPORT</span>
        <h3>壬生乱舞2026 カンパ</h3>
        <p class="support-summary">スタフラ名前記載や花束、生誕限定特典など、金額ごとに特典が用意されています。</p>
        <div class="support-price-row"><span>¥5,000</span><span>¥10,000</span><span>¥20,000</span><span>¥30,000</span></div>
        <a class="support-shop-button" href="https://colorpuro.base.shop/categories/6512369" target="_blank" rel="noopener noreferrer">カンパを確認する →</a>
      </div>
    </article>

    <article class="support-card utan-support">
      <div class="support-poster-wrap">
        <img class="support-poster" src="utan_kampa2026.jpeg" alt="うーたん生誕祭2026 カンパのご案内" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="support-poster-placeholder">うーたん生誕祭2026<br>カンパ案内画像</div>
      </div>
      <div class="support-card-body">
        <span class="support-kicker">UTAN BIRTHDAY SUPPORT</span>
        <h3>うーたん生誕祭2026 カンパ</h3>
        <p class="support-summary">花束やフラワースタンド名前記載、ブロマイドなど、生誕祭を応援できる特典付きカンパです。</p>
        <div class="support-price-row"><span>¥5,000</span><span>¥10,000</span><span>¥20,000</span></div>
        <a class="support-shop-button" href="https://colorpuro.base.shop/categories/6512369" target="_blank" rel="noopener noreferrer">カンパを確認する →</a>
      </div>
    </article>
    <p class="support-note">※ 特典内容・販売状況は変更される場合があります。最新情報は公式ショップをご確認ください。</p>
  `;

  importantBlock.insertAdjacentElement('afterend', supportBlock);
}