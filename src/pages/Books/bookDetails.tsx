import React from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Book } from '../../types/booksTypes';
import BooksAPI from '../../api/booksAPI';
import { useFavouritesProvider } from '../../providers/favouritesProvider';

export default function BookDetails() {
    const { addToFavourites, removeFromFavourites } = useFavouritesProvider();
    const { bookId } = useParams();
    const bookDetails = useQuery(['bookDetails', bookId], () => BooksAPI.BookDetails(bookId ?? ""));
     
    const addFavourites = (book : Book) => {
        addToFavourites(book);
    }
    return (
        <Container>
            <Row>
                <h1>Book Details</h1>
                <p>Book ID: {bookId}</p>
                {bookDetails.isLoading && <p>Loading...</p>}
                {bookDetails.isError && <p>Error</p>}
                {bookDetails.isSuccess && <>
                    <Col md={3}>
                        <Image width={"100%"} style={{ maxHeight: "50vh", objectFit: "contain" }} fluid src={bookDetails.data.formats['image/jpeg']} alt={bookDetails.data.title} />

                    </Col>
                    <Col md={4} sm={12} xs={12}>
                        <h5 style={{ textOverflow: "ellipsis", wordWrap: "break-word", }}>{bookDetails.data.title}</h5>
                        <p> {bookDetails.data.authors.map((author, index) => (
                            <span key={index}>{author.name}</span>
                        ))}</p>
                        {bookDetails.data.languages.map((language,index) => (
                            <p key={index}>{language}</p>
                        ))}

                        <Button variant="primary" onClick={() => { addFavourites(bookDetails.data) }}>Add to Favourites</Button>
                    </Col>
                </>}
            </Row>
        </Container>
    )

}
