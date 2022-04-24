import React from 'react'
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import BooksAPI from '../../api/booksAPI';
import { useQuery } from 'react-query';
import BookCard from '../../components/bookCard';

export default function SearchDetails() {
    const { search } = useParams();
    const searchDetails = useQuery(['searchDetails', search], () => BooksAPI.SearchDetails(search ?? ""));

    return (
        <Container>
            <Row>
                <h1>Search Details</h1>
                <p>Searched: {search}</p>
                {searchDetails.isLoading && <p>Loading...</p>}
                {searchDetails.isError && <p>Error</p>}
                {searchDetails.isSuccess && <>
                    <Row>
                        {searchDetails.data.results.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </Row>
                </>}
            </Row>
        </Container>
    )
}
