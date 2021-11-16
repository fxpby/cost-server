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

  it('POST /api/user/login 登陆成功', () => {
    return app.httpRequest()
      .post('/api/user/login')
      .send({
        username: 'Olu',
        password: '123456',
      })
      .expect(200)
      .then(response => {
        const res = JSON.parse(response.text);
        assert.equal(res.code, 200);
        assert(res.data.length);
      });
  });

  it('POST /api/user/login 账号或密码为空', () => {
    return app.httpRequest()
      .post('/api/user/login')
      .send({
        username: '',
        password: '123456',
      })
      .expect(200)
      .then(response => {
        const res = JSON.parse(response.text);
        assert.equal(res.code, 500);
      });
  });

  it('POST /api/user/login 账号不存在', () => {
    return app.httpRequest()
      .post('/api/user/login')
      .send({
        username: '我是不存在的账号',
        password: '123456',
      })
      .expect(200)
      .then(response => {
        const res = JSON.parse(response.text);
        assert.equal(res.code, 500);
      });
  });

  it('POST /api/user/login 密码不正确', () => {
    return app.httpRequest()
      .post('/api/user/login')
      .send({
        username: 'Olu',
        password: '12345654321',
      })
      .expect(200)
      .then(response => {
        const res = JSON.parse(response.text);
        assert.equal(res.code, 500);
      });
  });

  it('get /api/user/decodeToken 解析token成功', () => {
    const token = app.jwt.sign({
      id: '2',
      username: 'olu-test-1636968127297',
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // token 有效期为 24 小时
    }, app.config.jwt.secret);

    return app.httpRequest()
      .get('/api/user/decodeToken')
      .set('authorization', token)
      .expect(200)
      .then(response => {
        const res = JSON.parse(response.text);
        assert.equal(res.code, 200);
      });
  });

  it('get /api/user/decodeToken token过期', () => {
    const token = app.jwt.sign({
      id: '2',
      username: 'olu-test-1636968127297',
      exp: Math.floor(Date.now() / 1000) + (1), // token 有效期为 1s
    }, app.config.jwt.secret);

    setTimeout(() => {
      return app.httpRequest()
        .get('/api/user/decodeToken')
        .set('authorization', token)
        .expect(200)
        .then(response => {
          const res = JSON.parse(response.text);
          assert.equal(res.code, 401);
        });
    }, 2000);
  });

  it('get /api/user/decodeToken token不存在', () => {
    const token = 'null';
    return app.httpRequest()
      .get('/api/user/decodeToken')
      .set('authorization', token)
      .expect(200)
      .then(response => {
        const res = JSON.parse(response.text);
        assert.equal(res.code, 401);
      });
  });

});
