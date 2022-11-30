export default {
  validateLogin(credentials) {
    let errorCode = 1;
    if (credentials.username === '') errorCode *= 2;
    if (credentials.password === '') errorCode *= 3;
    return errorCode;
  }
}