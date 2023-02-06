import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBIcon } from 'mdb-react-ui-kit';
const Task = () => {
  const [taskId, title, isDone] = [1, 'Study IELTS', false];
  return (
    <Container>
      <Row
        style={{ backgroundColor: '#F1E4CB' }}
        className="rounded w-100 py-2 mx-0 my-2 d-flex justify-content-between"
      >
        <Col sm="10" className="ps-1 pe-0">
          <span className="fw-bold">{taskId}. </span>
          <span style={{ textDecoration: 'line-through' }}>
            {title.length <= 35 ? title : `${title.slice(0, 35)}...`}
          </span>
        </Col>
        <Col sm="2" className="pe-1 ps-0">
          <Row>
            <Col className="px-0">
              <MDBIcon style={{ color: 'green' }} fas icon="check-double" />
            </Col>
            <Col className="px-0">
              <MDBIcon style={{ color: 'purple' }} fas icon="edit" />
            </Col>
            <Col className="px-0">
              <MDBIcon style={{ color: 'red' }} fas icon="trash-alt" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Task;
