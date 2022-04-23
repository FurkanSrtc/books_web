import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Book } from '../../types/booksTypes';
import BooksAPI from '../../api/booksAPI';
import BookCard from '../../components/bookCard';

export default function BookDetails() {
    const { bookId } = useParams();
    const bookDetails = useQuery(['bookDetails', bookId], () => BooksAPI.BookDetails(bookId ?? ""));

    return (
        <Container>
            <Row>
                <Col>
                <h1>Book Details</h1>
                <p>Book ID: {bookId}</p>
                {bookDetails.isLoading && <p>Loading...</p>}
                {bookDetails.isError && <p>Error</p>}
                {bookDetails.isSuccess && <BookCard book={bookDetails.data} />}
                </Col>
            </Row>
        </Container>
    )

}
