'use strict';

const Controller = require('egg').Controller;
const deafultAvatar = 'https://fxpby.oss-cn-beijing.aliyuncs.com/project/egg-cost/avatar.jpg';

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;

    // 判断用户名/密码是否为空
    if (!username || !password) {
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
      ctime: new Date().getTime(),
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
}

module.exports = UserController;
