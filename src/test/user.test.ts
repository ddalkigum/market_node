import connection from '../connection';
import request from 'supertest';
import app from '../app';

beforeAll(async () => {
  await connection.create();
  console.log('TEST DB CREATED');
});

afterAll(async () => {
  await connection.close();
  console.log('TEST DB CLOSED');
});

beforeEach(async () => {
  await connection.clear();
  console.log('TEST DB CLEAR');
});

describe('POST /users/signup', () => {
  it('User signup success', async (done) => {
    await request(app)
      .post('/users/signup')
      .send({
        email: 'testmarket@gmail.com',
        password: '12341234',
        name: 'jun',
      })
      .expect(201)
      .expect({ message: 'SUCCESS' });
    done();
  });

  it('User signup fail - KEY_ERROR', async (done) => {
    await request(app)
      .post('/users/signup')
      .send({
        e: 'testmarket@gmail.com',
        p: '12341234',
        n: 'jun',
      })
      .expect(401)
      .expect({ message: 'KEY_ERROR' });
    done();
  });
});
