// NCMBの初期化
const applicationKey = 'cc09f75a3224ab89c4ca4fc2605af8f989bcf8503b655e60d6de226a0d5028b9';
const clientKey = '7967db557ffd1df7ce3dfb4cafb21a93d70367b601e62527d59a5f6fa1b2300f';
const ncmb = new NCMB(applicationKey, clientKey);

var $ = Dom7;
var app = new Framework7({
  name: 'My App', // App name
  theme: 'auto', // Automatic theme detection
  el: '#app', // App root element
  // App store
  store: store,
  // App routes
  routes: routes,
});

// 認証状態をチェックする関数
// 認証が問題なければ true / ログインしていない or セッションに問題がある場合は false
const checkAuth = async () => {
  // 現在のログインユーザを取得
  const user = ncmb.User.getCurrentUser();
  // データがない場合は false を返す
  if (!user) return false;
  try {
    // セッションの有効性チェック
    await ncmb.DataStore('Test').fetch();
    // 問題なければ true
    return true;
  } catch (e) {
    // セッションに問題がある場合は false
    return false;
  }
}

// フォームをオブジェクト化する関数
const serializeForm = (ele) => {
  const f = new URLSearchParams(new FormData($(ele)[0]));
  const params = {};
  for (const values of f) {
    params[values[0]] = values[1];
  }
  return params;
}

// ファイルの内容を読み込んで返す
const photoReader = (file) => {
  return new Promise((res, rej) => {
    const reader = new FileReader()
    reader.onload = () => {
      res(reader.result);
    }
    reader.readAsDataURL(file);
  });
}
