const productRepository = require('../repositories/productRepository');

class ProductService {
    static async findAll({ page, limit, search } = {}) {
        try {
            return await productRepository.findAll({
                page,
                limit,
                search: search || undefined
            });
        } catch (error) {
            console.error('Service error:', error);
            throw new Error(`Failed to list products: ${error.message}`);
        }
    }
    static async find(id) {
        try {
            const product = await productRepository.find(id);
            if (!product) throw new Error('Product not found');
            return product;
        } catch (error) {
            throw new Error(`Failed to get product: ${error.message}`);
        }
    }

    static async create(productData) {
        try {
            return await productRepository.create(productData);
        } catch (error) {
            throw new Error(`Failed to create product: ${error.message}`);
        }
    }

    static async update(id, productData) {
        try {
            const affectedCount = await productRepository.update(id, productData);
            if (affectedCount === 0) throw new Error('Product not found or no changes made');
            return await this.find(id);
        } catch (error) {
            throw new Error(`Failed to update product: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const deleted = await productRepository.delete(id);
            if (!deleted) throw new Error('Product not found');
            return { success: true, message: 'Product deleted successfully' };
        } catch (error) {
            throw new Error(`Failed to delete product: ${error.message}`);
        }
    }
}

module.exports = ProductService;