const authService = require('../../../services/authService');

module.exports = {
  async register(req, res) {
    try {
      const { email, password } = req.body;
      
      console.log('Registering user with email:', email);
      if (!email || !password) {
        return res.status(400).json({
          status: 'FAIL',
          message: 'Email and password are required'
        });
      }

      const user = await authService.register(email, password);
      
      res.status(201).json({
        status: 'OK',
        data: {
          id: user.id,
          email: user.email,
          token: user.token
        }
      });
    } catch (error) {
      if (error.message.includes('already registered')) {
        return res.status(409).json({
          status: 'FAIL',
          message: `User with email ${req.body.email} already exists`
        });
      }
      
      res.status(400).json({
        status: 'FAIL',
        message: error.message
      });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({
          status: 'FAIL',
          message: 'Email and password are required'
        });
      }

      const auth = await authService.login(email, password);
      
      res.status(200).json({
        status: 'OK',
        data: {
          id: auth.id,
          email: auth.email,
          token: auth.token
        }
      });
    } catch (error) {
      const statusCode = error.message.includes('Invalid credentials') ? 401 : 400;
      
      res.status(statusCode).json({
        status: 'FAIL',
        message: error.message
      });
    }
  },

  async whoAmI(req, res) {
    try {
      const user = req.user;
      
      if (!user) {
        return res.status(404).json({
          status: 'FAIL',
          message: 'User not found'
        });
      }

      res.status(200).json({
        status: 'OK',
        data: {
          id: user.id,
          email: user.email
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'FAIL',
        message: 'Internal server error'
      });
    }
  }
};