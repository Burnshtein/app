// useCases/authUseCases.js
const userRepository = require('../../domain/repositories/userRepository');
const { hashPassword, comparePassword } = require('../Utils/hashing/bcryptHasher');
const { generateToken } = require('../Utils/auth/jwtHandler');

const register = async (email, username, password) => {
  const existing = await userRepository.findByEmail(email);
  if (existing) throw new Error('User already exists');
  
  const hashedPassword = await hashPassword(password);
  const user = await userRepository.create(email, username, hashedPassword);
  const token = generateToken(user.id);
  
  return { token, user: { id: user.id, email: user.email, username: user.username } };
};

const login = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error('Invalid credentials');
  
  const isValid = await comparePassword(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');
  
  const token = generateToken(user.id);
  return { token, user: { id: user.id, email: user.email, username: user.username } };
};

module.exports = { register, login };