'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {

  it('POST /api/user/register 注册成功', () => {
    return app.httpRequest()
      .post('/api/user/register') // POST请求
      .send({
        username: `olu-${new Date().getTime()}`,
        password: '123456',
      }) // post body
      .expect(200)
      .then(response => {
        const res = JSON.parse(response.text);
        assert.equal(res.code, '200');
      });
  });

  it('POST /api/user/register 用户名或密码为空', () => {
    return app.httpRequest()
      .post('/api/user/register') // POST请求
      .send({
        // username: '',
        password: '123456',
      }) // post body
      .expect(200)
      .then(response => {
        const res = JSON.parse(response.text);
        assert.equal(res.code, '500');
      });
  });

  it('POST /api/user/register 已存在重名用户', () => {
    return app.httpRequest()
      .post('/api/user/register')
      .send({
        username: 'Olu',
        password: '123456',
      })
      .expect(200)
      .then(response => {
        const res = JSON.parse(response.text);
        assert.equal(res.code, '500');
      });
  });

  it('POST /api/user/register 写入数据库失败', () => {
    return app.httpRequest()
      .post('/api/user/register')
      .send({
        username: 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij',
        password: '123456',
      })
      .expect(200)
      .then(response => {
        const res = JSON.parse(response.text);
        assert.equal(res.code, '500');
      });
  });

});
