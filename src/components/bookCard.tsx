import React from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import { Book } from '../types/booksTypes';

interface cardTypes {
    book: Book,
}

export default function BookCard(props: cardTypes) {
    const { book } = props
    return (

        <Row>
            <Col md={4} sm={6} xs={12}>
                <Image width={"100%"} style={{ maxHeight: "16.5vh" }} fluid src={book.formats['image/jpeg']} alt={book.title} />
            </Col>
            <Col md={8}>
                <h5 style={{ textOverflow: "ellipsis", wordWrap: "break-word", }}>{book.title.length > 30 ? book.title.substring(0, 30) + "..." : book.title}</h5>
                <p> {book.authors.map(author => (
                    <span>{author.name}</span>
                ))}</p>
                {book.languages.map(language => (
                    <p>{language}</p>
                ))}

            </Col>
        </Row>

    )
}
