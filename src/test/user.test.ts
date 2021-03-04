import dotenv from 'dotenv';
dotenv.config();
import connection from '../connection';
import request from 'supertest';
import app from '../app';
import User from '../Entities/user/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

beforeAll(async () => {
  await connection.create();
  console.log('TEST DB CREATED');
});

afterAll(async () => {
  await connection.close();
  console.log('TEST DB CLEAR');
});

beforeEach(async () => {
  await connection.clear();
  console.log('TEST DB CLEAR');
});

describe('POST /users/signup', () => {
  it('User signup success | message = SUCCESS', async (done) => {
    await request(app)
      .post('/users/signup')
      .send({
        email: 'testmarket2@gmail.com',
        password: '12341234',
        name: 'jun',
      })
      .expect(201)
      .expect({ message: 'SUCCESS' });
    done();
  });

  it('User signup error | error message = ALREADY_EXIST', async (done) => {
    await User.create({
      email: 'testmarket@gmail.com',
      password: '12341234',
      name: 'jun',
    }).save();

    await request(app)
      .post('/users/signup')
      .send({
        email: 'testmarket@gmail.com',
        password: '12341234',
        name: 'jun',
      })
      .expect(401)
      .expect({
        message: 'ALREADY_EXIST',
      });
    done();
  });

  it('User signup error | error message = KEY_ERROR', async (done) => {
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

  it('User signup error | error message = KEY_ERROR', async (done) => {
    await request(app)
      .post('/users/signup')
      .send({
        e: 'testmarket@gmail.com',
        password: '12341234',
        name: 'jun',
      })
      .expect(401)
      .expect({ message: 'KEY_ERROR' });
    done();
  });
});

describe('POST /users/signin', () => {
  it('User signin success', async (done) => {
    const hashPassword = await bcrypt.hash('12341234', 10);
    const user = await User.create({
      email: 'testnode@gmail.com',
      password: hashPassword,
      name: 'jun',
    }).save();
    const token = jwt.sign({ id: user.id }, process.env.SECRET);
    await request(app)
      .post('/users/signin')
      .send({
        email: 'testnode@gmail.com',
        password: '12341234',
      })
      .expect(200)
      .expect({
        message: 'SUCCESS',
        Authorization: token,
      });
    done();
  });

  it('User signin error | error message = ', async (done) => {
    const hashPassword = await bcrypt.hash('12341234', 10);
    await User.create({
      email: 'testnode@gmail.com',
      password: hashPassword,
      name: 'jun',
    }).save();

    await request(app)
      .post('/users/signin')
      .send({
        email: 'errornode@gmail.com',
        password: '12341234',
      })
      .expect(403)
      .expect({
        message: 'Forbidden',
      });
    done();
  });

  it('User signin success', async (done) => {
    const hashPassword = await bcrypt.hash('12341234', 10);
    await User.create({
      email: 'testnode@gmail.com',
      password: hashPassword,
      name: 'jun',
    }).save();

    await request(app)
      .post('/users/signin')
      .send({
        email: 'testnode@gmail.com',
        password: 'errorPassword',
      })
      .expect(403)
      .expect({
        message: 'Forbidden',
      });
    done();
  });
});
