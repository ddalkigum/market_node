import errorGenerator from '../Errors/errorGenerator';

const emailValidation = (email: string) => {
  const regex = /^[a-zA-Z0-9-_.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
  if (regex.test(email)) return email;

  errorGenerator({ statusCode: 403 });
};

export default emailValidation;
