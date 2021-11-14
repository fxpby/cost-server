'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {

  it('register 方法返回帐户注册成功信息', async () => {
    await app.httpRequest()
      .get('/register')
      .expect(200)
      .expect('注册成功');
  });

});
