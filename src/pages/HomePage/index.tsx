import React from 'react'
import { Button, Col, Container, Image, Row, Spinner } from 'react-bootstrap'
import { useQuery } from 'react-query'
import BooksAPI from '../../api/booksAPI'
import BookCard from '../../components/bookCard'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery, QueryClient, QueryClientProvider } from 'react-query'
import { Link } from 'react-router-dom'

export default function HomePage() {
    const { ref, inView } = useInView()
    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
    } = useInfiniteQuery(
        'projects', async ({ pageParam = 1 }) => BooksAPI.ListBooks(pageParam),
        {
            getPreviousPageParam: firstPage => firstPage.previous?.slice(32) ?? undefined,
            getNextPageParam: lastPage => lastPage.next?.slice(32) ?? undefined,
        }
    )

    React.useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView])

    return (
        <Container>
            <h1 className='my-2 mx-3'>All Books</h1>
            {status === 'loading' ? (
                <p>Loading...</p>) :
                status === 'error' ? (
                    <span>Error</span>) : (
                    <>
                        <Row>
                            {data?.pages.map(page => (
                                <React.Fragment key={page.next}>
                                    {page.results.map(book => (
                                        <Col md={4} sm={12} xs={12} key={book.id}>
                                            <BookCard book={book} />
                                        </Col>
                                    ))}
                                </React.Fragment>
                            ))}
                        </Row>
                        <Row className='text-center'>
                            <Col>
                                <button className="btn btn-secondary mx-3 my-2"
                                    ref={ref}
                                    onClick={() => fetchNextPage()}
                                    disabled={!hasNextPage || isFetchingNextPage}>

                                    {isFetchingNextPage
                                        ? <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                            {" Loading more..."}
                                        </>
                                        : hasNextPage
                                            ? 'Load Newer'
                                            : 'Nothing more to load'}
                                </button>
                            </Col>
                        </Row>
                        <div>
                            {isFetching && !isFetchingNextPage
                                ? 'Background Updating...'
                                : null}
                        </div>
                    </>
                )}
            <hr />
        </Container>
    )
}
