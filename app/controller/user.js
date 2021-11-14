'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;

    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: '不能填写空值哦',
        data: null,
      };
      return;
    }
  }
}

module.exports = UserController;
