const validUsers = [
  { username: 'Haidarali', password: 'Test@123' },
];

const invalidUsers = [
  { username: 'unknown_user', password: 'WrongPass123', expected: /wrong password|password/i },
  { username: 'Haidarali', password: 'WrongPass123', expected: /wrong password|password/i },
];

const blankLoginUsers = [
  { username: '', password: 'Test@123' },
  { username: 'Haidarali', password: '' },
];

const invalidSignUpUsers = [
  { username: 'Haidarali', password: 'Test@123', expected: /already exist|exist/i },
];

const blankSignUpUsers = [
  { username: '', password: 'StrongPass1!' },
];

module.exports = {
  validUsers,
  invalidUsers,
  blankLoginUsers,
  invalidSignUpUsers,
  blankSignUpUsers,
};
