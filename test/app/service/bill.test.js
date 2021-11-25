'use strict';

const dayjs = require('dayjs');
const { app, assert } = require('egg-mock/bootstrap');


describe('test/app/service/bill.test.js', () => {
  // 新增账单成功
  it('add success', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.bill.add({
      user_id: 1,
      amount: 250,
      type_id: 1,
      date: dayjs().format('YYYY-MM-DD'),
      pay_type: 1,
      remark: '',
    });
    assert(result !== null);
  });

  // 新增账单失败
  it('add failed', async () => {
    const ctx = app.mockContext();
    try {
      await ctx.service.bill.add({
        amount: 250,
        type_id: 1,
        date: dayjs().format('YYYY-MM-DD'),
        pay_type: 1,
        remark: '',
      });
    } catch (error) {
      assert(error === null);
    }
  });

  // 获取账单列表成功
  it('list success', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.bill.list(1);
    assert(result !== null);
  });

  // 获取账单列表失败
  it('list failed', async () => {
    const ctx = app.mockContext();
    try {
      await ctx.service.bill.add();
    } catch (error) {
      assert(error === null);
    }
  });

  // 获取账单详情成功
  it('detail success', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.bill.detail({
      id: 1,
      user_id: 1,
    });
    assert(result !== null);
  });

  // 获取账单详情失败
  it('detail failed', async () => {
    const ctx = app.mockContext();
    try {
      await ctx.service.bill.detail({});
    } catch (error) {
      assert(error === null);
    }
  });

  // 修改账单详情成功
  it('update success', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.bill.update({
      id: 1,
      user_id: 1,
      amount: 233,
      type_id: 1,
      date: dayjs().format('YYYY-MM-DD'),
      pay_type: 1,
    });
    assert(result !== null);
  });

  // 修改账单详情失败
  it('update failed', async () => {
    const ctx = app.mockContext();
    try {
      await ctx.service.bill.update({
        id: 1,
        user_id: 1,
        amount: 233,
        type_id: 1,
        date: dayjs(),
        pay_type: 1,
      });
    } catch (error) {
      assert(error === null);
    }
  });

  // 删除账单成功
  it('delete success', async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.bill.delete({
      id: 53,
      user_id: 1,
    });
    assert(result !== null);
  });

  // 删除账单失败
  it('delete failed', async () => {
    const ctx = app.mockContext();
    try {
      await ctx.service.bill.delete({
        id: 531,
        user_id: 1,
      });
    } catch (error) {
      assert(error === null);
    }
  });
});
