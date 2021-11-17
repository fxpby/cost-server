'use strict';

const dayjs = require('dayjs');
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
      ctime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
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
        ctime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      });
    } catch (err) {
      assert(err === null);
    }
  });

  // 修改用户信息成功
  it('editUserInfo success', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.user.editUserInfo({
      username: 'Olu',
      password: '123456',
      signature: '今天天气不错，设置一下个性签名吧',
      avatar: deafultAvatar,
      ctime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      id: 1,
    });
    assert(result !== null);
  });

  // 修改用户信息失败
  it('editUserInfo failed', async () => {
    const ctx = app.mockContext();
    try {
      await ctx.service.user.editUserInfo({
        username1: '',
        password: '123456',
        signature: '今天天气不错，设置一下个性签名吧',
        avatar: deafultAvatar,
        ctime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      });
    } catch (err) {
      assert(err === null);
    }
  });
});

