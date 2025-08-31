// src/components/BookListPage.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, setPage } from '../store/bookSlice'; // Reduxのアクションとセレクターをインポート
import BookList from './BookList';
import Pagination from './Pagination';

export const BookListPage = () => {
  const dispatch = useDispatch(); // Reduxアクションをディスパッチするためのフック
  
  const { items: books, page, limit, status, error } = useSelector((state) => state.books);

useEffect(() => {
    // offsetがNaNになることを防ぐ
    if (typeof page === 'number' && typeof limit === 'number') {
      dispatch(fetchBooks({ offset: page * limit }));
    }
  }, [page, limit, dispatch]);

  const handleNextPage = () => {
    dispatch(setPage(page + 1)); // ページ番号をインクリメントするアクションをディスパッチ
  };

  const handlePrevPage = () => {
    dispatch(setPage(Math.max(page - 1, 0))); // ページ番号をデクリメントするアクションをディスパッチ
  };

  // ローディング状態やエラー状態の表示
  if (status === 'loading') {
    return <div className="p-4 text-center">読み込み中...</div>;
  }

  if (status === 'failed') {
    return <div className="p-4 text-red-600 text-center">データの取得に失敗しました: {error}</div>;
  }

  // 次へボタンの無効化を判断するためのロジック（例: 取得したデータがlimitより少ない場合）
  const disableNext = books.length < limit;

  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-4">書籍レビュー 一覧</h1> */}
      <BookList books={books} /> {/* 書籍リストコンポーネントにデータを渡す */}
      <Pagination
        currentPage={page}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        disablePrev={page === 0} // 最初のページでは「前へ」を無効化
        disableNext={disableNext} // 次へボタンの無効化を渡す
      />
    </div>
  );
};