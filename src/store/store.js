// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookSlice'; // 後で作成するbookSliceのリデューサーをインポート
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    books: bookReducer, // 'books'という名前でbookReducerを登録
    auth: authReducer,
  },
  // 開発環境ではRedux DevTools Extensionが自動的に有効になります
});