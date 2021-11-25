// ストア（アプリ内共通変数）
const createStore = Framework7.createStore;
const store = createStore({
  state: {
    coords: {}, // 位置情報（Webブラウザから取得、または地図の中心）
    memo: null, // 一覧で選択されたメモ
  },
  // データの取得
  getters: {
    coords({ state }) {
      return state.coords;
    },
    memo({ state }) {
      return state.memo;
    },
  },
  actions: {
    // 位置情報のセット
    setCoords({ state }, { coords }) {
      state.coords = coords;
    },
    // メモのセット
    setMemo({ state }, memo ) {
      state.memo = memo;
    }
  },
})

