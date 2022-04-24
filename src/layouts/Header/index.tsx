import React from 'react';
import {
  Navbar, Container, Nav, Form, FormControl, Button,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BsBookmarksFill } from 'react-icons/bs';
import FavouritesOffCanvas from '../../components/favouritesOffCanvas';
import { useFavouritesProvider } from '../../providers/favouritesProvider';

export default function Header() {
  const { showOffCanvas, setShowOffCanvas, getBadgeCount } = useFavouritesProvider();
  const handleClose = () => setShowOffCanvas(false);
  const [search, setSearch] = React.useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/books/search/${encodeURI(search)}`);
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Link to="/" className="navbar-brand">Books</Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="nav-link">Home</Link>
            </Nav>
            <Nav>
              <button type="button" onClick={() => setShowOffCanvas(true)} className="cbtn-sm btn-light m-1">
                {getBadgeCount()
                  ? (
                    <span className="cbadge">
                      <p style={{
                        fontSize: 10, backgroundColor: 'black', borderRadius: 50, width: 20, height: 20, paddingTop: 4, paddingRight: 2,
                      }}
                      >
                        {getBadgeCount()}
                      </p>
                    </span>
                  )
                  : null}
                <BsBookmarksFill color="black" style={{ fontSize: 28 }} />
              </button>
            </Nav>
            <Nav>
              <Form onSubmit={handleSearch} className="d-flex m-1">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="outline-success" type="submit">Search</Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <FavouritesOffCanvas show={showOffCanvas} onHide={handleClose} />
    </>
  );
}
