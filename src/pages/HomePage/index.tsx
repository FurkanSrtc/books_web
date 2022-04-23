import React from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import { useQuery } from 'react-query'
import BooksAPI from '../../api/booksAPI'
import BookCard from '../../components/bookCard'

export default function HomePage() {
    const [page, setPage] = React.useState(1)

    const {
        isLoading,
        isError,
        error,
        data,
        isFetching,
        isPreviousData,
    } = useQuery(['projects', page], () => BooksAPI.ListBooks(page), { keepPreviousData: true })

    return (
        <Container className="p-3">

            <div>
                {isLoading ? (
                    <div>Loading...</div>
                ) : isError ? (
                    <div>Error</div>
                ) : (
                    <Row>
                        {data?.results.map(book => (
                            <Col md={4} sm={12} xs={12}>
                            <BookCard book={book} />
                            </Col>
                        ))}
                    </Row>
                )}
                <span>Current Page: {page}</span>
                <button
                    onClick={() => setPage(old => Math.max(old - 1, 0))}
                    disabled={page === 0}
                >
                    Previous Page
                </button>{' '}
                <button
                    onClick={() => {
                        if (!isPreviousData && data?.next) {
                            setPage(old => old + 1)
                        }
                    }}
                    // Disable the Next Page button until we know a next page is available
                    disabled={isPreviousData || !data?.next}
                >
                    Next Page
                </button>
                {isFetching ? <span> Loading...</span> : null}{' '}
            </div>

        </Container>
    )
}
