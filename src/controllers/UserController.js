/* eslint-disable camelcase */
const { UserService } = require('../services');
const CartService = require('../services/CartService');
const {
  comparePasswords,
  createToken,
  extractUserInfo,
  makeNewCart,
} = require('../utils');

module.exports = {
  getAll: async (req, res) => {
    try {
      const users = await UserService.getAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(401).json(error);
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await UserService.getOne(id);
      if (!user) return res.status(404).json({ message: 'User not found.' });
      res.status(200).json(user);
    } catch (error) {
      res.status(401).json(error);
    }
  },
  create: async (req, res) => {
    const { email } = req.body;
    try {
      const userExists = await UserService.getOneByEmail(email);
      if (userExists) res.status(400).json({ message: 'Cannot create user with this email.' });
      const newUser = await UserService.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(401).json(error);
    }
  },
  update: async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    try {
      const user = await UserService.getOne(id);
      if (!user) res.status(404).json({ message: 'User not found.' });
      const modifiedUser = await UserService.update(user, body);
      res.status(200).json(modifiedUser);
    } catch (error) {
      res.status(401).json(error);
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await UserService.getOne(id);
      if (!user) res.status(404).json({ message: 'User not found.' });
      await UserService.delete(id);
      res.status(204).json({});
    } catch (error) {
      res.status(401).json(error);
    }
  },
  signup: async (req, res) => {
    const { email, password, confirm_password } = req.body;
    try {
      if (password !== confirm_password) return res.status(401).json({ message: 'Passwords no not match.' });
      const userExists = await UserService.getOneByEmail(email);
      if (userExists) res.status(401).json({ message: 'Cannot create user with this email.' });
      const userInfo = extractUserInfo(req.body);
      const newUser = await UserService.create(userInfo);
      newUser.password = undefined;
      newUser.confirm_password = undefined;

      // extract Cart information from body and add user id
      // eslint-disable-next-line no-underscore-dangle
      const newCartInfo = makeNewCart(newUser._id, req.body);

      // create a new cart with the user id
      await CartService.create(newCartInfo);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(401).json(error);
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserService.getOneByEmail(email);
      if (!user) res.status(404).json({ message: 'Problem with credentials.' });
      const isValid = comparePasswords(user.password, password);
      if (!isValid) res.status(401).json({ message: 'Problem with credentials.' });
      const token = createToken(user);
      if (!token) res.status(500).json({ message: 'Error on token creation.' });
      res.status(200).json({ message: 'Login succesfull.', token });
    } catch (error) {
      res.status(401).json(error);
    }
  },
};
