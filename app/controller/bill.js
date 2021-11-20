'use strict';

const Controller = require('egg').Controller;

class BillController extends Controller {
  async add() {
    const { ctx, app } = this;
    const { amount, type_id, date, pay_type, remark = '' } = await ctx.request.body;

    if (!amount || !type_id || !date || pay_type) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null,
      };
      return;
    }

    try {
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      const user_id = decode.id;

      const result = await ctx.service.bill.add({
        amount,
        type_id,
        date,
        pay_type,
        remark,
        user_id,
      });

      if (result) {
        ctx.body = {
          code: 200,
          msg: '添加账单成功',
          data: result,
        };
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '服务器出差了呢',
        data: null,
      };
    }
  }
}

module.exports = BillController;
