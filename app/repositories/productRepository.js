const { Product } = require('../models');

module.exports = {
  async findAll(options = {}) {
    try {
      const { page, limit, search, ...condition } = options;

      const where = search
        ? {
          ...condition,
          name: { [Op.like]: `%${search}%` }
        }
        : condition;

      if (!page || !limit) {
        const result = await Product.findAndCountAll({ where });
        return {
          data: result.rows,
          meta: {
            total: result.count
          }
        };
      }

      const offset = (page - 1) * limit;
      const result = await Product.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: offset
      });

      return {
        data: result.rows,
        total: result.count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(result.count / limit)
      };
    } catch (error) {
      console.error('Repository error:', error);
      throw error;
    }
  },


  create(body) {
    return Product.create(body);
  },

  find(id) {
    return Product.findOne({
      where: {
        id: id,
      },
    });
  },

  update(id, body) {
    return Product.update(body, { where: { id } });
  },

  delete(id) {
    return Product.destroy({ where: { id } });
  },

  count() {
    return Product.count();
  },

};
