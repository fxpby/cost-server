'use strict';

const dayjs = require('dayjs');

const Controller = require('egg').Controller;

class BillController extends Controller {

  // 新建账单
  async add() {
    const { ctx, app } = this;
    const { amount, type_id, date, pay_type, remark = '' } = await ctx.request.body;

    if (!amount || type_id === undefined || !date || pay_type === undefined) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null,
      };
      return;
    }

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

    if (!result) {
      ctx.body = {
        code: 500,
        msg: '服务器出差了呢',
        data: null,
      };
      return;
    }

    ctx.body = {
      code: 200,
      msg: '添加账单成功',
      data: null,
    };

  }

  // 查询账单列表
  async list() {
    const { ctx, app } = this;
    const { date, page = 1, page_size = 5, type_id = 'all' } = ctx.query;

    try {
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      const user_id = decode.id;

      const list = await ctx.service.bill.list(user_id);

      // 过滤账单列表
      const _list = list.filter(item => {
        if (type_id === 'all') {
          return dayjs(item.date).format('YYYY-MM') === date;
        }
        return dayjs(item.date).format('YYYY-MM') === date && type_id === item.type_id;
      });

      // 格式化数据结构
      const listMap = _list.reduce((cur, item) => {
        // 格式化账单时间
        const date = dayjs(item.date).format('YYYY-MM-DD');

        if (!cur.length) {
          cur.push({
            date,
            bills: [],
          });

        }

        if (cur && cur.length && cur.findIndex(item => dayjs(item.date).format('YYYY-MM-DD') === date) === -1) {
          cur.push({
            date,
            bills: [ item ],
          });
        }

        if (cur && cur.length && cur.findIndex(item => dayjs(item.date).format('YYYY-MM-DD') === date) > -1) {
          const index = cur.findIndex(item => item.date === date);
          cur[index].bills.push(item);
        }

        return cur;
      }, []).sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());

      // 分页处理
      const filterListMap = listMap.slice((page - 1) * page_size, page * page_size);

      // 计算当月总收入和支出
      const __list = list.filter(item => dayjs(item.date).format('YYYY-MM') === date);

      // 累加支出
      const totalExpense = __list.reduce((cur, item) => {
        if (item.pay_type === 1) {
          cur += Number(item.amount);
          return cur;
        }
        return cur;
      }, 0);

      // 累加收入
      const totalIncome = __list.reduce((cur, item) => {
        if (item.pay_type === 2) {
          cur += Number(item.amount);
          return cur;
        }
        return cur;
      }, 0);

      ctx.body = {
        code: 200,
        msg: '获取账单列表成功',
        data: {
          totalExpense,
          totalIncome,
          totalPage: Math.ceil(listMap.length / page_size),
          list: filterListMap || [],
        },
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '服务器去输液了',
        data: null,
      };
      return;
    }
  }

  async detail() {
    const { ctx, app } = this;
    const { id = '' } = ctx.query;
    const token = ctx.request.header.authorization;
    const decode = await app.jwt.verify(token, app.config.jwt.secret);

    const user_id = decode.id;

    if (!id) {
      ctx.body = {
        code: 500,
        msg: '订单id没有收到哦',
        data: null,
      };
      return;
    }

    try {
      const detail = await ctx.service.bill.detail({ id, user_id });
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: detail,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '服务器出差了呢',
        data: null,
      };
    }
  }

  async update() {
    const { ctx, app } = this;
    const { id, amount, type_id, date, pay_type, remark = '' } = ctx.request.body;

    if (!id || !amount || type_id === undefined || !date || pay_type === undefined) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null,
      };
      return;
    }

    const token = ctx.request.header.authorization;
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    const user_id = decode.id;

    const result = await ctx.service.bill.update({
      id,
      amount,
      type_id,
      date,
      pay_type,
      remark,
      user_id,
    });

    if (!result) {
      ctx.body = {
        code: 500,
        msg: '服务器出差了呢',
        data: null,
      };
      return;
    }

    ctx.body = {
      code: 200,
      msg: '修改账单成功',
      data: null,
    };
  }

  async delete() {
    const { ctx, app } = this;
    const { id } = ctx.request.body;

    if (!id) {
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null,
      };
      return;
    }

    const token = ctx.request.header.authorization;
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    const user_id = decode.id;

    const result = await ctx.service.bill.delete({
      id,
      user_id,
    });

    if (!result) {
      ctx.body = {
        code: 500,
        msg: '服务器出差了呢',
        data: null,
      };
      return;
    }

    ctx.body = {
      code: 200,
      msg: '删除账单成功',
      data: null,
    };
  }
}

module.exports = BillController;
