// src/store/bookSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { url } from '../../const' ;// あなたのurl定数をインポート

// APIから書籍データを非同期でフェッチするThunkアクション
// createAsyncThunkは、API呼び出しのpending, fulfilled, rejectedの状態を自動的に処理します
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks', // アクションタイプのプレフィックス
  async ({ offset }, { rejectWithValue }) => {//limitはいらないかも
    const token = localStorage.getItem("token");
    // if (!token) {
    //   // トークンがない場合は、rejectWithValueを使ってエラーを返す
    //   // これにより、rejectedステータスになり、エラーメッセージが`action.payload`に入る
    //   return rejectWithValue("トークンがありません。ログインしてください。");
    // }

    try {
        const res = await ( 
          token && token !== "undefined" && token !== ""
          ? axios.get(`${url}/books?offset=${offset}`, {
              headers: {
              Authorization: `Bearer ${token}`,
            },
          })//ここにpublic/booksのAPIを書くなぜならログインしてない時にも一覧が欲しい
        : axios.get(`${url}/public/books?offset=${offset}`)
        );
      return res.data; // 成功した場合はデータを返す
    } 
    catch (err) {
        // エラーが発生した場合は、rejectWithValueを使ってエラーを返す
        return rejectWithValue(err.response?.data?.message || err.message);
      }
  }
);

// Redux Sliceの定義
const bookSlice = createSlice({
  name: 'books', // スライスの名前
  initialState: {
    items: [],       // 書籍データの配列
    page: 0,         // 現在のページ番号
    limit:10,
    status: 'idle',  // データ取得の状態 ('idle' | 'loading' | 'succeeded' | 'failed')
    error: null,     // エラーメッセージ
  },
  reducers: {
    // ページ番号を更新するアクション
    setPage: (state, action) => {
      state.page = action.payload;
    },
    // ここに他の同期アクションを追加できます
  },
  // createAsyncThunkで生成されたアクション（pending, fulfilled, rejected）のハンドリング
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading'; // ロード中
        state.error = null; // エラーをリセット
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded'; // 成功
        state.items = action.payload; // 取得したデータを状態にセット
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed'; // 失敗
        state.error = action.payload; // エラーメッセージを保存
        state.items = []; // データもクリア（必要であれば）
      });
  },
});

// アクションクリエーターをエクスポート
export const { setPage } = bookSlice.actions;

// リデューサーをデフォルトエクスポート
export default bookSlice.reducer;