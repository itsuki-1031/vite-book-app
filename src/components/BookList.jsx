// src/components/BookList.jsx
import React from 'react';

const BookList = ({ books }) => {
  if (!books || books.length === 0) {
    return <p className="text-gray-600">書籍がありません。</p>;
  }

  return (
    <ul className="space-y-4">
      {books.map((book) => (
        <li key={book.id} className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">{book.title}</h2>
          <p className="text-gray-700">{book.detail}</p>
        </li>
      ))}
    </ul>
  );
};

export default BookList;