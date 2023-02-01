import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import Task from '../src/models/Task';
chai.use(chaiHttp);

let validTaskId = '';
let inValidTaskId = 'xtz';
const validTask = {
    title: 'Studying IELTS',
    description: 'Finish full 4 skills test',
    isDone: false
};
const updatedTask = {
    title: 'Studying TOEIC',
    description: 'Finish full 2 skills test',
    isDone: true
};
const inValidTasks = [
    {
        title: '',
        description: 'Finish full 4 skills test',
        isDone: false
    },
    {
        title: 123456,
        description: false,
        isDone: 'Not done'
    },
    {
        title: 'Studying IELTS'
    },
    {
        description: 'Finish full 4 skills test'
    },
    {
        isDone: false
    },
    {
        title: 'Studying IELTS',
        description: 'Finish full 4 skills test'
    },
    {
        title: 'Studying IELTS',
        isDone: false
    },
    {
        description: 'Finish full 4 skills test',
        isDone: false
    }
];
const inValidUpdatedTasks = [
    {
        title: '',
        description: 'Finish full 4 skills test',
        isDone: false
    },
    {
        title: 123456,
        description: false,
        isDone: 'Not done'
    }
];
const validUpdatedTasks = [
    {
        title: 'Studying IELTS'
    },
    {
        description: 'Finish full 4 skills test'
    },
    {
        isDone: false
    },
    {
        title: 'Studying IELTS',
        description: 'Finish full 4 skills test'
    },
    {
        title: 'Studying IELTS',
        isDone: false
    },
    {
        description: 'Finish full 4 skills test',
        isDone: false
    }
];
describe('Task manager', () => {
    before((done) => {
        Task.deleteMany()
            .then((res) => {
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
    describe('POST /api/v1/tasks/create', () => {
        inValidTasks.forEach((task) => {
            it('Should create a task unsuccessfully due to wrong input', (done) => {
                chai.request(app)
                    .post('/api/v1/tasks/create')
                    .send(task)
                    .end((err, res) => {
                        expect(res.status).to.be.equal(400);
                        expect(res.body).to.have.property('message');
                        done();
                    });
            });
        });
        it('Should create a task successfully', (done) => {
            chai.request(app)
                .post('/api/v1/tasks/create')
                .send(validTask)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body.message).to.be.equal('successful');
                    expect(res.body.task.title).to.be.equal(validTask.title);
                    expect(res.body.task.description).to.be.equal(validTask.description);
                    expect(res.body.task.isDone).to.be.equal(validTask.isDone);
                    expect(res.body.task).to.have.property('_id');
                    validTaskId = res.body.task._id;
                    done();
                });
        });
    });
    describe('GET /api/v1/tasks/get', () => {
        it('Should get all tasks successfully', (done) => {
            chai.request(app)
                .get('/api/v1/tasks/get')
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body.metadata.total).to.be.equal(1);
                    expect(res.body.metadata.offset).to.be.equal(0);
                    expect(res.body.metadata.limit).to.be.equal(1);
                    expect(res.body.tasks.length).to.be.equal(1);
                    expect(res.body.tasks[0].title).to.be.equal(validTask.title);
                    expect(res.body.tasks[0].description).to.be.equal(validTask.description);
                    expect(res.body.tasks[0].isDone).to.be.equal(validTask.isDone);
                    expect(res.body.tasks[0]._id).to.be.equal(validTaskId);
                    done();
                });
        });
    });
    describe('GET /api/v1/tasks/get/:taskId', () => {
        it('Should get a task unsuccessfully due to wrong taskId', (done) => {
            chai.request(app)
                .get(`/api/v1/tasks/get/${inValidTaskId}`)
                .end((err, res) => {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
        it('Should get a task successfully', (done) => {
            chai.request(app)
                .get(`/api/v1/tasks/get/${validTaskId}`)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body.task.title).to.be.equal(validTask.title);
                    expect(res.body.task.description).to.be.equal(validTask.description);
                    expect(res.body.task.isDone).to.be.equal(validTask.isDone);
                    expect(res.body.task._id).to.be.equal(validTaskId);
                    done();
                });
        });
    });
    describe('PUT /api/v1/tasks/update/:taskId', () => {
        it('Should update a task unsuccessfully due to wrong taskId', (done) => {
            chai.request(app)
                .put(`/api/v1/tasks/update/${inValidTaskId}`)
                .send(updatedTask)
                .end((err, res) => {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
        inValidUpdatedTasks.forEach((task) => {
            it('Should update a task unsuccessfully due to invalid update task', (done) => {
                chai.request(app)
                    .put(`/api/v1/tasks/update/${validTaskId}`)
                    .send(task)
                    .end((err, res) => {
                        expect(res.status).to.be.equal(400);
                        expect(res.body).to.have.property('message');
                        done();
                    });
            });
        });
        validUpdatedTasks.forEach((task) => {
            it('Should update a task successfully', (done) => {
                chai.request(app)
                    .put(`/api/v1/tasks/update/${validTaskId}`)
                    .send(task)
                    .end((err, res) => {
                        expect(res.status).to.be.equal(200);
                        expect(res.body).to.have.property('task');
                        done();
                    });
            });
        });
        it('Should update a task successfully', (done) => {
            chai.request(app)
                .put(`/api/v1/tasks/update/${validTaskId}`)
                .send(updatedTask)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body.message).to.be.equal('successful');
                    expect(res.body.task.title).to.be.equal(updatedTask.title);
                    expect(res.body.task.description).to.be.equal(updatedTask.description);
                    expect(res.body.task.isDone).to.be.equal(updatedTask.isDone);
                    expect(res.body.task._id).to.be.equal(validTaskId);
                    done();
                });
        });
    });
    describe('DELETE /api/v1/tasks/delete/:taskId', () => {
        it('Should delete a task unsuccessfully due to wrong taskId', (done) => {
            chai.request(app)
                .delete(`/api/v1/tasks/delete/${inValidTaskId}`)
                .end((err, res) => {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
        it('Should delete a task successfully', (done) => {
            chai.request(app)
                .delete(`/api/v1/tasks/delete/${validTaskId}`)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body.message).to.be.equal('successful');
                    done();
                });
        });
    });
});
