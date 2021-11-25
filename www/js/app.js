// NCMBの初期化
const applicationKey = '3f1fc674f5534a74dbda7247cad8decabda4b0b84a5675482371454ca8eb422d';
const clientKey = 'da0c78eba42ab625de75c25fc39720542e332d7671a85157a7c75edc1d1b8cbb';
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
