'use strict';

const Service = require('egg').Service;

class BillService extends Service {
  async add(params = {}) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('bill', params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // 获取账单列表
  async list(id) {
    const { app } = this;
    const QUERY_STR = 'bill.id, bill.pay_type, bill.amount, bill.date, bill.type_id, bill.remark, type.name as type_name';
    const sql = `select ${QUERY_STR} from bill left join type on bill.type_id = type.id  where bill.user_id = ${id}`;
    try {
      const result = await app.mysql.query(sql);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // 获取账单详情
  async detail(params = {}) {
    const { app } = this;
    const { id, user_id } = params;

    try {
      const result = await app.mysql.get('bill', { id, user_id });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(params = {}) {
    const { app } = this;
    try {
      const result = await app.mysql.update('bill', { ...params }, {
        id: params.id,
        user_id: params.user_id,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(params = {}) {
    const { app } = this;
    try {
      const result = await app.mysql.delete('bill', {
        id: params.id,
        user_id: params.user_id,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = BillService;
