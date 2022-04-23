import React from 'react'
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import BookDetails from '../../pages/Books/bookDetails';

export default function Main() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book-details/:bookId" element={<BookDetails />} />
        </Routes>
    )
}
