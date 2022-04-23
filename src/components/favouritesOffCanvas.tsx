import React from 'react'
import { Offcanvas } from 'react-bootstrap';
import { useFavouritesProvider } from '../providers/favouritesProvider';
import { Book } from '../types/booksTypes';

type offCanvasProps = {
    show: boolean;
    onHide: () => void;
}
export default function FavouritesOffCanvas(props: offCanvasProps) {
    const { favourites } = useFavouritesProvider();
    const { show, onHide } = props;
    return (
        <Offcanvas scroll show={show} onHide={onHide} placement={'end'}>
            <Offcanvas.Header style={{ backgroundColor: '#2D2D2D', color: 'white' }} closeButton>
                <Offcanvas.Title className='pt-3 pb-3'>Favoriler</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={{ backgroundColor: '#E1E1E2', marginBottom: "20vh" }}>
                {favourites.map((book: Book, index: number) => {
                    return (
                        <p>{book.title}</p>
                    )
                })}
            </Offcanvas.Body>
        </Offcanvas>
    )
}
