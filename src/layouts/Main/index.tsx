import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import BookDetails from '../../pages/Books/bookDetails';
import SearchDetails from '../../pages/Books/searchDetails';

export default function Main() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/book-details/:bookId" element={<BookDetails />} />
      <Route path="/books/search/:search" element={<SearchDetails />} />
    </Routes>
  );
}
