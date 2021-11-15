'use strict';

// getUserByName
const { app, assert } = require('egg-mock/bootstrap');

const deafultAvatar = 'https://fxpby.oss-cn-beijing.aliyuncs.com/project/egg-cost/avatar.jpg';

describe('test/app/service/user.test.js', () => {
  // 通过用户名获取用户信息成功
  it('getUserByName success', async () => {
    const ctx = app.mockContext();
    try {
      const result = await ctx.service.user.getUserByName('olu');
      assert(result !== null);
    } catch (err) {
      assert(err === null);
    }
  });

  // 通过用户名获取用户信息失败
  it('getUserByName failed', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.user.getUserByName({ a: 1 });
    assert(result === null);
  });

  // 注册成功
  it('register success', async () => {
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

  // 注册失败
  it('register failed', async () => {
    const ctx = app.mockContext();
    try {
      await ctx.service.user.register({
        username1: '',
        password: '123456',
        signature: '今天天气不错，设置一下个性签名吧',
        avatar: deafultAvatar,
        ctime: new Date().getTime(),
      });
    } catch (err) {
      assert(err === null);
    }
  });
});

