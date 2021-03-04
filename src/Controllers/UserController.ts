import { Request, Response } from 'express';
import errorWrapper from '../Errors/errorWrapper';
import emailValidation from '../Utils/Validation';
import UserServices, {
  UserCreateInput,
  UserSignInInput,
} from '../Services/UserServices';
import bcrypt from 'bcrypt';
import errorGenerator from '../Errors/errorGenerator';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const signUp = errorWrapper(async (request: Request, response: Response) => {
  const { email, password, name }: UserCreateInput = request.body;
  if (!email || !password || !name)
    errorGenerator({ statusCode: 401, message: 'KEY_ERROR' });

  const cleanEmail = emailValidation(email);
  const user = await UserServices.findUser({ email });
  if (user) errorGenerator({ statusCode: 401, message: 'ALREADY_EXIST' });

  const hashPassword = await bcrypt.hash(password, 10);
  await UserServices.createUser({
    email: cleanEmail,
    password: hashPassword,
    name,
  });

  response.status(201).json({
    message: 'SUCCESS',
  });
});

const signIn = errorWrapper(async (request: Request, response: Response) => {
  const { email, password }: UserSignInInput = request.body;
  const user = await UserServices.findUser({ email });
  if (!user) errorGenerator({ statusCode: 403 });

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) errorGenerator({ statusCode: 403 });

  const token = jwt.sign({ id: user.id }, process.env.SECRET);
  response.status(200).json({
    message: 'SUCCESS',
    Authorization: token,
  });
});

const kakaoSignIn = errorWrapper(
  async (request: Request, response: Response) => {
    const { accessToken } = request.headers;
    const uri = 'https://kapi.kakao.com/v2/user/me';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const profileRequest = await axios.get(uri, { headers });
  },
);

export default { signUp, signIn };
