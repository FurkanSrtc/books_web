import React from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import { Book } from '../types/booksTypes';
import { Link, useNavigate } from 'react-router-dom';
import { BsDownload, BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";
import { useFavouritesProvider } from '../providers/favouritesProvider';
interface cardTypes {
    book: Book,
}

export default function BookCard(props: cardTypes) {
    const { book } = props;
    const { addToFavourites, removeFromFavourites, checkToFavorite } = useFavouritesProvider();
    const linkTo: string = `/book-details/${book.id}`

    const addFavourites = () => {
        console.log("addToFavourites");
        addToFavourites(book);
    }

    const styles = {
        hover: {
            cursor: "pointer",
        },
        image: {
            maxHeight: "9rem",
            objectFit: "cover",
        },
        cardBottom: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        }
    } as const

    return (
        <Col md={4} sm={12} xs={12} key={book.id}>
            <Row className="m-2 py-2" style={{ backgroundColor: "white", minHeight: "10rem" }}>
                <Col md={4} sm={6} xs={12}>
                    <Link to={linkTo}>
                        <Image width={"100%"} style={styles.image} fluid src={book.formats['image/jpeg']} alt={book.title} />
                    </Link>
                </Col>
                <Col md={8} style={styles.cardBottom}>
                    <Row>
                        <Link to={linkTo} className='text' >{book.title}</Link>
                        <p> {book.authors.map((author, index) => (
                            <span key={index}>{author.name}</span>
                        ))}</p>
                    </Row>
                    <Row>
                        <Col>
                            <p><BsDownload /> {book.download_count}</p>
                        </Col>
                        <Col className='text-end'>
                            {checkToFavorite(book) ?
                                <BsBookmarkFill size={24} style={styles.hover} onClick={addFavourites} /> :
                                <BsBookmarkPlus size={24} style={styles.hover} onClick={addFavourites} />
                            }

                        </Col>
                    </Row>

                </Col>
            </Row>
        </Col>
    )
}

