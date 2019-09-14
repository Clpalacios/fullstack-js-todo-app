const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../../index');
const TaskModel = require('../../app/models/task-schema');

chai.use(chaiHttp);
chai.should();

const BASE_URL = '/api/v1/tasks';
const TASK_ID = '5d7543ee7d65d539446456c5';
const INVALID_TASK_ID = '5d7543ee7d65d539446456c9';

describe("Task controller", () => {
  before(done => {
    mongoose.connect('mongodb://localhost:27017/todoAppDB', { useNewUrlParser: true, useFindAndModify: false }, done);
    new TaskModel({ _id: TASK_ID, description: 'Exercise!' }).save();
  });

  describe("GET /api/v1/tasks", () => {
    it("should get all tasks", (done) => {
      chai.request(app)
        .get(BASE_URL)
        .end((_err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body.should.have.length(1);
          res.body.should.include.deep.ordered.members([{ _id: TASK_ID, description: 'Exercise!', __v: 0 }]);
          done();
        });
    });
  });

  describe("POST /api/v1/tasks", () => {
    it("should create a task", (done) => {
      chai.request(app)
        .post(BASE_URL)
        .send({ description: 'New task' })
        .end((_err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('description').eql('New task');
          res.body.should.have.property('__v').eql(0);
          done();
        });
    });

    it("should not create a task without a description", done => {
      chai.request(app)
        .post(BASE_URL)
        .send({})
        .end((_err, res) => {
          res.should.have.status(422);
          res.body.should.be.an('object');
          res.body.should.have.property('type').eql('ValidationError');
          res.body.should.have.property('statusCode').eql(422);
          res.body.should.have.property('fieldErrors');
          res.body.fieldErrors.should.be.an('array');
          res.body.fieldErrors.should.include.deep.ordered.members([{ field: 'description', message: 'A task description is required.' }]);
          done();
        });
    });
  });

  describe("PUT /api/v1/tasks/:id", () => {
    it("should mark a task as completed", done => {
      chai.request(app)
        .put(`${BASE_URL}/${TASK_ID}`)
        .send({ description: 'Exercise!', completed: true })
        .end((_err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('_id').eql(TASK_ID);
          res.body.should.have.property('description').eql('Exercise!');
          res.body.should.have.property('completed').eql(true);
          res.body.should.have.property('__v').eql(0);
          done();
        });
    });

    it("should return a 404 when a non existing task id is passed as argument", done => {
      chai.request(app)
        .put(`${BASE_URL}/${INVALID_TASK_ID}`)
        .send({ description: 'Exercise!', completed: true })
        .end((_err, res) => {
          res.should.have.status(404);
          assertTaskNotFound(res.body);
          done();
        });
    });
  });

  describe("DELETE /api/v1/tasks/:id", () => {
    it("should delete a task", done => {
      chai.request(app)
        .delete(`${BASE_URL}/${TASK_ID}`)
        .end((_err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          done();
        });
    });

    it("should return 404 when deleting a non existing task", done => {
      chai.request(app)
        .delete(`${BASE_URL}/${INVALID_TASK_ID}`)
        .end((_err, res) => {
          res.should.have.status(404);
          assertTaskNotFound(res.body);
          done();
        });
    });
  });

  after(() => {
    TaskModel.deleteMany({}, () => {
      mongoose.connection.close();
    });
  });
});

const assertTaskNotFound = responseObj => {
  responseObj.should.be.an('object');
  responseObj.should.have.property('type').eql('Resource Not Found');
  responseObj.should.have.property('statusCode').eql(404);
  responseObj.should.have.property('message').eql(`Task not found for id ${INVALID_TASK_ID}`);
}