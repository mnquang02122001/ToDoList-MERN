"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const index_1 = __importDefault(require("../src/index"));
const Task_1 = __importDefault(require("../src/models/Task"));
chai_1.default.use(chai_http_1.default);
let validTaskId = '';
let inValidTaskId = 'xtz';
const validTask = {
    title: 'Studying IELTS',
    isDone: false
};
const updatedTask = {
    title: 'Studying TOEIC',
    isDone: true
};
const inValidTasks = [
    {
        title: '',
        isDone: false
    },
    {
        title: 123456,
        isDone: 'Not done'
    },
    {
        title: 'Studying IELTS'
    },
    {
        description: 'Finish full 4 skills test'
    },
    {
        title: 'Studying IELTS'
    }
];
const inValidUpdatedTasks = [
    {
        title: '',
        isDone: false
    },
    {
        title: 123456,
        isDone: 'Not done'
    }
];
const validUpdatedTasks = [
    {
        title: 'Studying IELTS'
    },
    {
        isDone: false
    },
    {
        title: 'Studying IELTS',
        isDone: false
    }
];
describe('Task manager', () => {
    before((done) => {
        Task_1.default.deleteMany()
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
                chai_1.default.request(index_1.default)
                    .post('/api/v1/tasks/create')
                    .send(task)
                    .end((err, res) => {
                    (0, chai_1.expect)(res.status).to.be.equal(400);
                    (0, chai_1.expect)(res.body).to.have.property('message');
                    done();
                });
            });
        });
        it('Should create a task successfully', (done) => {
            chai_1.default.request(index_1.default)
                .post('/api/v1/tasks/create')
                .send(validTask)
                .end((err, res) => {
                (0, chai_1.expect)(res.status).to.be.equal(200);
                (0, chai_1.expect)(res.body.message).to.be.equal('successful');
                (0, chai_1.expect)(res.body.task.title).to.be.equal(validTask.title);
                (0, chai_1.expect)(res.body.task.isDone).to.be.equal(validTask.isDone);
                (0, chai_1.expect)(res.body.task).to.have.property('_id');
                validTaskId = res.body.task._id;
                done();
            });
        });
    });
    describe('GET /api/v1/tasks/get', () => {
        it('Should get all tasks successfully', (done) => {
            chai_1.default.request(index_1.default)
                .get('/api/v1/tasks/get')
                .end((err, res) => {
                (0, chai_1.expect)(res.status).to.be.equal(200);
                (0, chai_1.expect)(res.body.metadata.total).to.be.equal(1);
                (0, chai_1.expect)(res.body.metadata.offset).to.be.equal(0);
                (0, chai_1.expect)(res.body.metadata.limit).to.be.equal(1);
                (0, chai_1.expect)(res.body.tasks.length).to.be.equal(1);
                (0, chai_1.expect)(res.body.tasks[0].title).to.be.equal(validTask.title);
                (0, chai_1.expect)(res.body.tasks[0].isDone).to.be.equal(validTask.isDone);
                (0, chai_1.expect)(res.body.tasks[0]._id).to.be.equal(validTaskId);
                done();
            });
        });
    });
    describe('GET /api/v1/tasks/get/:taskId', () => {
        it('Should get a task unsuccessfully due to wrong taskId', (done) => {
            chai_1.default.request(index_1.default)
                .get(`/api/v1/tasks/get/${inValidTaskId}`)
                .end((err, res) => {
                (0, chai_1.expect)(res.status).to.be.equal(400);
                (0, chai_1.expect)(res.body).to.have.property('message');
                done();
            });
        });
        it('Should get a task successfully', (done) => {
            chai_1.default.request(index_1.default)
                .get(`/api/v1/tasks/get/${validTaskId}`)
                .end((err, res) => {
                (0, chai_1.expect)(res.status).to.be.equal(200);
                (0, chai_1.expect)(res.body.task.title).to.be.equal(validTask.title);
                (0, chai_1.expect)(res.body.task.isDone).to.be.equal(validTask.isDone);
                (0, chai_1.expect)(res.body.task._id).to.be.equal(validTaskId);
                done();
            });
        });
    });
    describe('PUT /api/v1/tasks/update/:taskId', () => {
        it('Should update a task unsuccessfully due to wrong taskId', (done) => {
            chai_1.default.request(index_1.default)
                .put(`/api/v1/tasks/update/${inValidTaskId}`)
                .send(updatedTask)
                .end((err, res) => {
                (0, chai_1.expect)(res.status).to.be.equal(400);
                (0, chai_1.expect)(res.body).to.have.property('message');
                done();
            });
        });
        inValidUpdatedTasks.forEach((task) => {
            it('Should update a task unsuccessfully due to invalid update task', (done) => {
                chai_1.default.request(index_1.default)
                    .put(`/api/v1/tasks/update/${validTaskId}`)
                    .send(task)
                    .end((err, res) => {
                    (0, chai_1.expect)(res.status).to.be.equal(400);
                    (0, chai_1.expect)(res.body).to.have.property('message');
                    done();
                });
            });
        });
        validUpdatedTasks.forEach((task) => {
            it('Should update a task successfully', (done) => {
                chai_1.default.request(index_1.default)
                    .put(`/api/v1/tasks/update/${validTaskId}`)
                    .send(task)
                    .end((err, res) => {
                    (0, chai_1.expect)(res.status).to.be.equal(200);
                    (0, chai_1.expect)(res.body).to.have.property('task');
                    done();
                });
            });
        });
        it('Should update a task successfully', (done) => {
            chai_1.default.request(index_1.default)
                .put(`/api/v1/tasks/update/${validTaskId}`)
                .send(updatedTask)
                .end((err, res) => {
                (0, chai_1.expect)(res.status).to.be.equal(200);
                (0, chai_1.expect)(res.body.message).to.be.equal('successful');
                (0, chai_1.expect)(res.body.task.title).to.be.equal(updatedTask.title);
                (0, chai_1.expect)(res.body.task.isDone).to.be.equal(updatedTask.isDone);
                (0, chai_1.expect)(res.body.task._id).to.be.equal(validTaskId);
                done();
            });
        });
    });
    describe('DELETE /api/v1/tasks/delete/:taskId', () => {
        it('Should delete a task unsuccessfully due to wrong taskId', (done) => {
            chai_1.default.request(index_1.default)
                .delete(`/api/v1/tasks/delete/${inValidTaskId}`)
                .end((err, res) => {
                (0, chai_1.expect)(res.status).to.be.equal(400);
                (0, chai_1.expect)(res.body).to.have.property('message');
                done();
            });
        });
        it('Should delete a task successfully', (done) => {
            chai_1.default.request(index_1.default)
                .delete(`/api/v1/tasks/delete/${validTaskId}`)
                .end((err, res) => {
                (0, chai_1.expect)(res.status).to.be.equal(200);
                (0, chai_1.expect)(res.body.message).to.be.equal('successful');
                done();
            });
        });
    });
});
