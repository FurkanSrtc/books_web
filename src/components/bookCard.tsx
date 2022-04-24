import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsDownload, BsBookmarkPlus, BsBookmarkFill } from 'react-icons/bs';
import { Book } from '../types/booksTypes';
import { useFavouritesProvider } from '../providers/favouritesProvider';

interface CardTypes {
  book: Book,
}

export default function BookCard(props: CardTypes) {
  const { book } = props;
  const { addToFavourites, checkToFavorite } = useFavouritesProvider();
  const linkTo: string = `/book-details/${book.id}`;

  const addFavourites = () => {
    addToFavourites(book);
  };

  const styles = {
    hover: {
      cursor: 'pointer',
    },
    image: {
      maxHeight: '9rem',
      objectFit: 'cover',
    },
    cardBottom: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  } as const;

  return (

    <Row className="m-2 py-2" style={{ backgroundColor: 'white', minHeight: '10rem' }}>
      <Col md={4} sm={6} xs={12}>
        <Link to={linkTo}>
          <Image width="100%" style={styles.image} fluid src={book.formats['image/jpeg']} alt={book.title} />
        </Link>
      </Col>
      <Col md={8} style={styles.cardBottom}>
        <Row>
          <Link to={linkTo} className="text">{book.title}</Link>
          <p>
            {book.authors.map((author) => (
              <span key={author.name}>{author.name}</span>
            ))}
          </p>
        </Row>
        <Row>
          <Col>
            <p>
              <BsDownload />
              {' '}
              {book.download_count}
            </p>
          </Col>
          <Col className="text-end">
            {checkToFavorite(book)
              ? <BsBookmarkFill size={24} style={styles.hover} onClick={addFavourites} />
              : <BsBookmarkPlus size={24} style={styles.hover} onClick={addFavourites} />}
          </Col>
        </Row>

      </Col>
    </Row>
  );
}
