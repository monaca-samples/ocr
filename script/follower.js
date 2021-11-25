const NCMB = require('ncmb');
const applicationKey = 'YOUR_APPLICATION_KEY';
const clientKey = 'YOUR_CLIENT_KEY';
const userName = 'ADMIN_USER_NAME';
const password = 'ADMIN_PASSWORD';
const ncmb = new NCMB(applicationKey, clientKey);
module.exports = async (req, res) => {
  await ncmb.User.login(userName, password);
  // 更新対象のフォローデータを取得
  let follow = await getFollow(req.body.follow_id);
  // フォローデータがなければ終了
  if (!follow.objectId) return res.send({
    error: `No follow ${req.body.follow_id}`
  });
  // アクションによって処理分け
  switch (req.body.action) {
  case 'add':     // フォローされた際の処理
    follow.addUnique('followers', req.body.follower_id)
    break;
  case 'remove':  // アンフォローされた時の処理
    follow.remove('followers', req.body.follower_id)
    break;
  }
  // 更新
  await follow.update();
  // データ更新（再取得）
  follow = await getFollow(req.body.follow_id);
  // プロフィールを更新
  const Profile = ncmb.DataStore('Profile');
  const profile = new Profile;
  await profile
    .set('objectId', follow.profile.objectId)        // 更新対象のobjectIdを設定
    .set('followers_count', follow.followers.length) // フォロワー数を更新
    .set('follows_count', follow.follows.length)     // フォロー数を更新
    .update();
  res.send({ follow });
}

// フォローデータを返す関数
function getFollow(objectId) {
  const Follow = ncmb.DataStore('Follow');
  return Follow
    .equalTo('profile', {
      __type: 'Pointer',
      className: 'Profile',
      objectId
    }).fetch();
}