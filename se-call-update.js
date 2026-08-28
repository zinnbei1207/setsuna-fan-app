// 現メンバー編成に合わせたSEコール更新（2026-08-29）
// 旧：うーたん → ミブ → きらり
// 現：うーたん → えら → ミブ
if (typeof songs !== 'undefined' && songs.length && songs[0][0] === 'SE') {
  songs[0][1] = songs[0][1].replace(
    'うーたん！×7／ミブ！×6 → ミブちゃーん！／きらり！×7',
    'うーたん！×7／えら！×6 → えらちゃーん！／ミブ！×6 → ミブちゃーん！'
  );
  if (typeof renderSongs === 'function') renderSongs();
}
