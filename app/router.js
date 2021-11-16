'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret);

  router.get('/', controller.home.index);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/decodeToken', _jwt, controller.user.decodeToken);
  router.get('/api/user/getUserInfo', _jwt, controller.user.getUserInfo);
};
