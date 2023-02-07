import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MDBInputGroup, MDBBtn, MDBSpinner } from 'mdb-react-ui-kit';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MyToast from './MyToast';
import Task from './Task';
import request from '../api/request';

export interface State extends SnackbarOrigin {
  open: boolean;
}
export interface TaskDetail {
  _id: string;
  isDone: boolean;
  title: string;
}
const TasksBoard: React.FC = () => {
  const [totalTask, setTotalTask] = useState<number>(0);
  const [tasks, setTasks] = useState<TaskDetail[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [newTaskStatus, setNewTaskStatus] = useState<'success' | 'error'>(
    'error'
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  useEffect(() => {
    const getAllTasks = async () => {
      try {
        setLoading(true);
        const res = await request.get('/tasks/get');
        setLoading(false);
        setTotalTask(res.data.metadata.total);
        setTasks(res.data.tasks);
      } catch (error) {
        console.log(error);
      }
    };
    getAllTasks();
  }, []);
  const handleClickToast = (newState: SnackbarOrigin) => {
    setShowToast({ open: true, ...newState });
  };

  const handleCloseToast = () => {
    setShowToast({ ...showToast, open: false });
  };
  const handleAddTask = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    try {
      const res = await request.post('/tasks/create', {
        title: newTask,
        isDone: false,
      });
      if (res.data.message == 'successful') {
        setNewTaskStatus('success');
        setTasks((tasks) => [...tasks, res.data.task]);
        setTotalTask((totalTask) => totalTask + 1);
        setNewTask('');
      }
    } catch (error) {
      console.log(error);
    }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewTask(e.target.value);
              }}
              value={newTask}
            />
            <MDBBtn onClick={handleAddTask}>Add</MDBBtn>
          </MDBInputGroup>
        </Row>
        <Row className="mt-2">
          <Col sm="6">
            <span className="fw-bold">Total Tasks: </span>
            <span>{totalTask}</span>
          </Col>
        </Row>
        <hr style={{ margin: '0' }}></hr>
        {loading && (
          <Row className="justify-content-center mt-1">
            <MDBSpinner color="primary">
              <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
          </Row>
        )}
        <Row>
          {tasks.map((task, index) => {
            return <Task key={task._id} {...task} />;
          })}
        </Row>
      </Container>
      {newTaskStatus === 'success' ? (
        <MyToast
          {...showToast}
          handleClose={handleCloseToast}
          message="Add a task successfully!"
          severity={newTaskStatus}
        />
      ) : (
        <MyToast
          {...showToast}
          handleClose={handleCloseToast}
          message="Fail to add a task"
          severity={newTaskStatus}
        />
      )}
    </>
  );
};

export default TasksBoard;
