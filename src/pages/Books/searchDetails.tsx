import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useQuery } from 'react-query';
import BooksAPI from '../../api/booksAPI';
import BookCard from '../../components/bookCard';

export default function SearchDetails() {
  const { search } = useParams();
  const searchDetails = useQuery(['searchDetails', search], () => BooksAPI.SearchDetails(search ?? ''));

  return (
    <Container>
      <Row>
        <h1>Search Details</h1>
        <p>
          {`Searched: ${search}`}
        </p>
        {searchDetails.isLoading && <p>Loading...</p>}
        {searchDetails.isError && (
        <p>
          Error
          {searchDetails.error instanceof Error ? `: ${searchDetails.error.message}` : `: ${searchDetails.error}`}
        </p>
        )}
        {searchDetails.isSuccess && (
          <Row>
            {searchDetails.data.results.map((book) => (
              <Col md={4} sm={12} xs={12} key={book.id}>
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        )}
      </Row>
    </Container>
  );
}
