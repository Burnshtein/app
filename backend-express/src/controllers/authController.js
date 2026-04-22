// api/controllers/authController.js
const authUseCases = require('../Services/authUseCases');

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const result = await authUseCases.register(email, username, password);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authUseCases.login(email, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = { register, login };