'use strict';
const dayjs = require('dayjs');
const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/bill.test.js', () => {

  it('POST /api/bill/add 新建账单成功', () => {
    const token = app.jwt.sign({
      id: '2',
      username: 'olu-test-1636968127297',
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // token 有效期为 24 小时
    }, app.config.jwt.secret);

    return app.httpRequest()
      .post('/api/bill/add') // POST请求
      .set('authorization', token)
      .send({
        amount: '200',
        type_id: 1,
        date: dayjs().format('YYYY-MM-DD'),
        pay_type: 1,
        remark: '嘤嘤嘤',
      }) // post body
      .expect(200)
      .then(response => {
        const res = JSON.parse(response.text);
        assert.equal(res.code, '200');
      });
  });

  it('POST /api/bill/add 新建账单失败 参数错误', () => {
    const token = app.jwt.sign({
      id: '2',
      username: 'olu-test-1636968127297',
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // token 有效期为 24 小时
    }, app.config.jwt.secret);

    return app.httpRequest()
      .post('/api/bill/add') // POST请求
      .set('authorization', token)
      .send({
        type_id: 1,
        date: dayjs().format('YYYY-MM-DD'),
        pay_type: 1,
        remark: '嘤嘤嘤',
      }) // post body
      .expect(200)
      .then(response => {
        const res = JSON.parse(response.text);
        assert.equal(res.code, '400');
      });
  });

  it('POST /api/bill/add 新建账单失败', () => {
    const token = app.jwt.sign({
      id: '2',
      username: 'olu-test-1636968127297',
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // token 有效期为 24 小时
    }, app.config.jwt.secret);

    return app.httpRequest()
      .post('/api/bill/add') // POST请求
      .set('authorization', token)
      .send({
        amount: 200,
        type_id: 1,
        date: dayjs().format(),
        pay_type: 1,
        remark: '嘤嘤嘤',
      }) // post body
      .expect(200)
      .then(response => {
        const res = JSON.parse(response.text);
        assert.equal(res.code, '500');
      });
  });

  it('GET /api/bill/list type_id = all 查询账单列表成功', () => {
    const token = app.jwt.sign({
      id: '2',
      username: 'olu-test-1636968127297',
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // token 有效期为 24 小时
    }, app.config.jwt.secret);

    return app.httpRequest()
      .get('/api/bill/list')
      .set('authorization', token)
      .send({
        user_id: 2,
      }) // post body
      .expect(200)
      .then(response => {
        const res = JSON.parse(response.text);
        assert.equal(res.code, '200');
      });
  });

  it('GET /api/bill/list type_id = 1查询账单列表失败', () => {
    const token = app.jwt.sign({
      id: '2',
      username: 'olu-test-1636968127297',
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // token 有效期为 24 小时
    }, app.config.jwt.secret);

    app.mockServiceError('bill', 'list', 'mock user service error');

    return app.httpRequest()
      .get('/api/bill/list?type_id=1')
      .set('authorization', token)
      .send({
      }) // post body
      .expect(200)
      .then(response => {
        const res = JSON.parse(response.text);
        assert.equal(res.code, '500');
      });
  });

  it('GET /api/bill/detail 查询账单详情成功', () => {
    const token = app.jwt.sign({
      id: '2',
      username: 'olu-test-1636968127297',
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // token 有效期为 24 小时
    }, app.config.jwt.secret);

    return app.httpRequest()
      .get('/api/bill/detail?id=1')
      .set('authorization', token)
      .send({
        user_id: 1,
      }) // post body
      .expect(200)
      .then(response => {
        const res = JSON.parse(response.text);
        assert.equal(res.code, '200');
      });
  });

  it.only('GET /api/bill/detail 查询账单详情失败', () => {
    const token = app.jwt.sign({
      id: '2',
      username: 'olu-test-1636968127297',
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // token 有效期为 24 小时
    }, app.config.jwt.secret);

    app.mockServiceError('bill', 'detail', 'mock user service error');

    return app.httpRequest()
      .get('/api/bill/detail?id=1')
      .set('authorization', token)
      .send({
        user_id: 1,
      }) // post body
      .expect(200)
      .then(response => {
        const res = JSON.parse(response.text);
        assert.equal(res.code, '500');
      });
  });

});
