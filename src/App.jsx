import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loginSuccess, logout, authChecked } from './store/authSlice';
import { useDispatch, useSelector } from 'react-redux'; // Redux Providerをインポート
import { SignUp } from './SignUp.jsx';
import { Login } from './Login.jsx';
import { BookListPage } from './components/BookListPage.jsx'; // 新しく作成したページコンポーネントをインポート
import './App.css'
import { Header } from './Header.jsx';
import { url } from '../const.js';
import axios from 'axios';

export const App = () => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector((state) => state.auth.isAuthChecked); // ✅ authSliceの状態を取得

  useEffect(() => {
    const token = localStorage.getItem("token");//ログイン状態かどうか
    if (token) {
      axios.get(`${url}/users`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        dispatch(loginSuccess({token, username: res.data.name}));
        dispatch(authChecked());
      })
      .catch(err => {
        console.log('ログイン状態失敗', err);
        dispatch(logout());
      });
    } else {
      dispatch(authChecked());
    }
  }, [dispatch]);
  
  if (!isAuthChecked) return <div>読み込み中...</div>;//認証チェック完了puragu


  return(
    // <Provider>でアプリケーション全体をラップし、Reduxストアを提供
    <>
      <Router>
        <Header />
          <Routes>
            <Route path='/' element={<BookListPage />} />
            <Route path = '/signup' element = { < SignUp />} />
            <Route path = '/login' element = { < Login />} />
          </Routes>
      </Router>
    </>
  )
}
//一旦基礎1をやって怪しかったら入門に戻る
//エラーはエラーをWeb上で検索して
//コードは自分でエラーはAIで聞く
//基礎1で1行ずつ読めるようにしていく
//それか入門編で1行ずつ読めるようにやっていく(1行ずつと塊を読めるようにする)