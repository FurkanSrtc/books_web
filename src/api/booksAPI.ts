import { BooksObject, Book } from '../types/booksTypes';
import http from "./http-common";

const ListBooks = async (page: number) => {
    const response = await http.get<BooksObject>(`/books?page=${page}`);
    return response.data;
};

const BookDetails = async (bookId: string) => {
    const response = await http.get<Book>(`/books/${bookId}`);
    return response.data;
};

const BooksAPI = {
    ListBooks, BookDetails
};

export default BooksAPI;