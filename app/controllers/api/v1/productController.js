const productService = require('../../../services/productService');

module.exports = {
  async findAll(req, res) {
    try {
      const { page, limit, search } = req.query;
      const { count, rows: products } = await productService.findAll({ page, limit, search });
      
      res.status(200).json({
        status: 'OK',
        data: products,
        meta: {
          total: count,
          page: parseInt(page) || 1,
          limit: parseInt(limit) || 10
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'FAIL',
        message: error.message
      });
    }
  },

  async find(req, res) {
    try {
      const product = await productService.find(req.params.id);
      res.status(200).json({
        status: 'OK',
        data: product
      });
    } catch (error) {
      res.status(error.message.includes('not found') ? 404 : 500).json({
        status: 'FAIL',
        message: error.message
      });
    }
  },

  async create(req, res) {
    try {
      const product = await productService.create(req.body);
      res.status(201).json({
        status: 'OK',
        data: product
      });
    } catch (error) {
      res.status(400).json({
        status: 'FAIL',
        message: error.message
      });
    }
  },

  async update(req, res) {
    try {
      const product = await productService.update(req.params.id, req.body);
      res.status(200).json({
        status: 'OK',
        data: product
      });
    } catch (error) {
      const statusCode = error.message.includes('not found') ? 404 : 400;
      res.status(statusCode).json({
        status: 'FAIL',
        message: error.message
      });
    }
  },

  async delete(req, res) {
    try {
      const result = await productService.delete(req.params.id);
      res.status(200).json({
        status: 'OK',
        data: result
      });
    } catch (error) {
      const statusCode = error.message.includes('not found') ? 404 : 500;
      res.status(statusCode).json({
        status: 'FAIL',
        message: error.message
      });
    }
  }
};