// src/components/Header.jsx
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; // useSelectorをインポート
import { useEffect } from 'react';  // 追加

export const Header = () => {
  const username = useSelector((state) => state.auth.username); // Reduxストアからusernameを取得
  const token = useSelector((state) => state.auth.token); // ← ログイン判定はtokenで
  const isAuthChecked = useSelector((state) => state.auth.isAuthChecked);
  const location = useLocation();

  useEffect(() => {
    console.log("Header - usernameが変わりました:", username);
  }, [username]);  // usernameが変わるたびにログを出す
  console.log("Headerが描画された。username:", username);

    // 認証状態が未チェックなら何も描画しない（ログイン後のズレを防ぐ）
  if (!isAuthChecked) {
    return null;
  }

  // ログインページならHeaderを表示しない
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <header className="header">
      <h1>書籍レビューアプリ</h1>
      <nav>
        {/* {username ? ( // usernameが存在するかで表示を切り替え
          <span className="header-username">ようこそ、{username}さん</span>
        ) : (
          <Link to="/login" >ログイン</Link>
        )} */}
        {token && username ? ( // usernameが存在するかで表示を切り替え
          <span className="header-username">ようこそ、{username}さん</span>
        ) : (
          <Link to = "/login" >ログイン</Link>
        )}
      </nav>
    </header>
  );
};//ログインしてたらログインボタンを表示しなくさせる(navの中身を少し変える)
//API(ユーザー情報)を取得する処理を書く(イメージはbookSliceのAPIコード)
//https://railway.bookreview.techtrain.dev/users