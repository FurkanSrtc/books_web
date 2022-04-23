import React from 'react'
import { Navbar, Container, Col, Offcanvas, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FavouritesOffCanvas from '../../components/favouritesOffCanvas';
import { useFavouritesProvider } from '../../providers/favouritesProvider'
import { AiFillHeart } from "react-icons/ai";

export default function Header() {
    const { showOffCanvas, setShowOffCanvas, getBadgeCount } = useFavouritesProvider();
    const handleClose = () => setShowOffCanvas(false);

    return (
        <>
            <Navbar bg="light" expand={false}>
                <Container fluid>
                    <Link to="/" className="navbar-brand">Books</Link>


                    <Col className="text-end me-2">
                        <div className="d-flex justify-content-end">

                            <button onClick={() => setShowOffCanvas(true)} className="cbtn-sm btn-light-blue">
                                {getBadgeCount() ?
                                    <span className="cbadge"><p style={{ fontSize: 10, backgroundColor: '#F5766C', borderRadius: 50, width: 20, height: 20, paddingTop: 4, paddingRight: 2 }}>{getBadgeCount()}</p></span>
                                    : null}
                                <AiFillHeart color="red" style={{ fontSize: 28 }} />
                            </button>
                        </div>
                    </Col>

                    {/* <Navbar.Brand><Link to={'/'}>Books</Link></Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Link to="/" className='nav-link'>Home</Link>
                                <Nav.Link href="#action1">Home</Nav.Link>
                                <Nav.Link href="#action2">Link</Nav.Link>
                                <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">
                                        Something else here
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <FavouritesOffCanvas show={showOffCanvas} onHide={handleClose} />
        </>
    )
}
