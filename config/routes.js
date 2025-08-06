const express = require('express');
const controllers = require('../app/controllers');
const apiRouter = express.Router();
const authMiddleware = require('../app/middlewares/auth');

apiRouter.post('/api/v1/register', controllers.api.v1.authController.register);
apiRouter.post('/api/v1/login', controllers.api.v1.authController.login);

apiRouter.get('/api/v1/products', authMiddleware, controllers.api.v1.productController.findAll);
apiRouter.post('/api/v1/products', authMiddleware, controllers.api.v1.productController.create);
apiRouter.get('/api/v1/products/:id', authMiddleware, controllers.api.v1.productController.find);
apiRouter.put('/api/v1/products/:id', authMiddleware, controllers.api.v1.productController.update);
apiRouter.delete('/api/v1/products/:id', authMiddleware, controllers.api.v1.productController.delete);

apiRouter.get('/api/v1/whoami', authMiddleware, controllers.api.v1.authController.whoAmI);

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;