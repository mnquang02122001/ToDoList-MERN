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
import { SnackbarOrigin } from '@mui/material/Snackbar';
import MyToast from './MyToast';
import { State } from './TasksBoard';
import { TaskDetail } from './TasksBoard';
import request from '../api/request';

export interface Props extends TaskDetail {
  setTasks: React.Dispatch<React.SetStateAction<TaskDetail[]>>;
  setTotalTask: React.Dispatch<React.SetStateAction<number>>;
  setDeletedTaskStatus: React.Dispatch<
    React.SetStateAction<'success' | 'error'>
  >;
  handleClickDeletedToast: (newState: SnackbarOrigin) => void;
}
const Task: React.FC<Props> = (props) => {
  const {
    _id,
    title,
    isDone,
    setTasks,
    setTotalTask,
    setDeletedTaskStatus,
    handleClickDeletedToast,
  } = props;
  const [task, setTask] = useState<TaskDetail>({
    _id,
    title,
    isDone,
  });
  const [updatedTask, setUpdatedTask] = useState<string>(task.title);
  const [updatedModal, setUpdatedModal] = useState<boolean>(false);
  const [updatedTaskStatus, setUpdatedTaskStatus] = useState<
    'success' | 'error'
  >('error');
  const [showUpdatedToast, setShowUpdatedToast] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const handleClickUpdatedToast = (newState: SnackbarOrigin) => {
    setShowUpdatedToast({ open: true, ...newState });
  };

  const handleCloseUpdatedToast = () => {
    setShowUpdatedToast({ ...showUpdatedToast, open: false });
  };
  const toggleShowModal = () => {
    setUpdatedTask(task.title);
    setUpdatedModal(!updatedModal);
  };
  const handleMarkATask = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    try {
      const res = await request.put(`/tasks/update/${task._id}`, {
        isDone: !task.isDone,
      });
      if (res.data.message == 'successful') {
        setTask(res.data.task);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteATask = async (
    e: React.MouseEvent | React.KeyboardEvent
  ) => {
    e.preventDefault();
    try {
      const res = await request.delete(`/tasks/delete/${task._id}`);
      if (res.data.message == 'successful') {
        setTasks((tasks) => tasks.filter((value) => value._id !== task._id));
        setTotalTask((totalTask) => totalTask - 1);
        setDeletedTaskStatus('success');
      }
    } catch (error) {
      setDeletedTaskStatus('error');
      console.log(error);
    }
    handleClickDeletedToast({ vertical: 'top', horizontal: 'right' });
  };
  const handleUpdateATask = async (
    e: React.MouseEvent | React.KeyboardEvent
  ) => {
    e.preventDefault();
    try {
      const res = await request.put(`/tasks/update/${task._id}`, {
        title: updatedTask,
      });
      if (res.data.message == 'successful') {
        setTask(res.data.task);
        setUpdatedTaskStatus('success');
        toggleShowModal();
      }
    } catch (error) {
      setUpdatedTaskStatus('error');
      console.log(error);
    }
    handleClickUpdatedToast({ vertical: 'top', horizontal: 'right' });
  };
  return (
    <>
      <Container>
        <Row
          style={{ backgroundColor: '#F1E4CB' }}
          className="rounded w-100 py-2 mx-0 my-2 d-flex justify-content-between"
        >
          <Col sm="10" className="ps-1 pe-0">
            <span className="fw-bold">
              <MDBIcon fas icon="angle-double-right" />{' '}
            </span>
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
                        <MDBModalTitle>Update a task</MDBModalTitle>
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
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setUpdatedTask(e.target.value);
                          }}
                          value={updatedTask}
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
        {updatedTaskStatus == 'success' ? (
          <MyToast
            {...showUpdatedToast}
            handleClose={handleCloseUpdatedToast}
            message="Update a task successfully"
            severity={updatedTaskStatus}
          />
        ) : (
          <MyToast
            {...showUpdatedToast}
            handleClose={handleCloseUpdatedToast}
            message="Fail to update a task"
            severity={updatedTaskStatus}
          />
        )}
      </Container>
    </>
  );
};

export default Task;
