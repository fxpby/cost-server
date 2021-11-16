'use strict';

const dayjs = require('dayjs');
const Controller = require('egg').Controller;
const deafultAvatar = 'https://fxpby.oss-cn-beijing.aliyuncs.com/project/egg-cost/avatar.jpg';

class UserController extends Controller {
  // 注册
  async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;

    // 判断用户名/密码是否为空
    if (!username || username === '' || !password || password === '') {
      ctx.body = {
        code: 500,
        msg: '不能填写空值哦',
        data: null,
      };
      return;
    }

    // 验证数据库内是否已经存在重名用户
    const userInfo = await ctx.service.user.getUserByName(username);

    if (userInfo && userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '帐户名已经被注册了，请换一个吧',
        data: null,
      };
      return;
    }

    // 写入数据库
    const result = await ctx.service.user.register({
      username,
      password,
      signature: '今天天气不错，设置一下个性签名吧',
      avatar: deafultAvatar,
      ctime: dayjs().format(),
    });

    if (result) {
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: null,
      };
    } else {
      ctx.body = {
        code: 500,
        msg: '注册失败',
        data: null,
      };
    }

  }

  // 登陆
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;

    // 判断用户名/密码是否为空
    if (!username || username === '' || !password || password === '') {
      ctx.body = {
        code: 500,
        msg: '不能填写空值哦',
        data: null,
      };
      return;
    }

    const userInfo = await ctx.service.user.getUserByName(username);

    if (!userInfo || !userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账号不存在哦',
        data: null,
      };
      return;
    }

    if (userInfo && password !== userInfo.password) {
      ctx.body = {
        code: 500,
        msg: '密码不对哦，再想想吧',
        data: null,
      };
      return;
    }

    // 生成 token 加盐
    // app.jwt.sign 方法接受两个参数，第一个为对象，即要加密的内容；第二个是加密字符串
    const token = app.jwt.sign({
      id: userInfo.id,
      username: userInfo.username,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // token 有效期 24 小时
    }, app.config.jwt.secret);

    ctx.body = {
      code: 200,
      msg: '登陆成功~',
      data: token,
    };
  }

  // 解析token
  async decodeToken() {
    const { ctx, app } = this;
    // 通过 token 解析，拿到 user_id
    const token = ctx.request.header.authorization;
    // 通过 app.jwt.verify + 加密字符串 解析出 token 值
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    // 响应接口
    ctx.body = {
      code: 200,
      msg: '获取 token 成功',
      data: {
        ...decode,
      },
    };
  }

  // 获取用户信息
  async getUserInfo() {
    const { ctx, app } = this;

    const token = ctx.request.header.authorization;

    const decode = await app.jwt.verify(token, app.config.jwt.secret);

    const userInfo = await ctx.service.user.getUserByName(decode.username);

    ctx.body = {
      code: 200,
      msg: '请求成功',
      data: {
        id: userInfo.id,
        username: userInfo.username,
        signature: userInfo.signature || '',
        avatar: userInfo.avatar || deafultAvatar,
      },
    };
  }
}

module.exports = UserController;
