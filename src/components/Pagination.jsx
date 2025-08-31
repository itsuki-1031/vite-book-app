// src/components/Pagination.jsx
import React from 'react';
//BookListPageと似た
const Pagination = ({ onNextPage, onPrevPage, disablePrev, disableNext }) => {
  return (
    <div className="flex justify-between mt-4">
      <button
        onClick={onPrevPage}
        disabled={disablePrev}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        前へ
      </button>

      <button
        onClick={onNextPage}
        // ここで次へボタンのdisable判定を追加することもできる
        // 例: disableNext={books.length < limit} のように
        disabled={disableNext} // Propとして渡されるか、Reduxから直接取得してもよい
        className="px-4 py-2 bg-gray-300 rounded"
      >
        次へ
      </button>
    </div>
  );
};

export default Pagination;