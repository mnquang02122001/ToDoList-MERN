import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  MDBIcon,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { TaskDetail } from './TasksBoard';
const Task: React.FC<TaskDetail> = (props) => {
  const [task, setTask] = useState<TaskDetail>(props);
  const [updatedModal, setUpdatedModal] = useState<boolean>(false);
  const toggleShowModal = () => setUpdatedModal(!updatedModal);
  const handleMarkATask = () => {
    console.log('done a task');
  };
  const handleDeleteATask = () => {
    console.log('delete a task');
  };
  const handleUpdateATask = () => {
    console.log('update a task');
  };
  return (
    <Container>
      <Row
        style={{ backgroundColor: '#F1E4CB' }}
        className="rounded w-100 py-2 mx-0 my-2 d-flex justify-content-between"
      >
        <Col sm="10" className="ps-1 pe-0">
          <span className="fw-bold">{1}. </span>
          <span style={task.isDone ? { textDecoration: 'line-through' } : {}}>
            {task.title.length <= 35
              ? task.title
              : `${task.title.slice(0, 35)}...`}
          </span>
        </Col>
        <Col sm="2" className="pe-1 ps-0">
          <Row>
            <Col className="px-0">
              <MDBBtn tag="a" color="none" onClick={handleMarkATask}>
                <MDBIcon style={{ color: 'green' }} fas icon="check-double" />
              </MDBBtn>
            </Col>
            <Col className="px-0">
              <MDBBtn tag="a" color="none" onClick={toggleShowModal}>
                <MDBIcon style={{ color: 'purple' }} fas icon="edit" />
              </MDBBtn>
              <MDBModal
                show={updatedModal}
                setShow={setUpdatedModal}
                tabIndex="-1"
              >
                <MDBModalDialog>
                  <MDBModalContent>
                    <MDBModalHeader>
                      <MDBModalTitle>Modal title</MDBModalTitle>
                      <MDBBtn
                        className="btn-close"
                        color="none"
                        onClick={toggleShowModal}
                      ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                      <input
                        className="form-control"
                        placeholder="Update a new task"
                        type="text"
                      />
                    </MDBModalBody>

                    <MDBModalFooter>
                      <MDBBtn color="secondary" onClick={toggleShowModal}>
                        Close
                      </MDBBtn>
                      <MDBBtn
                        style={{ backgroundColor: 'purple' }}
                        onClick={handleUpdateATask}
                      >
                        Update
                      </MDBBtn>
                    </MDBModalFooter>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>
            </Col>
            <Col className="px-0">
              <MDBBtn tag="a" color="none" onClick={handleDeleteATask}>
                <MDBIcon style={{ color: 'red' }} fas icon="trash-alt" />
              </MDBBtn>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Task;
