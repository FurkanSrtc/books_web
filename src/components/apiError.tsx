import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { BsExclamationCircle } from 'react-icons/bs';

interface Props {
  message: string;
}
export default function ApiError(props: Props) {
  const { message } = props;
  return (
    <Container>
      <Row className="text-center">
        <BsExclamationCircle size={100} />
        <h1>
          Oops! Something went wrong.
        </h1>
        <h2>{message}</h2>
      </Row>
    </Container>
  );
}
