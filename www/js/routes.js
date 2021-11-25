const routes = [
  {
    path: '/',
    url: './index.html',
  },
  // ログイン画面
  {
    path: '/login',
    name: 'Login',
    componentUrl: './pages/login.html'
  },
  // データ投入画面
  {
    path: '/camera',
    name: 'Camera',
    componentUrl: './pages/camera.html'
  },
  // データ一覧画面
  {
    path: '/list',
    name: 'List',
    componentUrl: './pages/list.html'
  },
  // データ詳細画面
  {
    path: '/:id',
    name: 'Detail',
    componentUrl: './pages/show.html'
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
