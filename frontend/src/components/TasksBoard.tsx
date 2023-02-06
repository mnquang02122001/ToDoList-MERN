import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MDBInputGroup, MDBBtn, MDBSpinner } from 'mdb-react-ui-kit';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MyToast from './MyToast';
import Task from './Task';

export interface State extends SnackbarOrigin {
  open: boolean;
}
const TasksBoard: React.FC = () => {
  const [showToast, setShowToast] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });

  const handleClickToast = (newState: SnackbarOrigin) => {
    setShowToast({ open: true, ...newState });
  };

  const handleCloseToast = () => {
    setShowToast({ ...showToast, open: false });
  };
  const handleAddTask = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    handleClickToast({ vertical: 'top', horizontal: 'right' });
  };
  return (
    <>
      <Container
        className="bg-light rounded mt-5"
        style={{ width: '40%', height: '100%' }}
      >
        <Row className="mt-4">
          <h2 className="text-left">Task Manager</h2>
        </Row>
        <Row className="mt-2">
          <MDBInputGroup>
            <input
              className="form-control"
              placeholder="Add a task"
              type="text"
            />
            <MDBBtn onClick={handleAddTask}>Add</MDBBtn>
          </MDBInputGroup>
        </Row>
        <Row className="mt-2">
          <Col sm="6">
            <span className="fw-bold">Total Tasks: </span>
            <span>2</span>
          </Col>
          <Col sm="6">
            <div className="text-end">
              <span className="fw-bold">Completed Tasks: </span>
              <span>1</span>
            </div>
          </Col>
        </Row>
        <hr style={{ margin: '0' }}></hr>
        <Row className="justify-content-center mt-1">
          <MDBSpinner color="primary">
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        </Row>
        <Row>
          <Task />
          <Task />
        </Row>
      </Container>
      <MyToast
        {...showToast}
        handleClose={handleCloseToast}
        message="Add a task successfully!"
        severity="success"
      />
    </>
  );
};

export default TasksBoard;
