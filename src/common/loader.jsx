import { Row, Spinner } from "react-bootstrap";

export const loader = () => {
  return (
    <Row className="justifty-content-center align-items-center loaderContainer">
      <Spinner animation="border" role="status" className="mx-auto"></Spinner>
    </Row>
  );
};