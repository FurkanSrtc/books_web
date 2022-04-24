import React from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Book } from '../../types/booksTypes';
import BooksAPI from '../../api/booksAPI';
import { useFavouritesProvider } from '../../providers/favouritesProvider';

export default function BookDetails() {
    const { addToFavourites, checkToFavorite } = useFavouritesProvider();
    const { bookId } = useParams();
    const bookDetails = useQuery(['bookDetails', bookId], () => BooksAPI.BookDetails(bookId ?? ""));

    const addFavourites = (book: Book) => {
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
                    <Col md={4}>
                        <Image width={"100%"} style={{ maxHeight: "50vh", objectFit: "contain" }} fluid src={bookDetails.data.formats['image/jpeg']} alt={bookDetails.data.title} />

                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <h4>{bookDetails.data.title}</h4>
                        <h5>Authors</h5>
                        {bookDetails.data.authors.map((author, index) => (
                            <>
                                <p className='m-0' key={index}>-{author.name}</p>
                            </>
                        ))}
                        <br />
                        <h5>Languages</h5>
                        {bookDetails.data.languages.map((language, index) => (
                            <>
                                <p className='m-0' key={index}>-{language}</p>
                            </>
                        ))}
                        <br />
                        <h5>Subjects</h5>
                        {bookDetails.data.subjects.map((subject, index) => (
                            <>
                                <p className='m-0' key={index}>-{subject}</p>
                            </>
                        ))}
                        <br />
                        {bookDetails.data.bookshelves.length > 0 && <>
                            <h5>Bookshelves</h5>
                            {bookDetails.data.bookshelves.map((bookshelve, index) => (
                                <>
                                    <p className='m-0' key={index}>-{bookshelve}</p>
                                </>
                            ))}</>}

                        {checkToFavorite(bookDetails.data) ?
                            <Button variant="outline-danger" onClick={() => addFavourites(bookDetails.data)}>Remove from Favourites</Button> :
                            <Button variant="outline-success" onClick={() => addFavourites(bookDetails.data)}>Add to Favourites</Button>
                        }
                    </Col>
                </>}
            </Row>
        </Container>
    )

}
