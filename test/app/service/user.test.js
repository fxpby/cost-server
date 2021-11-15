'use strict';

const { app, assert } = require('egg-mock/bootstrap');

const deafultAvatar = 'https://fxpby.oss-cn-beijing.aliyuncs.com/project/egg-cost/avatar.jpg';

describe('test/app/service/user.test.js', () => {
  // 通过用户名获取用户信息
  it('getUserByName', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.user.getUserByName('olu');
    assert(result !== null);
  });

  // 注册
  it('register', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.user.register({
      username: `olu-test-${new Date().getTime()}`,
      password: '123456',
      signature: '今天天气不错，设置一下个性签名吧',
      avatar: deafultAvatar,
      ctime: new Date().getTime(),
    });
    assert(result !== null);
  });
});

