// 「走りながら聴く曲」公式歌詞・コール画像（2026-09-02）
// 既存の曲別コール表を変更せず、この曲だけ追加する。
if (typeof songs !== 'undefined') {
  const title = '走りながら聴く曲';
  if (!songs.some(song => song[0] === title)) {
    songs.push([title, '公式の歌詞・コール画像が公開されました。画像を見ながらライブで楽しめます。']);
  }

  const originalRenderSongs = typeof renderSongs === 'function' ? renderSongs : null;
  if (originalRenderSongs) {
    renderSongs = function(q = '') {
      const filtered = songs.filter(x => x[0].toLowerCase().includes(q.toLowerCase()));
      document.querySelector('#songList').innerHTML = filtered.map(x => {
        if (x[0] !== title) return item(x[0], x[1]);
        return `<details class="call-detail"><summary><span>${esc(x[0])}</span><b>＋</b></summary><div class="call-body"><p style="margin:0 0 12px">${esc(x[1])}</p><img src="lyrics/hashirinagara.jpg" alt="走りながら聴く曲 歌詞・コール画像" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px"></div></details>`;
      }).join('') || '<p class="notice">該当する曲がありません。</p>';
    };
    renderSongs();
  }
}
